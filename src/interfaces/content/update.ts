import { Block, Components } from './common';

export interface UpdateContentResponse {
  '@components': {
    [key in Components]: {
      '@id': string;
    };
  };
  '@id': string;
  '@type': string;
  UID: string;
  allow_discussion: boolean;
  blocks: Block[];
  blocks_layout: {
    [k in string]: {
      items: string[];
    } & Record<string, unknown>;
  };
  contributors: string[];
  created: string;
  creators: string[];
  description: string;
  effective: string;
  exclude_from_nav: boolean;
  expires: string;
  id: string;
  is_folderish: boolean;
  items: [];
  items_total: number;
  language: string;
  layout: string;
  lock: {
    locked: boolean;
    stealable: boolean;
  };
  modified: string;
  next_item: {
    '@id': string;
    '@type': string;
    description: string;
    title: string;
  };
  parent: {
    '@id': string;
    '@type': string;
    description: string;
    title: string;
  };
  preview_caption: string;
  preview_image: File;
  previous_item: {
    '@id': string;
    '@type': string;
    description: string;
    title: string;
  };
  relatedItems: unknown;
  review_state: string;
  rights: string;
  subjects: [];
  title: string;
  version: string;
  working_copy: {
    '@id': string;
    created: string;
    creator_name: string;
    creator_url: string;
    title: string;
  };
  working_copy_of: {
    '@id': string;
    title: string;
  };
}
