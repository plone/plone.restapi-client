# Translations

Translations endpoint is used to handle the translation information of the content objects.

## Get Translation

This function returns the translation information of the given path.

- Function name: getTranslationQuery

### Parameters

- **path**: string

  - **Required:** Yes

## Link Translation

This function can be used to link a translation to the given path.

- Function name: linkTranslationMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `id: string`

    - **Required:** Yes

## Unlink Translation

This function can be used to unlink a translation from the given path.

- Function name: unlinkTranslationMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `language: string`

    - **Required:** Yes
