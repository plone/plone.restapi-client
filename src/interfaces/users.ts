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
  description: z.string().optional(),
  email: z.string().email(),
  fullname: z.string().optional(),
  home_page: z.string().url().optional(),
  location: z.string().optional(),
  sendPasswordReset: z.boolean(),
  username: z.string(),
});

export const updateUserDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().email().optional(),
  fullname: z.string().optional(),
  home_page: z.string().url().optional(),
  location: z.string().optional(),
  username: z.string().optional(),
});

export const createdUserDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().email(),
  fullname: z.string().optional(),
  home_page: z.string().url().optional(),
  location: z.string().optional(),
  password: z.string(),
  roles: z.array(z.string()).optional(),
  username: z.string(),
});

export const resetUserDataSchema = z.object({
  reset_token: z.string(),
  new_password: z.string(),
});

export const updateUserPotraitDataSchema = z.object({
  'content-type': z.string(),
  data: z.string(),
  encoding: z.string(),
  filename: z.string(),
});

export const updateUserPotraitScaleDataSchema = z.object({
  'content-type': z.string(),
  data: z.string(),
  encoding: z.string(),
  filename: z.string(),
  scale: z.boolean(),
});