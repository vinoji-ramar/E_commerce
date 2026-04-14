import { Sequelize } from "sequelize";

import { CartItem } from "./cart-item.model";
import { OrderItem } from "./order-item.model";
import { Order } from "./order.model";
import { Product } from "./product.model";
import { RefreshToken } from "./refresh-token.model";
import { User } from "./user.model";

const initializeModels = (sequelize: Sequelize): void => {
  Product.initialize(sequelize);
  CartItem.initialize(sequelize);
  Order.initialize(sequelize);
  OrderItem.initialize(sequelize);
  User.initialize(sequelize);
  RefreshToken.initialize(sequelize);

  CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
  Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems" });
  CartItem.belongsTo(User, { foreignKey: "userId", as: "user" });
  User.hasMany(CartItem, { foreignKey: "userId", as: "cartItems" });

  OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
  Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });

  Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
  Order.belongsTo(User, { foreignKey: "userId", as: "user" });
  User.hasMany(Order, { foreignKey: "userId", as: "orders" });

  RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" });
  User.hasMany(RefreshToken, { foreignKey: "userId", as: "refreshTokens" });
};

export { initializeModels, Product, CartItem, Order, OrderItem, User, RefreshToken };
