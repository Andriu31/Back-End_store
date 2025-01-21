import express from 'express';
import { updatePerson, ChangeImage} from '../controller/PersonController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.put('/person/:id', verifyToken, updatePerson);
rotuer.put('/update/imagen/:id', verifyToken, ChangeImage);

export default rotuer;