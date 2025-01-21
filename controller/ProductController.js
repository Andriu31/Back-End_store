import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
 import { ProductModel } from "../models/ProductModel.js";

 export const createProduct = async (req, res) => {
    try {
      const { name, description, precio, categoria, imagen, stock } = req.body;
  
      // Verificar si todos los campos requeridos están presentes
      if (!name || !precio || !categoria || !stock) {
        return res.status(400).json({ message: "Todos los campos obligatorios deben ser completados" });
      }
  
      // Crear el producto en la base de datos
      const producto = await ProductModel.create({
        name,
        description,
        precio,
        categoria,
        imagen,
        stock,
      });
  
      res.status(201).json({ message: "Producto creado exitosamente", producto });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getProducts = async (req, res) => {
    try {
      // Obtener todos los productos de la base de datos
      const productos = await ProductModel.findAll();
  
      if (productos.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos" });
      }
  
      // Devolver la lista de productos
      res.status(200).json({ message: "Productos obtenidos exitosamente", productos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  