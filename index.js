
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import  { RouterUsuer } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";
import  personrouter  from './router/PersonRouter.js';
import productrouter from './router/ProductRouter.js';
import cartrouter from './router/cartRoutes.js'

// imaganes
import path from 'path';
import { fileURLToPath } from 'url';


const _PORT = PORT || 3000;
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// imaganes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', rotuerTypeUsers);
app.use('/api', RouterUsuer);
app.use('/api', personrouter);
app.use('/api', productrouter);
// Rutas del carrito
app.use("/api/cart", cartrouter);


const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false      })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

