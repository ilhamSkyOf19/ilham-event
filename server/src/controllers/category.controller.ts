import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../utils/request-response-type";
import {
  CategoryCreateType,
  CategoryResponseType,
  CategoryResponseWithMeta,
  CategoryUpdateType,
} from "../models/category-model";
import { CategoryValidation } from "../validations/category-validation";
import { validationRequest } from "../utils/validation";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  // create
  static async create(
    req: Request<{}, {}, CategoryCreateType>,
    res: Response<ResponseType<CategoryResponseType | null>>,
    next: NextFunction,
  ) {
    try {
      // validate request body
      const body = validationRequest<CategoryCreateType>(
        CategoryValidation.CREATE,
        req.body,
      );

      // cek status
      if (body.status === "failed") {
        return res.status(400).json({
          status: "failed",
          message: body.message,
          data: null,
        });
      }

      // create category
      const category = await CategoryService.create(body.data!);

      return res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // find all with pagination
  static async findAllWithPagination(
    req: Request<{}, {}, {}, { page: number; limit: number; search?: string }>,
    res: Response<ResponseType<CategoryResponseWithMeta | null>>,
    next: NextFunction,
  ) {
    try {
      // get query params
      const { limit, page, search } = req.query;

      // call service
      const result = await CategoryService.findAllWithPagination({
        limit,
        page,
        search,
      });

      // return response
      return res.status(200).json({
        status: "success",
        message: "Categories retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // find detail by id
  static async findDetailById(
    req: Request<{ id: string }>,
    res: Response<ResponseType<CategoryResponseType | null>>,
    next: NextFunction,
  ) {
    try {
      // get id from params
      const { id } = req.params;

      // call service
      const result = await CategoryService.findDetailById(id);

      // return response
      return res.status(200).json({
        status: "success",
        message: "Category retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }, {}, CategoryUpdateType>,
    res: Response<ResponseType<CategoryResponseType | null>>,
    next: NextFunction,
  ) {
    try {
      // get id from params
      const id = req.params.id;

      // validate request body

      const body = validationRequest<CategoryUpdateType>(
        CategoryValidation.UPDATE,
        req.body,
      );

      // cek status
      if (body.status === "failed") {
        return res.status(400).json({
          status: "failed",
          message: body.message,
          data: null,
        });
      }

      // update category
      const category = await CategoryService.update(id, body.data!);

      //   cek category
      if (!category) {
        return res.status(404).json({
          status: "failed",
          message: "Category not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseType<null>>,
    next: NextFunction,
  ) {
    try {
      // get id from params
      const id = req.params.id;

      // call service
      const response = await CategoryService.delete(id);

      // cek response
      if (!response) {
        return res.status(404).json({
          status: "failed",
          message: "Category not found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
