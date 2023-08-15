# Relations

Plone's relations represent binary relationships between content objects.

A single relation is defined by source, target, and relation name.

You can define relations either with content type schema fields `RelationChoice` or `RelationList`, or with types `isReferencing` or `iterate-working-copy`.

- Relations based on fields of a content type schema are editable by users.
- The relations `isReferencing` (block text links to a Plone content object) and `iterate-working-copy` (working copy is enabled and the content object is a working copy) are not editable.
  They are created and deleted with links in text, respectively creating and deleting working copies.

## Get Relations List

This function returns the list of all existing relations user has access to.

- Function name: `getRelationsListQuery`

## Get Relations

This function returns the relations for the given parameters.

- Function name: `getRelationsQuery`

### Parameters

- **source**: string

  - **Required**: No

- **relation**: string

  - **Required**: No

- **onlyBroken**: boolean

  - **Required**: No

## Add Relation

This function is used to add a relation for the given parameters.

- Function name: `createRelationMutation`

### Parameters

- **data**: object[]

  - **Required**: Yes
  - An array of objects with the following fields:

    `source: string`

    - **Required**: Yes

    `target: string`

    - **Required**: Yes

    `relation: string`

    - **Required**: Yes

## Fix Relation

This function is used to fix broken relations. Broken relations can be fixed by releasing and re-indexing them.

- Function name: `fixRelationMutation`

### Parameters

- **data**: object

  - **Required**: No
  - It can have the following fields:

    `flush: boolean`

    - **Required**: No

## Delete Relation

This function is used to delete a relation for the given parameters.

- Function name: `deleteRelationMutation`

### Parameters

- **data**: object[]

  - **Required**: Yes
  - An array of objects with the following fields:

    `items: object[]`

    - **Required**: No
    - An array of objects with the following fields:

      `source: string`

      - **Required**: Yes

      `target: string`

      - **Required**: Yes

      `relation: string`

      - **Required**: Yes

    `source: string`

    - **Required**: No

    `target: string`

    - **Required**: No

    `relation: string`

    - **Required**: No
