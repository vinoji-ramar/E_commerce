import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare brand: string;
  declare price: number;
  declare stock: number;
  declare imageUrl: CreationOptional<string | null>;

  static initialize(sequelize: Sequelize): void {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        }
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: true
      }
    );
  }
}

export { Product };
