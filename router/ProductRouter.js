import express from 'express';
import  {verifyToken}  from '../middleware/auth.js';
import { getProducts,addProductImage, createProduct, searchProducto,updateProduct, deleteProduct,getProduct } from '../controller/ProductController.js';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imagenes/productos')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null,  uniqueSuffix +"-"+file.originalname );
    }
  });
  var upload = multer({ storage: storage });


const rotuer= express.Router();

rotuer.post('/crearproduct', createProduct);
rotuer.get('/verproduct', getProducts);
rotuer.post('/products/:id/image', upload.single('file'), addProductImage);
rotuer.post('/producto/nombre', searchProducto);

rotuer.put('/products/:id', upload.single('file'), updateProduct);
rotuer.delete('/products/:id', deleteProduct);
rotuer.get('/unProduct/:id', getProduct)

export default rotuer;