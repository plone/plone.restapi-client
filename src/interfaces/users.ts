import { z } from 'zod';

export interface User {
  '@id': string;
  description: string;
  email: string;
  fullname: string;
  groups: {
    '@id': string;
    items: {
      id: string;
      title: string;
    }[];
    items_total: number;
  };
  home_page: string;
  id: string;
  location: string;
  portrait: null;
  roles: string[];
  username: string;
}

export type GetUsersRootResponse = Array<User>;

export const createUserDataSchema = z.object({
  description: z.string(),
  email: z.string().email(),
  fullname: z.string(),
  home_page: z.string().url(),
  location: z.string(),
  sendPasswordReset: z.boolean(),
  username: z.string(),
});

export const updateUserDataSchema = z.object({
  description: z.string(),
  email: z.string().email(),
  fullname: z.string(),
  home_page: z.string().url(),
  location: z.string(),
  username: z.string(),
});