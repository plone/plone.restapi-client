# Types

Available content types in a Plone site can be listed and queried by accessing the `/@types` endpoint on any context.

## Get Types List

This function returns the list of all available types.

- Function name: getTypesQuery

## Get Type

This function returns the information about the content type provided.

- Function name: getTypeQuery

### Parameters

- **contentPath**: string

  - **Required:** Yes

## Get Type Field

This function returns the information about the fieldset of the type provided.

- Function name: getTypeFieldQuery

### Parameters

- **contentFieldPath**: string

  - **Required:** Yes

## Add Type Field/Fieldset

This function can be used to add a fieldset to the type provided.

- Function name: createTypeFieldMutation

### Parameters

- **contentPath**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `description: string`

    - **Required:** Yes

    `factory: string`

    - **Required:** Yes

    `required: boolean`

    - **Required:** No

    `title: string`

    - **Required:** Yes

## Update Type Field/Fieldset

This function can be used to update a field/fieldset of the type provided.

- Function name: updateTypeFieldMutation

### Parameters

- **contentPath**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `description: string`

    - **Required:** No

    `maxLength: integer`

    - **Required:** No

    `minLength: integer`

    - **Required:** No

    `fields: string[]`

    - **Required:** No

    `required: boolean`

    - **Required:** No

    `title: string`

    - **Required:** No

    `properties: any`

    - **Required:** No

    `fieldsets: any[]`

    - **Required:** No
