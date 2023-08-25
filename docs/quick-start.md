# Quick Start

The Javascript Plone client is based on the foundations that TanStack Query lays off.
It provides all the artifacts that it requires plus also an apiRequest layer to build and send arbitrary requests to an API.

## ploneClient

The main artifact that the client provides is the `ploneClient` entry point.

Once imported, you should call `initialize` to setup its basic parameters.

After initialization, you can import all the pre-made query factories.

```ts
import ploneClient from '@plone/client';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});
```

## Query factories

A query factory is a TanStack Query basic artifact, a function that returns a query object, ready to be passed to a React Query hook (in case that we are in a React environment) or to the TanStack Query adapter that we are using in our framework.

```ts
const { getContentQuery } = client;

const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));
```

The query factories take an object as configuration. These object has some common properties and other depending on the nature of the endpoint that they are correspond with.

These is the complete example of the usage of the client in a React client component:

```jsx
import { useQuery } from '@tanstack/react-query';
import ploneClient from '@plone/client';
import { usePathname } from 'next/navigation';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});

export default function Title() {
  const { getContentQuery } = client;
  const pathname = usePathname();
  const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  }

  return '';
}
```

## Hooks

We have provided custom hooks for actions that can be used directly in functional React components.

```ts
const { useGetContent } = client;

const { data, isLoading } = useGetContent({ path: pathname });
```

.. autofunction:: getContentQuery
.. autofunction:: createContentMutation
.. autofunction:: updateContentMutation
.. autofunction:: deleteContentMutation
