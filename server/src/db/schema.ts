import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./helpers";

const testTable = sqliteTable("test_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

const ratingsTable = sqliteTable("ratings", {
  id: int().primaryKey({ autoIncrement: true }),
  gifId: int().notNull(),
  userId: int()
    .notNull()
    .references(() => testTable.id),
  rating: int().notNull(),
  // ...timestamps,
});

const commentsTable = sqliteTable("comments", {
  id: int().primaryKey({ autoIncrement: true }),
  gifId: int().notNull(),
  userId: int()
    .notNull()
    .references(() => testTable.id),
  comment: text().notNull(),
  ...timestamps,
});

export { testTable, ratingsTable, commentsTable };
