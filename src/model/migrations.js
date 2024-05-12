import {
  createTable,
  schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: "subtasks",
          columns: [
            { name: "title", type: "string" },
            { name: "task_id", type: "string" },
            { name: "is_checked", type: "boolean" },
          ],
        }),
      ],
    },
  ],
});
