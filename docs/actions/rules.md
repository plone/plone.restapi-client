# Rules

## Get Rules

This function returns the content-rules for the given path.

- Function name: getRulesQuery

### Parameters

- **path**: string

  - **Required:** Yes

## Add Rule

This function can be used to add a content-rule to a page.

- Function name: createRuleMutation

### Parameters

- **ruleId**: string

  - **Required:** Yes

## Update Rule

This function can be used to update a content-rule for the given rule ids.

- Function name: updateRulesMutation

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `form.button.Bubble: boolean`

    - **Required:** No

    `form.button.NoBubble: boolean`

    - **Required:** No

    `form.button.Enable: boolean`

    - **Required:** No

    `form.button.Disable: boolean`

    - **Required:** No

    `rules_ids: string[]`

    - **Required:** No

    `operation: string`

    - **Required:** No

## Delete Rule

This function can be used to delete a content-rule for the given rule ids.

- Function name: deleteRulesMutation

### Parameters

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `rules_ids: string[]`

    - **Required:** Yes
