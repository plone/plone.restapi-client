# Control Panels

Control panels in Plone allow you to configure the global site setup of a Plone site.
The `@controlpanels` endpoint in `plone.restapi` allows you to list all existing control panels in a Plone site, and to retrieve or edit the settings of a specific control panel.

## Get Control Panels List

This function returns the list of all control panels in the portal.

-   Function name: getControlpanelsQuery

## Get Control Panel

This function returns the information about an individual control panel at the given path.

-   Function name: getControlpanelQuery

### Parameters

-   **path**: string

    -   **Required**: true

## Add Custom Elements in Control Panel

This function can be used to add a custom element in the control panel.

-   Function name: createControlpanelMutation

### Parameters

-   **data**: any

    -   **Required**: true

## Update Custom Elements in Control Panel

This function can be used to update a custom element in the control panel at the given path.

-   Function name: updateControlpanelMutation

### Parameters

-   **data**: any

    -   **Required**: true

## Delete Custom Elements in Control Panel

This function can be used to delete a custom element in the control panel at the given path.

-   Function name: deleteControlpanelMutation

### Parameters

-   **path**: string

    -   **Required**: true

-   **data**: any

    -   **Required**: true
