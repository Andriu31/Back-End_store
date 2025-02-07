import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
 import { ProductModel } from "../models/ProductModel.js";
 import { upload } from "../config/upload.js";
  import { Op } from "sequelize";

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
  
      res.status(201).json({ message: "Producto creado exitosamente", producto:{id: producto.id} });
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


  export const getProduct = async (req, res) => {
    try {
      const id = req.params.id;
      // Obtener todos los productos de la base de datos
      const productos = await ProductModel.findByPk(id);
  
      if (!productos) {
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


  export const searchProducto = async (req, res)=>{
    try {
      const { name } = req.body;
      const producto = await ProductModel.findAll(
          {
            where:{
              name: { [Op.like]: `%${name}%` }
            }
         
          }
         
        );
      res.status(200).json({productos : producto});
    }catch(error){
      console.log(error);
      res.status(500).json({message: "Error al buscar producto"});

    }
  };


  export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, precio, categoria, stock } = req.body;
        const file = req.file; // Imagen opcional

        const product = await ProductModel.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Actualizar datos del producto
        product.set({
            name: name || product.name,
            description: description || product.description,
            precio: precio || product.precio,
            categoria: categoria || product.categoria,
            stock: stock || product.stock,
            imagen: file ? file.filename : product.imagen // Si hay nueva imagen, actualizar
        });

        await product.save();
        res.status(200).json({ message: "Producto actualizado exitosamente", product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};


export const deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);
      if (!product) {
          return res.status(404).json({ message: "Producto no encontrado" });
      }

      await product.destroy();
      res.status(200).json({ message: "Producto eliminado exitosamente" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

  