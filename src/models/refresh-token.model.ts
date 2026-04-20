import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare expiresAt: Date;
  declare isRevoked: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

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
          allowNull: false,
          field: "user_id"   // 👈 maps camelCase → snake_case
        },
        token: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "expires_at"
        },
        isRevoked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: "is_revoked"
        },
        createdAt: {
          type: DataTypes.DATE,
          field: "created_at"
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: "updated_at"
        }
      },
      {
        sequelize,
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
        timestamps: true,
        underscored: true
      }
    );
  }
}
export { RefreshToken };