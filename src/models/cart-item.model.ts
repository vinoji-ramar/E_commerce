import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare productId: number;
  declare quantity: number;

  static initialize(sequelize: Sequelize): void {
    CartItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1
          }
        }
      },
      {
        sequelize,
        modelName: "CartItem",
        tableName: "cart_items",
        timestamps: true
      }
    );
  }
}

export { CartItem };
