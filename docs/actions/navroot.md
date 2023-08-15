# Navigation root

Plone has a concept called {term}`navigation root` which provides a way to root catalog queries, searches, breadcrumbs, and so on in a given section of the site.
This feature is useful when working with subsites or multilingual sites, because it allows the site manager to restrict searches or navigation queries to a specific location in the site.

## Get Navigation

This function returns the navigation root for the given path.

- Function name: getNavigationRootQuery

### Parameters

- **path**: string

  - **Required:** Yes

- **language**: string

  - **Required:** No
