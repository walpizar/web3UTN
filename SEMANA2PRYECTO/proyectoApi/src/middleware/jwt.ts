import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

export const checkJwt= (req:Request, res:Response, next: NextFunction)=>{

    const token = <string>req.headers['auth'];


    let payLoad ;
    
    try {
        payLoad = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload =  payLoad;
    } catch (error) {
        return res.status(401).json({mensaje:'No autorizado.'})
    }

    const {username, userId} = payLoad;

    const newToken= jwt.sign({username, userId}, config.jwtSecret, {expiresIn:'5m'} );

    res.setHeader('token', newToken);

    next();
}