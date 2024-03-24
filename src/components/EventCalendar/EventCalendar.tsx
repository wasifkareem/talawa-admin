import EventListCard from 'components/EventListCard/EventListCard';
import dayjs from 'dayjs';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import styles from './EventCalendar.module.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import CurrentHourIndicator from 'components/CurrentHourIndicator/CurrentHourIndicator';
import HolidayCard from 'components/HolidayCard/HolidayCard';
import { render } from '@testing-library/react';

interface InterfaceEvent {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  startTime: string | undefined;
  endTime: string | undefined;
  allDay: boolean;
  recurring: boolean;
  registrants?: InterfaceIEventAttendees[];
  isPublic: boolean;
  isRegisterable: boolean;
  creator: { _id: string };
}

interface InterfaceCalendarProps {
  eventData: InterfaceEvent[];
  orgData?: InterfaceIOrgList;
  userRole?: string;
  userId?: string;
  viewType?: string;
  eventType?: string;
}

enum Status {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

enum Role {
  USER = 'USER',
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
}

export enum ViewType {
  DAY = 'Day',
  MONTH = 'Month',
}
interface InterfaceIEventAttendees {
  userId: string;
  user?: string;
  status?: Status;
  createdAt?: Date;
}

interface InterfaceIOrgList {
  organizations: {
    admins: { _id: string }[];
    members: { _id: string }[];
  }[];
}

const Calendar: React.FC<InterfaceCalendarProps> = ({
  eventData, //array
  orgData,
  userRole,
  userId,
  viewType,
  eventType,
}) => {
  const [selectedDate] = useState<Date | null>(null);
  const weekdays = [
    'Sunday',
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const hours = [
    '12 AM',
    '01 AM',
    '02 AM',
    '03 AM',
    '04 AM',
    '05 AM',
    '06 AM',
    '07 AM',
    '08 AM',
    '09 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '01 PM',
    '02 PM',
    '03 PM',
    '04 PM',
    '05 PM',
    '06 PM',
    '07 PM',
    '08 PM',
    '09 PM',
    '10 PM',
    '11 PM',
  ];

  const holidays = [
    { name: "New Year's Day", date: '01-01', month: 'January' }, // January 1st
    { name: "Valentine's Day", date: '02-14', month: 'February' }, // February 14th
    { name: "International Women's Day", date: '03-08', month: 'March' }, // March 8th
    { name: "April Fools' Day", date: '04-01', month: 'April' }, // April 1st
    { name: 'May Day / Labour Day', date: '05-01', month: 'May' }, // May 1st
    { name: "Mother's Day", date: '05-08', month: 'May' }, // Second Sunday in May
    { name: "Father's Day", date: '06-19', month: 'June' }, // Third Sunday in June
    { name: 'Independence Day (US)', date: '07-04', month: 'July' }, // July 4th
    { name: 'Oktoberfest', date: '09-21', month: 'September' }, // September 21st (starts in September, ends in October)
    { name: 'Halloween', date: '10-31', month: 'October' }, // October 31st
    { name: 'Diwali', date: '11-04', month: 'November' },
    {
      name: 'Remembrance Day / Veterans Day',
      date: '11-11',
      month: 'November',
    },
    { name: 'Christmas Day', date: '12-25', month: 'December' }, // December 25th
  ];

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<InterfaceEvent[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<number>(-1);
  const [windowWidth, setWindowWidth] = useState<number>(window.screen.width);

  const adminData = orgData?.organizations.map((org) => org.admins).flat();

  useEffect(() => {
    function handleResize(): void {
      setWindowWidth(window.screen.width);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filterData = (
    eventData: InterfaceEvent[],
    orgData?: InterfaceIOrgList,
    userRole?: string,
    userId?: string,
  ): InterfaceEvent[] => {
    const data: InterfaceEvent[] = [];

    if (userRole === Role.SUPERADMIN) return eventData;
    // Hard to test all the cases
    /* istanbul ignore next */
    if (userRole === Role.ADMIN) {
      eventData?.forEach((event) => {
        if (event.isPublic) data.push(event);
        if (!event.isPublic) {
          const filteredOrg = orgData?.organizations.map((org) =>
            org.admins.some((data) => data._id === userId),
          );

          if (filteredOrg) {
            data.push(event);
          }
        }
      });
    } else {
      eventData?.forEach((event) => {
        if (event.isPublic) data.push(event);
        const userAttending = event.registrants?.some(
          (data) => data.userId === userId,
        );
        if (userAttending) {
          data.push(event);
        }
      });
    }
    return data;
  };

  useEffect(() => {
    const data = filterData(eventData, orgData, userRole, userId);
    setEvents(data);
  }, [eventData, orgData, userRole, userId]);
  const handlePrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevDate = (): void => {
    if (currentDate > 1) {
      setCurrentDate(currentDate - 1);
    } else {
      if (currentMonth > 0) {
        const lastDayOfPrevMonth = new Date(
          currentYear,
          currentMonth,
          0,
        ).getDate();
        setCurrentDate(lastDayOfPrevMonth);
        setCurrentMonth(currentMonth - 1);
      } else {
        setCurrentDate(31);
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      }
    }
  };

  const handleNextDate = (): void => {
    const lastDayOfCurrentMonth = new Date(
      currentYear,
      currentMonth - 1,
      0,
    ).getDate();
    if (currentDate < lastDayOfCurrentMonth) {
      setCurrentDate(currentDate + 1);
    } else {
      if (currentMonth < 12) {
        setCurrentDate(1);
        setCurrentMonth(currentMonth + 1);
      } else {
        setCurrentDate(1);
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      }
    }
  };

  const timezoneString = `UTC${
    new Date().getTimezoneOffset() > 0 ? '-' : '+'
  }${String(Math.floor(Math.abs(new Date().getTimezoneOffset()) / 60)).padStart(
    2,
    '0',
  )}:${String(Math.abs(new Date().getTimezoneOffset()) % 60).padStart(2, '0')}`;
  const renderHours = (): JSX.Element => {
    const toggleExpand = (index: number): void => {
      if (expanded === index) {
        setExpanded(-1);
      } else {
        setExpanded(index);
      }
    };
    const allDayEventsList: any = events
      ?.filter((datas) => {
        const currDate = new Date(currentYear, currentMonth, currentDate);
        if (
          datas.startTime == undefined &&
          datas.startDate == dayjs(currDate).format('YYYY-MM-DD')
        ) {
          return datas;
        }
      })
      .map((datas: InterfaceEvent) => {
        return (
          <EventListCard
            // userEvents={userEvents}
            adminData={adminData}
            userId={userId}
            creatorId={datas.creator._id}
            key={datas._id}
            id={datas._id}
            eventLocation={datas.location}
            eventName={datas.title}
            eventDescription={datas.description}
            regDate={datas.startDate}
            regEndDate={datas.endDate}
            startTime={datas.startTime}
            endTime={datas.endTime}
            allDay={datas.allDay}
            recurring={datas.recurring}
            isPublic={datas.isPublic}
            isRegisterable={datas.isRegisterable}
          />
        );
      });

    return (
      <>
        <div className={styles.calendar_hour_block}>
          <div className={styles.calendar_hour_text_container}>
            <p className={styles.calendar_timezone_text}>{timezoneString}</p>
          </div>
          <div className={styles.dummyWidth}></div>
          <div
            className={
              allDayEventsList.length > 0
                ? styles.event_list_parent_current
                : styles.event_list_parent
            }
          >
            <div
              className={
                expanded === -100
                  ? styles.expand_list_container
                  : styles.list_container
              }
              style={{ width: 'fit-content' }}
            >
              <div
                className={
                  expanded === -100
                    ? styles.expand_event_list
                    : styles.event_list_hour
                }
              >
                {/* <div>Helo</div> */}
                {expanded === -100
                  ? allDayEventsList
                  : allDayEventsList?.slice(0, 1)}
              </div>
              {(allDayEventsList?.length > 2 ||
                (windowWidth <= 700 && allDayEventsList?.length > 0)) && (
                <button
                  className={styles.btn__more}
                  onClick={() => {
                    toggleExpand(-100);
                  }}
                >
                  {expanded === -100 ? 'View less' : 'View all'}
                </button>
              )}
            </div>
          </div>
        </div>
        {hours.map((hour, index) => {
          const timeEventsList: any = events
            ?.filter((datas) => {
              const currDate = new Date(currentYear, currentMonth, currentDate);
              if (eventType == 'Created By You') {
                if (
                  datas.startTime?.slice(0, 2) == (index % 24).toString() &&
                  datas.startDate == dayjs(currDate).format('YYYY-MM-DD') &&
                  datas.creator._id == userId
                ) {
                  return datas;
                }
              } else if (
                eventType == 'Created By Organizations' &&
                adminData?.some((admin) => admin._id == datas.creator._id)
              ) {
                if (
                  datas.startTime?.slice(0, 2) == (index % 24).toString() &&
                  datas.startDate == dayjs(currDate).format('YYYY-MM-DD')
                ) {
                  return datas;
                }
              } else if (
                eventType === 'All Events' ||
                eventType == 'Event Type'
              ) {
                if (
                  datas.startTime?.slice(0, 2) == (index % 24).toString() &&
                  datas.startDate == dayjs(currDate).format('YYYY-MM-DD')
                ) {
                  return datas;
                }
              }
            })
            .map((datas: InterfaceEvent) => {
              return (
                <EventListCard
                  adminData={adminData}
                  userId={userId}
                  creatorId={datas.creator._id}
                  key={datas._id}
                  id={datas._id}
                  eventLocation={datas.location}
                  eventName={datas.title}
                  eventDescription={datas.description}
                  regDate={datas.startDate}
                  regEndDate={datas.endDate}
                  startTime={datas.startTime}
                  endTime={datas.endTime}
                  allDay={datas.allDay}
                  recurring={datas.recurring}
                  isPublic={datas.isPublic}
                  isRegisterable={datas.isRegisterable}
                />
              );
            });

          return (
            <div key={hour} className={styles.calendar_hour_block}>
              <div className={styles.calendar_hour_text_container}>
                <p className={styles.calendar_hour_text}>{`${hour}`}</p>
              </div>
              <div className={styles.dummyWidth}></div>
              <div
                className={
                  timeEventsList.length > 0
                    ? styles.event_list_parent_current
                    : styles.event_list_parent
                }
              >
                {index % 24 == new Date().getHours() &&
                  new Date().getDate() == currentDate && (
                    <CurrentHourIndicator />
                  )}
                <div
                  className={
                    expanded === index
                      ? styles.expand_list_container
                      : styles.list_container
                  }
                  style={{ width: 'fit-content' }}
                >
                  <div
                    className={
                      expanded === index
                        ? styles.expand_event_list
                        : styles.event_list
                    }
                  >
                    {expanded === index
                      ? timeEventsList
                      : timeEventsList?.slice(0, 1)}
                  </div>
                  {(timeEventsList?.length > 1 ||
                    (windowWidth <= 700 && timeEventsList?.length > 0)) && (
                    <button
                      className={styles.btn__more}
                      onClick={() => {
                        toggleExpand(index);
                      }}
                    >
                      {expanded === index ? 'View less' : 'View all'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const renderDays = (): JSX.Element[] => {
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth(),
      monthStart.getDate() - monthStart.getDay(),
    );

    const endDate = new Date(
      monthEnd.getFullYear(),
      monthEnd.getMonth(),
      monthEnd.getDate() + (6 - monthEnd.getDay()),
    );
    const days = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      days.push(currentDate);
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );
    }

    return days.map((date, index) => {
      const className = [
        date.getDay() === 0 || date.getDay() === 6 ? styles.day_weekends : '',
        date.toLocaleDateString() === today.toLocaleDateString() //Styling for today day cell
          ? styles.day__today
          : '',
        date.getMonth() !== currentMonth ? styles.day__outside : '', //Styling for days outside the current month
        selectedDate?.getTime() === date.getTime() ? styles.day__selected : '',
        styles.day,
      ].join(' ');

      const toggleExpand = (index: number): void => {
        if (expanded === index) {
          setExpanded(-1);
        } else {
          setExpanded(index);
        }
      };

      const allEventsList: any = events
        ?.filter((datas) => {
          if (eventType === 'Created By You') {
            if (
              datas.startDate == dayjs(date).format('YYYY-MM-DD') &&
              datas.creator._id == userId
            )
              return datas;
          } else if (eventType === 'All Events' || eventType == 'Event Type') {
            if (datas.startDate == dayjs(date).format('YYYY-MM-DD'))
              return datas;
          } else if (
            eventType === 'Created By Organizations' &&
            adminData?.some((admin) => admin._id == datas.creator._id)
          ) {
            if (datas.startDate == dayjs(date).format('YYYY-MM-DD'))
              return datas;
          }
        })
        .map((datas: InterfaceEvent) => {
          return (
            <EventListCard
              adminData={adminData}
              userId={userId}
              creatorId={datas.creator?._id}
              key={datas._id}
              id={datas._id}
              eventLocation={datas.location}
              eventName={datas.title}
              eventDescription={datas.description}
              regDate={datas.startDate}
              regEndDate={datas.endDate}
              startTime={datas.startTime}
              endTime={datas.endTime}
              allDay={datas.allDay}
              recurring={datas.recurring}
              isPublic={datas.isPublic}
              isRegisterable={datas.isRegisterable}
            />
          );
        });
      const holidayList: any = holidays
        .filter((holiday) => {
          if (holiday.date == dayjs(date).format('MM-DD')) return holiday;
        })
        .map((holiday) => {
          return <HolidayCard key={holiday.name} holidayName={holiday.name} />;
        });
      return (
        <div
          key={index}
          className={
            className + ' ' + (allEventsList?.length > 0 && styles.day__events)
          }
          data-testid="day"
        >
          {date.getDate()}
          {date.getMonth() !== currentMonth ? null : (
            <div
              className={expanded === index ? styles.expand_list_container : ''}
            >
              <div
                className={
                  expanded === index
                    ? styles.expand_event_list
                    : styles.event_list
                }
              >
                <div>{holidayList}</div>
                {expanded === index
                  ? allEventsList
                  : holidayList?.length > 0
                    ? allEventsList?.slice(0, 1)
                    : allEventsList?.slice(0, 2)}
              </div>
              {(allEventsList?.length > 2 ||
                (windowWidth <= 700 && allEventsList?.length > 0)) && (
                <button
                  className={styles.btn__more}
                  onClick={() => {
                    toggleExpand(index);
                  }}
                >
                  {expanded === index ? 'View less' : 'View all'}
                </button>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const holidayPerMonth: any = holidays
    .filter((holiday) => {
      if (holiday.month == months[currentMonth]) return holiday;
    })
    .map((holiday) => {
      return (
        <div key={holiday.name} className={styles.holiday__data}>
          <p className={styles.holiday__date}>{holiday.month}</p>
          <p className={styles.holiday__date}>
            {holiday.date
              .substring(holiday.date.indexOf('-') + 1)
              .replace(/^0+/, '')}
          </p>
          <p className={styles.holiday__name}>{holiday.name}</p>
        </div>
      );
    });

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <Button
          className={styles.button}
          onClick={viewType == ViewType.DAY ? handlePrevDate : handlePrevMonth}
          data-testid="prevmonthordate"
        >
          <ChevronLeft />
        </Button>

        <div
          className={styles.calendar__header_month}
          data-testid="current-date"
        >
          {viewType == ViewType.DAY ? `${currentDate}` : ``} {currentYear}
          <div>{months[currentMonth]}</div>
        </div>
        <Button
          className={styles.button}
          onClick={viewType == ViewType.DAY ? handleNextDate : handleNextMonth}
          data-testid="nextmonthordate"
        >
          <ChevronRight />
        </Button>

        <div className={styles.flex_grow}></div>
      </div>
      <div className={`${styles.calendar__scroll} customScroll`}>
        {viewType == ViewType.MONTH ? (
          <>
            <div>
              <div className={styles.calendar__weekdays}>
                {weekdays.map((weekday, index) => (
                  <div key={index} className={styles.weekday}>
                    {weekday}
                  </div>
                ))}
              </div>
              <div className={styles.calendar__days}>{renderDays()}</div>
            </div>
            <div className={styles.calendar__infocards}>
              <div className={styles.card__holidays}>
                <h1>Holidays</h1>
                <div>
                  <div className={styles.month__holidays}>
                    {holidayPerMonth}
                  </div>
                </div>
              </div>
              <div className={styles.card__events}>
                <h1>Events</h1>
                <div className={styles.innercard__events}>
                  <div className={styles.orgEvent__color}></div>
                  <div>
                    <p>Events Created by Organization</p>
                  </div>
                </div>
                <div className={styles.innercard__events}>
                  <div className={styles.holidays__color}></div>
                  <div>
                    <p>Holidays</p>
                  </div>
                </div>
                <div className={styles.innercard__events}>
                  <div className={styles.userEvents__color}></div>
                  <div>
                    <p>Events Created By user</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.clendar__hours}>{renderHours()}</div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
