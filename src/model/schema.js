import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "categories",
      columns: [{ name: "title", type: "string" }],
    }),
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "category_id", type: "string" },
        { name: "is_checked", type: "boolean" },
      ],
    }),
  ],
});
