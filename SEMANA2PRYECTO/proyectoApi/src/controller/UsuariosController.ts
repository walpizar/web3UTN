import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository} from "typeorm";
import { Usuarios } from "../entity/Usuarios";

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
        let usuario;    
        const  usuarioRepo = getRepository(Usuarios);       
        const { id } = req.params;
      
       if(!id){
        return res.status(400).json({mensaje:'Falta el id'});
       }

       try {
            usuario = await usuarioRepo.findOneOrFail( {select:['id','username',
            'nombre','apellido1','apellido2','genero','role'], where:{id:id}} ); 

        } catch (error) {
            return res.status(404).json({mensaje:'Usuario no se encontro.'});
        }

        return res.send(usuario);

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
       /* if(!apellido2){
            return res.status(400).json({mensaje:'Falta el primer apellido'});
        }*/
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


        const validateOptions= {validationError:{target:false, value:false}};
        const errores = await validate(usuario, validateOptions );

        if(errores.length > 0){
            return res.status(400).json(errores);
        }

        //encriptar
        usuario.hashPassword();

        try {

            await usuarioRepo.save(usuario);

        } catch (error) {
            return res.status(404).json({mensaje:error}); 
  
        }

        return res.status(200).json({mensaje:'ok'});
    }


    static modificar = async(req:Request, res:Response)=>{
       
        let usuario;
    
        const  usuarioRepo = getRepository(Usuarios);
       
       const { id } = req.params;
       const { username, password, nombre, apellido1, apellido2, genero, role, estado} = req.body;

       if(!id){
        return res.status(400).json({mensaje:'Falta el id'});
       }

       try {
        
            usuario = await usuarioRepo.findOneOrFail(id); 

       } catch (error) {
            return res.status(404).json({mensaje:'Usuario no se encontro.'});
       }

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
        /* if(!apellido2){
            return res.status(400).json({mensaje:'Falta el primer apellido'});
        }*/
        if(!genero){
            return res.status(400).json({mensaje:'Falta el genero'});
        }
        if(!role){
            return res.status(400).json({mensaje:'Falta el role'});
        }
        if(!estado){
            return res.status(400).json({mensaje:'Falta el estado'});
        }

        //validar class validator
        usuario.nombre = nombre;
        //usuario.username= username;
        usuario.apellido1= apellido1;
        usuario.apellido2= apellido2;
        usuario.genero= genero;
        usuario.password= password;
        usuario.role= role;
        usuario.estado= estado;

        const validateOptions= {validationError:{target:false, value:false}};
        const errores = await validate(usuario, validateOptions );

        if(errores.length > 0){
            return res.status(400).json(errores);
        }

        usuario.hashPassword();

        try {

            await usuarioRepo.save(usuario);

        } catch (error) {

            return res.status(400).json({mensaje:error});        
        }

       return res.status(202).json({mensaje:'ok'});
      
    }

    static eliminar = async(req:Request, res:Response)=>{        

        //ELIMINADO LOGICO Y FISICO
        let usuario;    
        const  usuarioRepo = getRepository(Usuarios);       
        const { id } = req.params;
      
       if(!id){
        return res.status(400).json({mensaje:'Falta el id'});
       }

       try {
            usuario = await usuarioRepo.findOneOrFail(id); 

        } catch (error) {
            return res.status(404).json({mensaje:'Usuario no se encontro.'});
        }

        //borrado logico
        usuario.estado = false;    


        try {
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(400).json({mensaje:error}); 
        } 

        return res.status(202).json({mensaje:'ok'});
    }
}