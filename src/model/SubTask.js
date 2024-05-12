import { Model } from "@nozbe/watermelondb";
import { field, relation, text } from "@nozbe/watermelondb/decorators";

export default class SubTask extends Model {
  static table = "subtasks";
  static associations = {
    tasks: { type: "belongs_to", key: "task_id" },
  };
  @text("title") title;
  @field("is_checked") isChecked;
  @relation("task_id", "tasks") task;
}
