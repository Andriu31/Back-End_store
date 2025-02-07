import express from "express";
import {addToCart, getCart, removeFromCart,clearCart,} from "../controller/cartController.js";

const rotuer = express.Router();

// Agregar producto al carrito
rotuer.post("/add", addToCart);

// Obtener el carrito de un usuario
rotuer.get("/:user_id", getCart);

// Eliminar un producto del carrito
rotuer.delete("/remove/:id", removeFromCart);

// Vaciar el carrito de un usuario
rotuer.delete("/clear/:user_id", clearCart);

export default rotuer;