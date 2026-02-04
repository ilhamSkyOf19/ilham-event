import {
  CategoryCreateType,
  CategoryResponseType,
  CategoryResponseWithMeta,
  CategoryUpdateType,
  toCategoryResponseType,
  toCategoryResponseWithMeta,
} from "../models/category-model";
import CategoryModel from "../schemas/category-schema";
import { RequestPaginationType } from "../utils/types";

export class CategoryService {
  // create
  static async create(
    req: CategoryCreateType,
  ): Promise<CategoryResponseType | null> {
    // get model
    const result = (
      await CategoryModel.create({
        name: req.name,
        description: req.description,
        icon: "default-icon.png",
      })
    ).toObject();

    return toCategoryResponseType({
      ...result,
      _id: result._id.toString(),
    });
  }

  // find all with pagination
  static async findAllWithPagination(
    pagination: RequestPaginationType,
  ): Promise<CategoryResponseWithMeta> {
    // get request pagination
    const { page = 1, limit = 10, search } = pagination;

    // build query object
    const query: any = {
      $or: [
        { name: { $regex: search ?? "", $options: "i" } },
        { description: { $regex: search ?? "", $options: "i" } },
      ],
    };

    // get count
    const total = await CategoryModel.countDocuments(query);

    // get data
    const result = await CategoryModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean<CategoryResponseType[]>();

    return toCategoryResponseWithMeta({
      data: result.map((category) => {
        return {
          _id: category._id.toString(),
          name: category.name,
          description: category.description,
          icon: category.icon,
        };
      }),
      meta: {
        page,
        limit,
        totalData: total,

        totalPage: Math.ceil(total / limit),
      },
    });
  }

  //   find detail by id
  static async findDetailById(
    id: string,
  ): Promise<CategoryResponseType | null> {
    const result =
      await CategoryModel.findById(id).lean<CategoryResponseType>();

    return result
      ? {
          _id: result._id.toString(),
          name: result.name,
          description: result.description,
          icon: result.icon,
        }
      : null;
  }

  // update
  static async update(
    id: string,
    req: CategoryUpdateType,
  ): Promise<CategoryResponseType | null> {
    const result = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.name,
          description: req.description,
        },
      },
      { new: true },
    ).lean<CategoryResponseType>();

    return result
      ? {
          _id: result._id.toString(),
          name: result.name,
          description: result.description,
          icon: result.icon,
        }
      : null;
  }

  //   delete
  static async delete(id: string): Promise<boolean> {
    const result = await CategoryModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
