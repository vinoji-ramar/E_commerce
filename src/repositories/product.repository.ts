import { Op, Transaction, WhereOptions } from "sequelize";
import { Product } from "../models/product.model";

type ProductListOptions = {
  limit: number;
  offset: number;
  brand?: string;
};

const getProducts = async ({ limit, offset, brand }: ProductListOptions) => {
  const where: WhereOptions | undefined = brand
    ? {
        brand: {
          [Op.like]: `%${brand}%`
        }
      }
    : undefined;

  return Product.findAndCountAll({
    where,
    order: [["id", "ASC"]],
    limit,
    offset
  });
};

const findById = async (productId: number, transaction?: Transaction) => {
  return Product.findByPk(productId);
};

const updateImageUrl = async (product: Product, imageUrl: string) => {
  await product.update({ imageUrl });
  return product;
};

const updateStock = async (product: Product, stock: number, transaction?: Transaction) => {
  await product.update({ stock });
  return product;
};

const create = async (
  payload: { name: string; brand: string; price: number; stock: number; imageUrl?: string | null }
) => {
  return Product.create(payload);
};

const update = async (
  product: Product,
  payload: Partial<{ name: string; brand: string; price: number; stock: number; imageUrl: string | null }>
) => {
  await product.update(payload);
  return product;
};

const destroy = async (product: Product) => {
  await product.destroy();
};

export const productRepository = {
  getProducts,
  findById,
  updateImageUrl,
  updateStock,
  create,
  update,
  destroy
};