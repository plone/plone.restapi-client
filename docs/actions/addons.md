# Add-ons

Add-on product records can be addressed through the `@addons` endpoint in a Plone site.
In order to address a specific record, the profile ID has to be passed as a path segment, such as `/plone/@addons/plone.session`.

Reading or writing add-ons metadata requires the `cmf.ManagePortal` permission.

## Get Addons list

This function returns the list of all add-ons in the portal.

- Function name: getAddonsQuery

## Get Addon

This function returns the information about an individual add-on at the given path.

- Function name: getAddonQuery

### Parameters

- **addonId**: string

  - **Required**: Yes

## Install Addons

This function can be used to install an add-on on a the given path.

- Function name: installAddonMutation

### Parameters

- **addonId**: string

  - **Required**: Yes

## Uninstall Addons

This function can be used to uninstall an add-on on a the given path.

- Function name: uninstallAddonMutation

### Parameters

- **addonId**: string

  - **Required**: Yes

## Install Addons profile

This function can be used to install an add-on profile at the given path.

- Function name: installAddonProfileMutation

### Parameters

- **addonId**: string

  - **Required**: Yes

- **profile**: string

  - **Required**: Yes

## Upgrade Addons

This function can be used to upgrade an add-on on a the given path.

- Function name: upgradeAddonMutation

### Parameters

- **addonId**: string

  - **Required**: Yes
