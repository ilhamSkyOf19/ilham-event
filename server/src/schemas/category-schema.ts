import { model, Schema } from "mongoose";
import { ICategory } from "../models/category-model";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    icon: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// model
const CategoryModel = model<ICategory>("Category", categorySchema);

export default CategoryModel;
