import { ObjectionModel } from '@libs/core';

export interface User$Model extends ObjectionModel {
  id?: number;
  uuid?: string;
  role?: number;
  status?: number;
  email: string;
  password?: Promise<string>;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
