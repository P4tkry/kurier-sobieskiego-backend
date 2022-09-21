import { Joi } from 'express-validation';

export const postLogin ={
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
}
