import express from "express";
import {validate} from "express-validation";
import {postLogin} from "./schema";
import {Users} from "../mongose.schema";
import * as objectHash from "object-hash";
import * as jwt from "jsonwebtoken";
require('dotenv').config();

const router = express.Router();

router.post('/login', validate(postLogin), async (req, res) => {
    const user = await Users.findOne({username: req.body.username, password: objectHash.MD5(req.body.password)});
    if(!user)
        return res.status(401).json({message: "Unauthorized"});
    return res.json({auth: jwt.sign({id: user._id}, process.env.JWTSECRET as string)});
});

export default router;