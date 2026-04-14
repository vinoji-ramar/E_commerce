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
  return Product.findByPk(productId, transaction ? { transaction } : undefined);
};

const updateImageUrl = async (product: Product, imageUrl: string, transaction?: Transaction) => {
  await product.update({ imageUrl }, transaction ? { transaction } : undefined);
  return product;
};

const updateStock = async (product: Product, stock: number, transaction?: Transaction) => {
  await product.update({ stock }, transaction ? { transaction } : undefined);
  return product;
};

const create = async (
  payload: { name: string; brand: string; price: number; stock: number; imageUrl?: string | null },
  transaction?: Transaction
) => {
  return Product.create(payload, transaction ? { transaction } : undefined);
};

const update = async (
  product: Product,
  payload: Partial<{ name: string; brand: string; price: number; stock: number; imageUrl: string | null }>,
  transaction?: Transaction
) => {
  await product.update(payload, transaction ? { transaction } : undefined);
  return product;
};

const destroy = async (product: Product, transaction?: Transaction) => {
  await product.destroy(transaction ? { transaction } : undefined);
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
