import { Router } from "express";
import { UsuariosController } from "../controller/UsuariosController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const routes= Router();

//apuntar a la accion del controlador

routes.get('/',[checkJwt, checkRole(['admin','user'])], UsuariosController.obtenerTodos);
routes.get('/:id',[checkJwt, checkRole(['admin','user'])], UsuariosController.obtenerPorId);
routes.post('/',[checkJwt, checkRole(['admin','user'])], UsuariosController.guardar);
routes.patch('/:id',[checkJwt, checkRole(['admin','user'])], UsuariosController.modificar);
routes.delete('/:id', UsuariosController.eliminar);

export default routes;

