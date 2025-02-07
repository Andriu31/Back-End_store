import { CartModel } from "../models/CartModel.js";
import { ProductModel } from "../models/ProductModel.js";

// Agregar producto al carrito
export const addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
  
    try {
      // Verificar si el producto ya está en el carrito
      const existingCartItem = await CartModel.findOne({
        where: { user_id, product_id },
      });
  
      if (existingCartItem) {
        // Si ya existe, actualizar la cantidad
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        // Si no existe, crear un nuevo registro en el carrito
        await CartModel.create({ user_id, product_id, quantity });
      }
  
      res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Obtener el carrito de un usuario
  export const getCart = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const cartItems = await CartModel.findAll({
        where: { user_id },
        include: [{ model: ProductModel, attributes: ["id", "name", "precio", "imagen"] }],
      });
  

      

      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar un producto del carrito
  export const removeFromCart = async (req, res) => {
    const { id } = req.params;
  
    try {
      await CartModel.destroy({ where: { id } });
      res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Vaciar el carrito de un usuario
  export const clearCart = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      await CartModel.destroy({ where: { user_id } });
      res.status(200).json({ message: "Carrito vaciado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  