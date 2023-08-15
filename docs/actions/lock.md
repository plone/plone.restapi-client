# Locking

Locking is a mechanism to prevent users from accidentally overriding each other's changes.

When a user edits a content object in Plone, the object is locked until the user hits the {guilabel}`Save` or {guilabel}`Cancel` button.
If a second user tries to edit the object at the same time, she will see a message that this object is locked.

The API consumer can create, read, update, and delete a content-type lock.

## Get Lock Info

This function returns the information about the lock for the given path.

- Function name: `getLockQuery`

### Parameters

- **path**: string

  - **Required:** Yes

## Add Lock

This function can be used to add a lock on the content of the given path.

- Function name: `createLockMutation`

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `stealable: boolean`

    - **Required:** No
    - If `true`, the another user can unlock the lock.

    `timeout: integer`

    - **Required:** No
    - The timeout of the lock in seconds. If not given, the default timeout is used.

## Update Lock

This function can be used to update the lock on the content of the given path.

- Function name: `updateLockMutation`

### Parameters

- **path**: string

  - **Required:** Yes

- **locktoken**: string

  - **Required:** Yes

## Delete Lock

This function can be used to delete the lock on the content of the given path.

- Function name: `deleteLockMutation`

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** No
  - It can have the following fields:

    `force: boolean`

    - **Required:** No
    - Set force `true` to unlock an object locked by another user.
