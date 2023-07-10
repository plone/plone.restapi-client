import { Components } from './common';

export interface GetContentResponse {
  '@components': {
    [key in Components]: {
      '@id': string;
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
  effective: string;
  exclude_from_nav: boolean;
  expires: string;
  id: string;
  is_folderish: boolean;
  items: Array<{
    '@id': string;
    '@type': string;
    description: string;
    image_field: null;
    image_scales: null;
    review_state: string;
    title: string;
  }>;
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
  relatedItems: [];
  review_state: string;
  rights: string;
  subjects: [];
  table_of_contents: boolean;
  title: string;
}
