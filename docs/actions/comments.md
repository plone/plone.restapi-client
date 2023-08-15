# Comments

Plone offers to users a feature to post comments on any content object with `plone.app.discussion`.

Commenting can be enabled globally for specific content types and for single content objects.

When commenting is enabled on your content object, you can retrieve a list of all existing comments, add new comments, reply to existing comments, or delete a comment.

## Get Comments List

This function returns the list of all comments for the given path.

- Function name: getCommentsQuery

### Parameters

- **path**: string

  - **Required:** Yes

## Add Comment

This function can be used to add a comment to the given path.

- Function name: createCommentMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **reply_id**: string

  - **Required:** No
  - The id of the comment to which you want to reply

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `text: string`

    - **Required:** Yes
    - The content of the comment.

## Update Comment

This function can be used to update a comment for the given id and path.

- Function name: updateCommentMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **comment_id**: string

  - **Required:** Yes

- **data**: object

  - **Required:** Yes
  - It can have the following fields:

    `text: string`

    - **Required:** Yes
    - The content of the comment.

## Delete Comment

This function can be used to delete a comment for the given id and path.

- Function name: deleteCommentMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **comment_id**: string

  - **Required:** Yes
