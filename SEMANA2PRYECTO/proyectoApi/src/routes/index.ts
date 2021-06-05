import { Router } from "express";
import usuarios from "./usuarios";


const routes= Router();

routes.use("/usuario",usuarios);

//routes.use("/productos",productos);

export default routes;


