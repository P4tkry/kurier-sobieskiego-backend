import express, {Request, Response} from "express";
import accessGuard from "../accessGuard";
import {getArticleById, getArticlesSchema, patchArticleById, postArticlesSchema} from "./schema";
import {validate} from "express-validation";
import {Articles} from "../mongose.schema";
import path from "path";


const router = express.Router();

router.get('/', validate(getArticlesSchema), async(req, res)=>{
    let query={};
    if(req.query.hasTag){
        query={tags: req.query.hasTag}
    }
    const articles = await Articles.find(query).sort({_id: Number(req.query.sortByDate) as 1 |-1}).skip((Number(req.query.page)-1)*Number(req.query.count)).limit(Number(req.query.count));
    const count = Math.ceil(await Articles.find(query).count()/Number(req.query.count))
    return res.json({content: articles, numberOfPages: count});
})

router.post('/', accessGuard, validate(postArticlesSchema), async (req, res)=>{
    const article = new Articles(req.body);
    await article.save();
    return res.json({message: 'Article created successfully'});

})

router.get('/:id', validate(getArticleById), async (req, res)=>{
    const article = await Articles.findById(req.params.id).exec();
    if(!article)
        return res.status(404).send({ message: 'Article not found'});
    return res.json(article);

})

router.delete('/:id', validate(getArticleById), async (req, res)=>{
    const article = await Articles.findByIdAndRemove(req.params.id).exec();
    if(!article)
        return res.status(404).send({ message: 'Article not found'});
    return res.json({message: 'Article removed successfully'});
})

router.patch('/:id', validate(patchArticleById), async (req, res)=>{
    const article = await Articles.findByIdAndUpdate(req.params.id, req.body).exec();
    if(!article)
        return res.status(404).send({ message: 'Article not found'});
    return res.json({message: 'Article removed successfully'});

})

export default router;