import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare expiresAt: Date;
  declare isRevoked: CreationOptional<boolean>;

  static initialize(sequelize: Sequelize): void {
    RefreshToken.init(
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
        token: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        isRevoked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        sequelize,
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
        timestamps: true
      }
    );
  }
}

export { RefreshToken };
