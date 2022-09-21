import { Joi } from 'express-validation';

export const getArticlesSchema={
    query: Joi.object({
        page: Joi.number().positive().required(),
        count: Joi.number().positive().required()
    })
}

export const postArticlesSchema={
    body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        author: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        thumbnail: Joi.string().uri().required(),
    })
}
