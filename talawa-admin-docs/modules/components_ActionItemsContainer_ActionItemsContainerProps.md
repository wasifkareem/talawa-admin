[talawa-admin](../README.md) / [Modules](../modules.md) / components/ActionItemsContainer/ActionItemsContainerProps

# Module: components/ActionItemsContainer/ActionItemsContainerProps

## Table of contents

### Variables

- [props](components_ActionItemsContainer_ActionItemsContainerProps.md#props)
- [props2](components_ActionItemsContainer_ActionItemsContainerProps.md#props2)

## Variables

### props

• `Const` **props**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actionItemsData` | \{ `_id`: `string` = 'actionItem1'; `actionItemCategory`: \{ `_id`: `string` = 'actionItemCategory1'; `name`: `string` = 'ActionItemCategory 1' \} ; `assignee`: \{ `_id`: `string` = 'user1'; `firstName`: `string` = 'Harve'; `lastName`: `string` = 'Lance' \} ; `assigner`: \{ `_id`: `string` = 'user0'; `firstName`: `string` = 'Wilt'; `lastName`: `string` = 'Shepherd' \} ; `assignmentDate`: `Date` ; `completionDate`: `Date` ; `creator`: \{ `_id`: `string` = 'user0'; `firstName`: `string` = 'Wilt'; `lastName`: `string` = 'Shepherd' \} ; `dueDate`: `Date` ; `event`: \{ `_id`: `string` = 'event1'; `title`: `string` = 'event 1' \} ; `isCompleted`: `boolean` = false; `postCompletionNotes`: `string` = 'Post Completion Notes'; `preCompletionNotes`: `string` = 'Pre Completion Notes' \}[] |
| `actionItemsRefetch` | `Mock`\<`any`, `any`\> |
| `membersData` | \{ `_id`: `string` = 'user1'; `createdAt`: `string` = '2024-02-14'; `email`: `string` = 'harve@example.com'; `firstName`: `string` = 'Harve'; `image`: `string` = ''; `lastName`: `string` = 'Lance'; `organizationsBlockedBy`: `never`[] = [] \}[] |

#### Defined in

[src/components/ActionItemsContainer/ActionItemsContainerProps.ts:1](https://github.com/wasifkareem/talawa-admin/blob/fcbba3f/src/components/ActionItemsContainer/ActionItemsContainerProps.ts#L1)

___

### props2

• `Const` **props2**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `actionItemsData` | `never`[] |
| `actionItemsRefetch` | `Mock`\<`any`, `any`\> |
| `membersData` | `never`[] |

#### Defined in

[src/components/ActionItemsContainer/ActionItemsContainerProps.ts:91](https://github.com/wasifkareem/talawa-admin/blob/fcbba3f/src/components/ActionItemsContainer/ActionItemsContainerProps.ts#L91)
