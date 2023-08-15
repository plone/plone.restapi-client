# Groups

Available groups in a Plone site can be created, queried, updated, and deleted by interacting with the `/@groups` endpoint on the portal root.
This requires an authenticated user.

## Get Groups list

This function returns the list of all groups in the portal.

- Function name: getGroupsQuery

## Get Group

This function returns the information about an individual group at the given path.

- Function name: getGroupQuery

### Parameters

- **path**: string

  - **Required**: Yes

## Add Group

This function can be used to add a new group at the given path.

- Function name: createGroupMutation

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - Required: Yes
  - It can have the following fields:

    `description: string`

    - **Required**: No

    `email: string`

    - **Required**: No

    `groupname: string`

    - **Required**: Yes

    `groups: string[]`

    - **Required**: No

    `roles: string[]`

    - **Required**: No

    `title: string`

    - **Required**: No

    `users: string[]`

    - **Required**: No

## Update Group

This function can be used to update an existing group at the given path.

- Function name: updateGroupMutation

### Parameters

- **path**: string

  - **Required**: Yes

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    `description: string`

    - **Required**: No

    `email: string`

    - **Required**: No

    `groupname: string`

    - **Required**: No

## Delete Group

This function can be used to delete an existing group at the given path.

- Function name: deleteGroupMutation

### Parameters

- **path**: string

  - **Required**: Yes
