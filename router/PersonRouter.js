import express from 'express';
import { updatePerson, changeImage} from '../controller/PersonController.js';
import  {verifyToken}  from '../middleware/auth.js';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imagenes/personas')
    },
    filename: function (req, file, cb) {
       const { id } = req.params;
        cb(null,  id +"-"+file.originalname );
    }
  });
  var upload = multer({ storage: storage });

const rotuer = express.Router();

rotuer.put('/person/:id', verifyToken, updatePerson);
rotuer.put('/update/image/:id', upload.single("file"), changeImage);

export default rotuer;