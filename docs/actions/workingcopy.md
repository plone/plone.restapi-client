# Working Copy

```{note}
This feature is available only on Plone 5 or greater.
```

Plone has a _working copy_ feature provided by the core package `plone.app.iterate`.
It allows the users to create a working copy of a published or live content object, and work with it until it is ready to be published without having to edit the original object.

## Get Working Copy

This function returns the working copy of a content object.

- Function name: getWorkingcopyQuery

### Parameters

- **path**: string

  - **Required:** Yes

## Add Working Copy

This function can be used to add a working copy of a content object.

- Function name: createWorkingcopyMutation

### Parameters

- **path**: string

  - **Required:** Yes

## Check In Working Copy

This function can be used to check in a working copy to update the original content object.

- Function name: checkinWorkingcopyMutation

### Parameters

- **path**: string

  - **Required:** Yes

## Delete Working Copy

This function can be used to delete a working copy.

- Function name: deleteWorkingcopyMutation

### Parameters

- **path**: string

  - **Required:** Yes
