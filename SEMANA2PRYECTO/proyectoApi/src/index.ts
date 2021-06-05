import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import cors = require("cors");
import helmet = require("helmet");
import routes from "./routes";


const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {

    // create express app
    const app = express();
  
    //MIDDLEWWARE
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //RUTAS

    app.use('/', routes);
    app.use("*",(req,res)=>{

        res.send("<h1>ESTOY EN EL SERVIDOR</h1>");
    } );

    // start express server
    app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`) );

}).catch(error => console.log(error));
