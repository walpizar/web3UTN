import { Router } from "express";
import auth from "./auth";
import usuarios from "./usuarios";


const routes= Router();

routes.use("/usuario",usuarios);
routes.use("/auth",auth);

export default routes;


