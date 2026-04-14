import { Request, Response } from "express";

import { MESSAGES } from "../constants/messages";
import { productService } from "../services/product.service";
import { sendSuccess } from "../utils/response.util";

const getProducts = async (request: Request, response: Response): Promise<void> => {
  const products = await productService.getProducts(request.query);

  sendSuccess(response, 200, MESSAGES.PRODUCT_LIST_FETCHED, products);
};

const getProductById = async (request: Request, response: Response): Promise<void> => {
  const productId = Number(request.params.id);
  const product = await productService.getProductById(productId);

  sendSuccess(response, 200, MESSAGES.PRODUCT_FETCHED, product);
};

const createProduct = async (request: Request, response: Response): Promise<void> => {
  const product = await productService.createProduct(request.body);
  sendSuccess(response, 201, "Product created successfully", product);
};

const updateProduct = async (request: Request, response: Response): Promise<void> => {
  const product = await productService.updateProduct(Number(request.params.id), request.body);
  sendSuccess(response, 200, "Product updated successfully", product);
};

const deleteProduct = async (request: Request, response: Response): Promise<void> => {
  await productService.deleteProduct(Number(request.params.id));
  sendSuccess(response, 200, "Product deleted successfully", null);
};

const uploadProductImage = async (request: Request, response: Response): Promise<void> => {
  const productId = Number(request.params.id);
  const product = await productService.uploadProductImage(productId, request.file);

  sendSuccess(response, 200, MESSAGES.PRODUCT_IMAGE_UPLOADED, product);
};

export const productController = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
};
