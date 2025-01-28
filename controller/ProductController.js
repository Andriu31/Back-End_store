import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
 import { ProductModel } from "../models/ProductModel.js";
 import { upload } from "../config/upload.js";
 
 export const createProduct = async (req, res) => {
    try {
      const { name, description, precio, categoria, stock } = req.body;
  
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


  export const addProductImage = async (req, res) => {
    const { id } = req.params; // ID del producto
    const file = req.file; // Archivo de imagen cargado
  
    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }
  
    try {
      // Buscar el producto en la base de datos por su ID
      const product = await ProductModel.findOne({ where: { id } });
      if (product) {
        // Actualizar el campo 'image' del producto con el nombre del archivo
        product.set({
          ...product,
          imagen: file.filename,
        });
        await product.save(); // Guardar los cambios en la base de datos
  
        return res.status(200).json({ message: "Image added to product successfully" });
      } else {
        // Si el producto no se encuentra
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while adding the image to the product" });
    }
  };

  