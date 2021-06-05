import { Router } from "express";
import { UsuariosController } from "../controller/UsuariosController";

const routes= Router();
//apuntar a la accion del controlador
routes.get('/', UsuariosController.obtenerTodos );
routes.get('/:id', UsuariosController.obtenerPorId);
routes.post('/', UsuariosController.guardar);
routes.patch('/:id', UsuariosController.modificar);
routes.delete('/:id',UsuariosController.eliminar)

export default routes;

