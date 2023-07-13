import { z } from 'zod';

interface Group {
  '@id': string;
  description: string;
  email: string;
  groupname: string;
  id: string;
  members: {
    '@id': string;
    items: any[];
    items_total: number;
  };
  roles: string[];
  title: string;
}

export interface GetGroupRootResponse extends Array<Group> {}

export const createGroupDataSchema = z.object({
  description: z.string(),
  email: z.string(),
  groupname: z.string(),
  groups: z.array(z.string()),
  roles: z.array(z.string()),
  title: z.string(),
  users: z.array(z.string()),
});

export const updateGroupDataSchema = { ...createGroupDataSchema };

export interface CreateGroupResponse extends Group {}
