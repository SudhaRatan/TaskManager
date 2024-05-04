import { Model } from "@nozbe/watermelondb";
import {text, children,} from "@nozbe/watermelondb/decorators"

export default class Category extends Model {
  static table = "categories";
  static associations = {
    tasks: { type: "has_many", foreignKey: "category_id" },
  };
  @text("title") title;
  @children("tasks") tasks;
}
