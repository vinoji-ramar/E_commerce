import { Product } from "../models/product.model";

const productSeedData = [
  { name: "iPhone 15", brand: "Apple", price: 79999, stock: 12 },
  { name: "iPhone 15 Pro", brand: "Apple", price: 134999, stock: 7 },
  { name: "Galaxy S24", brand: "Samsung", price: 74999, stock: 14 },
  { name: "Galaxy Z Fold 6", brand: "Samsung", price: 164999, stock: 5 },
  { name: "Pixel 9", brand: "Google", price: 84999, stock: 10 },
  { name: "OnePlus 12", brand: "OnePlus", price: 64999, stock: 16 },
  { name: "Xiaomi 14", brand: "Xiaomi", price: 59999, stock: 11 },
  { name: "Nothing Phone 2", brand: "Nothing", price: 44999, stock: 13 }
];

const seedProducts = async (): Promise<void> => {
  const existingCount = await Product.count();

  if (existingCount > 0) {
    return;
  }

  await Product.bulkCreate(productSeedData);
};

export { seedProducts };
