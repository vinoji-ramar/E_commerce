import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
  declare id: CreationOptional<number>;
  declare orderId: number;
  declare productId: number;
  declare quantity: number;
  declare unitPrice: number;

  static initialize(sequelize: Sequelize): void {
    OrderItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        unitPrice: {
          type: DataTypes.FLOAT,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "OrderItem",
        tableName: "order_items",
        timestamps: true
      }
    );
  }
}

export { OrderItem };
