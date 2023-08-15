import { Components, Item, RelatedItem } from './common';

export interface GetContentResponse {
  '@components': {
    [key in Components]?: {
      [key: string]: unknown;
      items?: unknown[];
    };
  };
  '@id': string;
  '@type': string;
  UID: string;
  allow_discussion: boolean;
  blocks: {
    [k in string]: {
      '@id': string;
    } & Record<string, unknown>;
  };
  blocks_layout: {
    items: string[];
  };
  contributors: string[];
  creators: string[];
  description: string;
  effective: string | null;
  exclude_from_nav: boolean;
  expires: string | null;
  id: string;
  is_folderish: boolean;
  items: Item[];
  items_total: number;
  language: {
    title: string;
    token: string;
  };
  lock: {
    locked: boolean;
    stealable: boolean;
  };
  parent: {};
  relatedItems: RelatedItem[];
  review_state: string | null;
  rights: string;
  subjects: [];
  table_of_contents: boolean | null;
  title: string;
}
