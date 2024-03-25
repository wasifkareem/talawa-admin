[talawa-admin](../README.md) / [Modules](../modules.md) / components/ActionItemsContainer/ActionItemsContainerMocks

# Module: components/ActionItemsContainer/ActionItemsContainerMocks

## Table of contents

### Variables

- [MOCKS](components_ActionItemsContainer_ActionItemsContainerMocks.md#mocks)
- [MOCKS\_ERROR\_MUTATIONS](components_ActionItemsContainer_ActionItemsContainerMocks.md#mocks_error_mutations)

## Variables

### MOCKS

• `Const` **MOCKS**: (\{ `request`: \{ `query`: `DocumentNode` = UPDATE\_ACTION\_ITEM\_MUTATION; `variables`: \{ `actionItemId`: `string` = 'actionItem1'; `assigneeId`: `string` = 'user2'; `completionDate`: `string` = '2024-02-21'; `dueDate`: `string` = '2024-02-14'; `isCompleted`: `boolean` = true; `postCompletionNotes`: `string` = 'post completion notes'; `preCompletionNotes`: `string` = 'pre completion notes edited' \}  \} ; `result`: \{ `data`: \{ `removeActionItem?`: `undefined` ; `updateActionItem`: \{ `_id`: `string` = 'actionItem1' \}  \}  \}  \} \| \{ `request`: \{ `query`: `DocumentNode` = DELETE\_ACTION\_ITEM\_MUTATION; `variables`: \{ `actionItemId`: `string` = 'actionItem1'; `assigneeId?`: `undefined` = 'user2'; `completionDate?`: `undefined` = '2024-02-21'; `dueDate?`: `undefined` = '2024-02-14'; `isCompleted?`: `undefined` = true; `postCompletionNotes?`: `undefined` = 'post completion notes'; `preCompletionNotes?`: `undefined` = 'pre completion notes edited' \}  \} ; `result`: \{ `data`: \{ `removeActionItem`: \{ `_id`: `string` = 'actionItem1' \} ; `updateActionItem?`: `undefined`  \}  \}  \})[]

#### Defined in

[src/components/ActionItemsContainer/ActionItemsContainerMocks.ts:6](https://github.com/wasifkareem/talawa-admin/blob/fcbba3f/src/components/ActionItemsContainer/ActionItemsContainerMocks.ts#L6)

___

### MOCKS\_ERROR\_MUTATIONS

• `Const` **MOCKS\_ERROR\_MUTATIONS**: (\{ `error`: `Error` ; `request`: \{ `query`: `DocumentNode` = UPDATE\_ACTION\_ITEM\_MUTATION; `variables`: \{ `actionItemId`: `string` = 'actionItem1'; `assigneeId`: `string` = 'user2'; `completionDate`: `string` = '2024-02-21'; `dueDate`: `string` = '2024-02-14'; `isCompleted`: `boolean` = true; `postCompletionNotes`: `string` = 'post completion notes'; `preCompletionNotes`: `string` = 'pre completion notes edited' \}  \}  \} \| \{ `error`: `Error` ; `request`: \{ `query`: `DocumentNode` = DELETE\_ACTION\_ITEM\_MUTATION; `variables`: \{ `actionItemId`: `string` = 'actionItem1'; `assigneeId?`: `undefined` = 'user2'; `completionDate?`: `undefined` = '2024-02-21'; `dueDate?`: `undefined` = '2024-02-14'; `isCompleted?`: `undefined` = true; `postCompletionNotes?`: `undefined` = 'post completion notes'; `preCompletionNotes?`: `undefined` = 'pre completion notes edited' \}  \}  \})[]

#### Defined in

[src/components/ActionItemsContainer/ActionItemsContainerMocks.ts:45](https://github.com/wasifkareem/talawa-admin/blob/fcbba3f/src/components/ActionItemsContainer/ActionItemsContainerMocks.ts#L45)
