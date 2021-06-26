import { Router } from "express";
import { UsuariosController } from "../controller/UsuariosController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const routes= Router();

//apuntar a la accion del controlador

routes.get('/',[checkJwt, checkRole(['admin','user'])], UsuariosController.obtenerTodos);
routes.get('/:id', UsuariosController.obtenerPorId);
routes.post('/', UsuariosController.guardar);
routes.patch('/:id', UsuariosController.modificar);
routes.delete('/:id',UsuariosController.eliminar);

export default routes;

