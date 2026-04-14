import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare totalAmount: number;
  declare itemCount: number;

  static initialize(sequelize: Sequelize): void {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "user_id"
        },
        totalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        itemCount: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true
      }
    );
  }
}

export { Order };
