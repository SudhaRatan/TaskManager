import { Model } from "@nozbe/watermelondb";
import {
  text,
  field,
  relation,
  children,
} from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "tasks";
  static associations = {
    categories: { type: "belongs_to", key: "category_id" },
    subtasks: { type: "has_many", foreignKey: "task_id" },
  };
  @text("title") title;
  @field("is_checked") isChecked;
  @text("description") description;
  @relation("category_id", "categories") category;
  @children("subtasks") subTasks;
}
