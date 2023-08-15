# Upgrade

A Plone site needs to be in sync with the version available on the file system.
The `@upgrade` endpoint exposes upgrade information about the Plone backend, and supports running the upgrade of the site.

## Get Upgrade Information

This function returns the upgrade information about the Plone backend.

- Function name: `getUpgradeQuery`

## Run Upgrade

This function can be used to run upgrade of the Plone backend.

- Function name: `runUpgradeMutation`

### Parameters

- **data**: object

  - **Required**: Yes
  - It can have the following fields:

    - `dry_run: boolean`

    - **Required**: Yes
    - If true, the upgrade will be run in dry-run mode.
