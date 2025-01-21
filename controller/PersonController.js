
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
import { PersonModel } from "../models/PersonModel.js";
import { upload } from "../config/upload.js";


export const updatePerson = async (req, res) => {
    const { name, lastname, ci, address, phone } = req.body;
    if (!(name ||lastname || ci || address || phone)) {
      res.status(400).json({ message: "user is required" });
    }
    const person = await PersonModel.findOne({where:{id:req.params.id}});

    if(person){
      person.set({
        ...person,
          name:name, 
          lastname:lastname, 
          ci:ci,
           address:address, 
           phone:phone});
        await person.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
  };

  export const ChangeImage = async (req, res) => {  
    const { id } = req.params;
    const { image } = req.body;
    if(!image){
      res.status(200).json({ message: "La imagen es requerida" });
    }
    const person = await PersonModel.findOne({where:{id}});
    if(person){
      upload();
      person.set({
        ...person,
        image:image, 
      })
      await person.save();
      res.status(200).json({ message: "Imagen actualizada" });

    }else{
      res.status(404).json({message: "user not found"});
    }
  }