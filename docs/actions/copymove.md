# Copy and Move

## Copying an object

To copy a content object, send a `POST` request to the `/@copy` endpoint at the destination's URL with the source object specified in the request body.
The source object can be specified either by URL, path, UID or `intid`:

## Moving an object

To move a content object, send a `POST` request to the `/@move` endpoint at the destination's URL with the source object specified in the request body.
The source object can be specified either by URL, path, UID or `intid`:

## Copy Content

This function can be used to create a copy of content object.

- Function name: `copyMutation`

### Parameters

- **data**: object

  - **Required:** Yes

    - It can have the following fields:

    - `source: string`

      - **Required:** Yes
      - The source object to copy. It can be specified either by URL, path, UID or `intid`.

## Move Content

This function can be used to move a content object.

- Function name: `moveMutation`

### Parameters

- **data**: object

  - **Required:** Yes

    - It can have the following fields:

    - `source: string`

      - **Required:** Yes
      - The source object to move. It can be specified either by URL, path, UID or `intid`.
