import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel } from "./UserModel.js";
import { ProductModel } from "./ProductModel.js";


export const CartModel = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });


  // Relaciones
UserModel.hasMany(CartModel, { foreignKey: "user_id" });
CartModel.belongsTo(UserModel, { foreignKey: "user_id" });

ProductModel.hasMany(CartModel, { foreignKey: "product_id" });
CartModel.belongsTo(ProductModel, { foreignKey: "product_id" });
