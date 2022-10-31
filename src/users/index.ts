import express from "express";
import {validate} from "express-validation";
import {postLogin} from "./schema";
import {Users} from "../mongose.schema";
import * as objectHash from "object-hash";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

require('dotenv').config();

const router = express.Router();

router.post('/login', validate(postLogin), async (req, res) => {
    const user = await Users.findOne({username: req.body.username});
    console.log(user);
    if(!user)
        return res.status(401).json({message: "Unauthorized"});

    if(!user?.password) {
        await user.updateOne({password: await bcrypt.hash(req.body.password, 15)});
        return res.send({auth: jwt.sign({id: user._id}, process.env.JWTSECRET as string)});
    }

    if(!await bcrypt.compare(req.body.password, user.password))
        return res.status(401).json({message: "Unauthorized"});

    return res.json({auth: jwt.sign({id: user._id}, process.env.JWTSECRET as string)});
});

export default router;