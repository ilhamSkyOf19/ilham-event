import z from "zod";
import {
  CategoryCreateType,
  CategoryUpdateType,
} from "../models/category-model";

export class CategoryValidation {
  // schema name
  private static readonly NAME_SCHEMA = z
    .string("name barupa string")
    .min(3, "name minimal 3 karakter")
    .max(50, "name maksimal 50 karakter")
    .trim();

  // schema description
  private static readonly DESCRIPTION_SCHEMA = z
    .string("description berupa string")
    .min(10, "description minimal 10 karakter")
    .max(200, "description maksimal 200 karakter")
    .trim();

  // create
  static readonly CREATE = z
    .object({
      // name schema
      name: this.NAME_SCHEMA,
      // description schema
      description: this.DESCRIPTION_SCHEMA,
    })
    .strict() satisfies z.ZodType<CategoryCreateType>;

  // update
  static readonly UPDATE = z
    .object({
      // name schema
      name: this.NAME_SCHEMA.optional(),
      // description schema
      description: this.DESCRIPTION_SCHEMA.optional(),
    })
    .strict() satisfies z.ZodType<CategoryUpdateType>;
}
