// category
export type ICategory = {
  name: string;
  description: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
};

// create
export type CategoryCreateType = Omit<
  ICategory,
  "createdAt" | "updatedAt" | "icon"
>;

// update
export type CategoryUpdateType = Partial<CategoryCreateType>;

// category
export type CategoryResponseType = ICategory & {
  _id: string;
};

// to response
export const toCategoryResponseType = (
  category: CategoryResponseType,
): CategoryResponseType => {
  return {
    _id: category._id,
    name: category.name,
    description: category.description,
    icon: category.icon,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};

// category response with meta
export type CategoryResponseWithMeta = {
  data: CategoryResponseType[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
};

// to response with meta
export const toCategoryResponseWithMeta = (
  categories: CategoryResponseWithMeta,
): CategoryResponseWithMeta => {
  return {
    data: categories.data.map((category) => toCategoryResponseType(category)),
    meta: categories.meta,
  };
};
