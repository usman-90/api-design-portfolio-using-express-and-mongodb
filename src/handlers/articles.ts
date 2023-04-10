import { user_collection } from "../db";
import {ObjectId} from 'mongodb';

export const postArticles =async ( req, res) => {

    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.updateOne({_id:id},{$push : {
                                                articles: {
                                                    articleId : ((Math.round(Math.random()*8e9)).toString()),
                                                    articleTitle : req.body.articleTitle,
                                                    articleDate : req.body.articleDate,
                                                    articleDescription: req.body.articleDescription,
                                                    articleBody:req.body.articleOrganization,
                                                    articleImageSrc:req.body.articleImageSrc,
                                                    articleCoverImgSrc:req.body.articleCoverImgSrc,
                                                    articleAuthor:req.body.articleAuthor
                                                }
                                                }
    })
    res.json({message:"Articles pushed",result,})
    res.status(200)
    res.end()
}

export const updateArticles = async( req, res) => {
    try {
        const col =await user_collection()
        const id = new ObjectId(`${req.user.id}`)
    
        const oldArticles = await col.findOne(
            { "articles.articleId": { $eq: req.params.id } },
            {projection:
                { "articles.$": 1 ,_id:0}
            }
         )
         console.log(oldArticles)
        
        const result = await col.updateOne({_id : id , "articles.articleId" : req.params.id},
            { $set :
                {
                    "articles.$.articleTitle" : req.body.articleTitle ?? oldArticles.articles[0].articleTitle,
                    "articles.$.articleDate" : req.body.articleDate ?? oldArticles.articles[0].articleDate,
                    "articles.$.articleDescription" : req.body.articleDescription ?? oldArticles.articles[0].articleDescription,
                    "articles.$.articleBody" : req.body.articleBody ?? oldArticles.articles[0].articleBody ,
                    "articles.$.articleImageSrc" : req.body.articleImageSrc ?? oldArticles.articles[0].articleImageSrc,
                    "articles.$.articleAuthor" : req.body.articleAuthor ?? oldArticles.articles[0].articleAuthor,
                    "articles.$.articleCoverImgSrc" : req.body.articleCoverImgSrc ?? oldArticles.articles[0].articleCoverImgSrc,
                    
            }
        })
    
    
        res.json({message: "Updated Article" , result,})
        res.status(200)
        res.end()
        
    } catch (error) {
        res.status(500)
        res.json({
            message:"Error found, Maybe input is not valid",
            error,
        })
        res.end()        
    }

}


export const getAllArticles = async (req , res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)

    const articles = await col.findOne({
        _id:id
    },{
        projection:{
            articles :1 , _id:0
        }
    })

    res.json({message:"All articles fetched ",articles})
    res.status(200)
    res.end()

}

export const getOneArticle = async (req , res) => {
    try {
        const col = await user_collection()
        const id = new ObjectId(`${req.user.id}`)
    
        const article = await col.findOne({_id:id , "articles.articleId" : req.params.id},
        {
            projection:{
                "articles.$": 1
            }
        }
        )
    
        res.json({message:"Article fethced",article:article.articles[0]})
        res.status(200)
        res.end()
        
    } catch (error) {
        res.status(500)
        res.json({
            message:"Error found, Maybe input is not valid",
            error,
        })
        res.end()
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const col = await user_collection() 
        const id = new ObjectId(`${req.user.id}`)
    
        const result = await col.updateOne(
            {
                _id:id
            },
            {
                $pull:{
                    articles : {
                        articleId : req.params.id
                    }
                }
            }        
        )
        if (result.modifiedCount === 0){
            res.status(500)
            res.json({
            message:"Error found, Maybe input is not valid",
        })
        res.end()
        return
        }
        res.json({message:"Article Deleted", result})
        res.status(200)
        res.end()
        
    } catch (error) {
        res.status(500)
        res.json({
            message:"Error found, Maybe input is not valid",
            error,
        })
        res.end()
    }

}