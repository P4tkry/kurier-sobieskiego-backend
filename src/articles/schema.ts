import { Joi } from 'express-validation';
const ObjectJoi = require('joi-objectid')(Joi);

const JoiExt = {...Joi, objectId: ObjectJoi}

export const getArticlesSchema={
    query: Joi.object({
        page: Joi.number().positive().required(),
        count: Joi.number().positive().required(),
        sortByDate: Joi.number().allow(-1,1).required(),
        hasTag: Joi.string().optional()
    })
}

export const postArticlesSchema={
    body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        description: Joi.string().optional().allow(''),
        author: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        thumbnail: Joi.string().uri().required(),
    })
}

export const getArticleById={
    params: Joi.object({
        id: JoiExt.objectId().required(),
    })
}

export const patchArticleById={
    params: Joi.object({
        id: JoiExt.objectId().required(),
    }),
    body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        description: Joi.string().optional().allow(''),
        author: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        thumbnail: Joi.string().uri().required(),
    })
}

