import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
mongoose.connect(`mongodb+srv://dbUser:<password>@cluster0.flcfke6.mongodb.net/?retryWrites=true&w=majority`);
app.use(bodyParser.json());

