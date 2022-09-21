import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function accessGuard(req: Request, res: Response, next: NextFunction){
    const auth = req.header('Authorization');
    if(!auth)
        return res.status(401).send({ message: 'Unauthorized'});
    if(!jwt.verify(auth, process.env.JWTSECRET))
        return res.status(401).send({ message: 'Unauthorized'});
    return next();
}