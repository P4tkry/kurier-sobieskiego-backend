import express from "express";
import accessGuard from "../accessGuard";
import {getArticlesSchema, postArticlesSchema} from "./schema";
import {validate} from "express-validation";
import {Articles} from "../mongose.schema";
const router = express.Router();

router.get('/', validate(getArticlesSchema), async(req, res)=>{
    const articles = await Articles.find().skip((Number(req.query.page)-1)*Number(req.query.count)).limit(Number(req.query.count));
    const count = Math.ceil(await Articles.count()/Number(req.query.count))
    return res.json({content: articles, numberOfPages: count});
})

router.post('/', accessGuard, validate(postArticlesSchema), async (req, res)=>{
    const article = new Articles({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        author: req.body.author,
        thumbnail: req.body.thumbnail
    });
    await article.save();
    return res.json({message: 'Article created successfully'});

})


export default router;