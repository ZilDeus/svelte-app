import { pgTable, bigint, text, numeric, jsonb} from "drizzle-orm/pg-core";

export const items = pgTable('items', {
  Id: bigint('id', { mode: 'number' }).primaryKey(),
  Name: text('name'),
  Unit: text('unit'),
  Cratio: numeric('cratio'),
  Pratio: numeric('pratio')
});

export const users = pgTable('users', {
  Id: bigint('id', { mode: 'number' }).primaryKey(),
  Email: text('email'),
  Password: text('password'),
  Meals: jsonb('meals'),
});
