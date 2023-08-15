# Link Integrity

When you create relations between content objects in Plone (for example, via relation fields or links in text blocks), these relations are stored in the database.
The Plone user interface will use those stored relations to show a warning when you try to delete a content object that is still referenced elsewhere.
Link integrity avoids broken links ("breaches") in the site.

This check includes content objects that are located within a content object ("folderish content").

The `@linkintegrity` endpoint returns the list of reference breaches.
If there are none, it will return an empty list (`[]`).

## Get Link Integrity

- This function is returns the list of possible reference breaches for given content object.

- Function name: `getLinkintegrityQuery`

### Parameters

- **uids**: string

  - **Required:** Yes
