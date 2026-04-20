
import { env } from "../config/env";
import { productRepository } from "../repositories/product.repository";
import { AppError } from "../utils/app-error.util";
import { buildPagination } from "../utils/pagination.util";
import { ProductListQuery } from "../validations/common.validation";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../validations/product.validation";

const getProducts = async (query: ProductListQuery["query"]) => {
  const limit = Number(query.limit ?? 10);
  const offset = Number(query.offset ?? 0);
  const brand = query.brand?.trim();

  const { rows, count } = await productRepository.getProducts({
    limit,
    offset,
    brand,
  });

  return {
    items: rows,
    pagination: buildPagination(limit, offset, count),
  };
};

const getProductById = async (productId: number) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return product;
};

const createProduct = async (payload: CreateProductInput["body"]) => {
  return productRepository.create(payload);
};

const updateProduct = async (
  productId: number,
  payload: UpdateProductInput["body"],
) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return productRepository.update(product, payload);
};

const deleteProduct = async (productId: number) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  await productRepository.destroy(product);
};

const uploadProductImage = async (
  productId: number,
  file?: Express.Multer.File,
) => {
  if (!file) {
    throw new AppError(400, "Product image file is required");
  }

  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const normalizedPath = file.path.replace(/\\/g, "/");
  const imageUrl = `${env.BASE_URL}/${normalizedPath}`;

  return productRepository.updateImageUrl(product, imageUrl);
};

export const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
};
