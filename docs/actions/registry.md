# Registry

Registry records can be addressed through the `@registry` endpoint on the Plone site.
To address a specific record, the fully qualified dotted name of the registry record has to be passed as a path segment, for example, `/plone/@registy/my.record`.

Reading or writing registry records require the `cmf.ManagePortal` permission.

## Get Registry List

This function returns the list of all available registry records.

- Function name: getRegistriesQuery

## Get Registry

This function returns the registry record at the given path.

- Function name: getRegistryQuery

### Parameters

- **path**: string

  - **Required:** Yes

## Update Registry

This function updates the registry record at the given path.

- Function name: updateRegistryMutation

### Parameters

- **path**: string

  - **Required:** Yes

- **data**: record(string)

  - **Required:** Yes
