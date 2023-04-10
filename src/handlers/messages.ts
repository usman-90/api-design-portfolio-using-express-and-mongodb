import { user_collection } from "../db";
import {ObjectId} from 'mongodb';

export const postMessages =async ( req, res) => {

    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.updateOne({_id:id},{$push : {
                                                messages: {
                                                    messageId : ((Math.round(Math.random()*8e9)).toString()),
                                                    messageBody : req.body.messageBody,
                                                    messageDate : new Date(),
                                                    messageSender: req.body.messageSender,
                                                   
                                                }
                                                }
    })
    res.json({message:"messages pushed",result,})
    res.status(200)
    res.end()
}


export const getAllMessages = async (req , res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)

    const messages = await col.findOne({
        _id:id
    },{
        projection:{
            messages :1 , _id:0
        }
    })

    res.json({message:"All messages fetched ",messages})
    res.status(200)
    res.end()

}



export const deleteMessage = async (req, res) => {
    try {
        const col = await user_collection() 
        const id = new ObjectId(`${req.user.id}`)
    
        const result = await col.updateOne(
            {
                _id:id
            },
            {
                $pull:{
                    messages : {
                        messageId : req.params.id
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
        res.json({message:"message Deleted", result})
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