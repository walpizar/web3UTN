import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

export class AuthController{

    static login = async(req:Request, res:Response)=>{

        const {username, password} = req.body;

        if(!(username && password)){

            return res.status(400).
            json({mensaje:' Nombre de usuario o contraseña incorrecto'});
        } 
        
        const userRepository= getRepository(Usuarios);
        let user : Usuarios;

        try {
            user = await userRepository.findOneOrFail({where:{username}});
            
        } catch (e) {
            return res.status(400).
            json({mensaje:' Nombre de usuario o contraseña incorrecto'});
        }

        if(!user.checkPassword(password)){

            return res.status(400).
            json({mensaje:' Nombre de usuario o contraseña incorrecto'});
        }


        const token= jwt.sign({username:user.username,userId:user.id}, config.jwtSecret, {expiresIn:'5m'} );

        return res.json({mensaje:'ok', token, role: user.role});
               
    }
}