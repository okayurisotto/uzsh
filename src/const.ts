import { z } from "zod";

export enum StorageKey {
  UserEntries = "user-entries",
}

export const UserEntryTypeSchema = z.enum(["executeScript", "insertCSS"]);

export const UserEntryUrlSchema = z
  .string()
  .transform((value) => new RegExp(value));

export const UserEntryWhen = [
  "onDOMContentLoaded",
  "onCompleted",
  "onHistoryStateUpdated",
] as const;

export const UserEntryWhenSchema = z.enum(UserEntryWhen).array();

export const UserEntrySchema = z.object({
  id: z.string(),
  type: UserEntryTypeSchema,
  url: UserEntryUrlSchema,
  when: UserEntryWhenSchema,
  source: z.string(),
});

export type UserEntryType = z.infer<typeof UserEntrySchema>;

export const StorageSchema = z.object({
  [StorageKey.UserEntries]: UserEntrySchema.array().default([]),
});
