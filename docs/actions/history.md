# History

The `@history` endpoint exposes history and versioning information on previous versions of the content.
Each change or workflow change on a content object or file is listed.
It also allows to revert to a previous version of the file.

## Get History

This function returns the history for the content at the given path.

-   Function name: getHistoryQuery

### Parameters

-   **path**: string

    -   **Required**: Yes

## Get Versioned History

This function returns the content for the specified path and version.

-   Function name: getHistoryVersionedQuery

### Parameters

-   **path**: string

    -   **Required**: Yes

-   **version**: string

    -   **Required**: Yes

## Revert to Version

This function reverts the content at the given path to the given version.

-   Function name: revertToVersionQuery

### Parameters

-   **path**: string

    -   **Required**: Yes

-   **version**: string

    -   **Required**: Yes
