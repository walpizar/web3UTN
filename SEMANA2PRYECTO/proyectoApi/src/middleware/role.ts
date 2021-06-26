import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";

export const checkRole = (roles:Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const {userId} = res.locals.jwtPayload;
        const userRepo = getRepository(Usuarios);
        let usuario: Usuarios;

        try {
            usuario = await userRepo.findOneOrFail({where:{id:userId}});
            
        } catch (error) {
            return res.status(401).json({mensaje:'No autorizado'});
        }

        if(roles.includes(usuario.role)){
            next();
        }else{
            res.status(401).json({mensaje:'No autorizado'});
        }
    }
}