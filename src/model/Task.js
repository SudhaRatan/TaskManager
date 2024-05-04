import { Model } from "@nozbe/watermelondb";
import { text, field, relation } from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "tasks";
  static associations = {
    categories: { type: "belongs_to", key: "category_id" },
  };
  @text("title") title;
  @field("is_checked") isChecked;
  @relation("category_id", "categories") category;
}
