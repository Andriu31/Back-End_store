import express from 'express';
import  {verifyToken}  from '../middleware/auth.js';
import {createProduct} from '../controller/ProductController.js';
import { getProducts } from '../controller/ProductController.js';

const rotuer= express.Router();

rotuer.post('/crearproduct', createProduct);
rotuer.get('/verproduct', getProducts);


export default rotuer;