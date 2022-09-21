require('express-async-errors');
import express, {NextFunction, Response, Request} from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import articles from "./articles";
import users from "./users";


require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://dbUser:${process.env.DBPASSWORD}@cluster0.flcfke6.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log('mongodb initialized successfully');
});

app.use(bodyParser.json());

app.use('/articles', articles);

app.use('/users', users);

app.use((err: any, req: Request, res: Response, next: NextFunction)=> {
    try{
        return res.status(err.statusCode).json(err);
    }catch{
        return res.status(500).json(err);
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`app started successfully on port ${process.env.PORT}`);
});



