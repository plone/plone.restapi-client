# Workflow

```{note}
Currently the workflow support is limited to executing transitions on content.
```

In Plone, content almost always has a {term}`workflow` attached.
We can get the current state and history of an object by issuing a `GET` request for any context:

## Get Workflow

This function returns the workflow for the given path.

- Function name: getWorkflowQuery

### Parameters

- **path**: string

  - **Required:** Yes

## Add Workflow

This function can be used to add a workflow to the given path.

- Function name: createWorkflowMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `comment: string`

    - **Required:** No

    `effective: string`

    - **Required:** No

    `expires: string`

    - **Required:** No

    `include_children: boolean`

    - **Required:** No
