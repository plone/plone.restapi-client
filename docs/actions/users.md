# Users

Available users in a Plone site can be created, queried, updated, and deleted by interacting with the `/@users` endpoint on portal root.
This action requires an authenticated user:

## Get Users list

This function returns the retrieve list of all users in the portal.

-   Function name: getUsersQuery

## Get User

This function returns the information about an individual user at the given path.

-   Function name: getUserQuery

### Parameters

-   **path**: string

    -   **Required**: true

## Add User

This function can be used to add a new user at the given path.

-   Function name: createUserMutation

### Parameters

-   **data**: object

    -   **Required**: Yes
    -   It can have the following fields:

        `description: string`

        -   **Required**: No

        `email: string`

        -   **Required**: Yes

        `fullname: string`

        -   **Required**: No

        `home_page: string`

        -   **Required**: No

        `location: string`

        -   **Required**: No

        `sendPasswordReset: boolean`

        -   **Required**: No

        `password: string`

        -   **Required**: No

        `roles: string[]`

        -   **Required**: No

        `username: string`

        -   **Required**: Yes

## Update User

This function can be used to update an existing user at the given path.

-   Function name: updateUserMutation

### Parameters

-   **path**: string

    -   **Required**: true

-   **data**: object

    -   **Required**: Yes
    -   It can have the following fields:

        `description: string`

        -   **Required**: No

        `email: string`

        -   **Required**: No

        `fullname: string`

        -   **Required**: No

        `home_page: string`

        -   **Required**: No

        `location: string`

        -   **Required**: No

        `username: string`

        -   **Required**: No

        `portrait: object`

        -   **Required**: No

## Delete User

This function can be used to delete an existing user at the given path.

-   Function name: deleteUserMutation

### Parameters

-   **path**: string

    -   **Required**: true

## Update User Password

This function can be used to update an existing user password at the given path.

-   Function name: updateUserPasswordMutation

### Parameters

-   **path**: string

    -   **Required**: true

-   **data**: object

    -   **Required**: Yes
    -   The data object can contain the following fields:

        `old-password: string`

        -   **Required**: Yes

        `new-password: string`

        -   **Required**: Yes

## Reset User Password

This function can be used to reset an existing user password at the given path.

-   Function name: resetUserPasswordMutation

### Parameters

-   **path**: string

    -   **Required**: true

## Reset User Password with Token

This function can be used to reset an existing user password at the given path.

-   Function name: resetUserPasswordWithTokenMutation

### Parameters

-   **path**: string

    -   **Required**: true

-   **data**: object

    -   **Required**: Yes
    -   It can have the following fields:

        `reset_token: string`

        -   **Required**: Yes

        `new_password: string`

        -   **Required**: Yes
