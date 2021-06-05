import { Request, Response } from "express";
import { appendFile } from "fs";
import { getRepository, SimpleConsoleLogger } from "typeorm";
import { Usuarios } from "../entity/usuarios";

export class UsuariosController{

    static obtenerTodos = async(req:Request, res:Response)=>{
        
        const usuarioRepo = getRepository(Usuarios);

        let usuarios;

      try {

        usuarios = await  usuarioRepo.find({select:['id','username',
            'nombre','apellido1','apellido2','genero','role'], where:{estado:1}});


        return res.send(usuarios);
          
      } catch (error) {
         return res.status(404).json({mensaje:'Error al cargar la lista de usuarios'}); 
      }

    }

    static obtenerPorId = async(req:Request, res:Response)=>{

    }

    static guardar = async(req:Request, res:Response)=>{ 
        const usuarioRepo = getRepository(Usuarios);

        const { username, password, nombre, apellido1, apellido2, genero, role} = req.body;

      
        if(!username){
            return res.status(400).json({mensaje:'Falta el username'});
        }
        if(!password){
            return res.status(400).json({mensaje:'Falta el Password'});
        }
        if(!nombre){
            return res.status(400).json({mensaje:'Falta el nombre'});
        }
        if(!apellido1){
            return res.status(400).json({mensaje:'Falta el segundo apellido'});
        }
        if(!apellido2){
            return res.status(400).json({mensaje:'Falta el primer apellido'});
        }
        if(!genero){
            return res.status(400).json({mensaje:'Falta el genero'});
        }
        if(!role){
            return res.status(400).json({mensaje:'Falta el role'});
        }

        const usuario = new Usuarios();
        
        usuario.nombre = nombre;
        usuario.username= username;
        usuario.apellido1= apellido1;
        usuario.apellido2= apellido2;
        usuario.genero= genero;
        usuario.password= password;
        usuario.role= role;
        usuario.estado= true;


        try {

            await usuarioRepo.save(usuario);


        } catch (error) {
            return res.status(404).json({mensaje:'Error al guardar'}); 
  
        }

        res.status(200).json("ok");
    }

    static modificar = async(req:Request, res:Response)=>{        

    }

    static eliminar = async(req:Request, res:Response)=>{        

    }



}