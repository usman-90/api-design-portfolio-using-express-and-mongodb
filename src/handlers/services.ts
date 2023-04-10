import { user_collection } from "../db";
import {ObjectId} from 'mongodb';

export const postServices =async ( req, res) => {

    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.updateOne({_id:id},{$push : {
                                                services: {
                                                    serviceId : ((Math.round(Math.random()*8e9)).toString()),
                                                    serviceTitle : req.body.serviceTitle,
                                                    serviceDescription: req.body.serviceDescription,
                                                    serviceImageSrc:req.body.serviceImageSrc
                                                    
                                                }
                                                }
    })
    res.json({message:"services pushed",result,})
    res.status(200)
    res.end()
}

export const updateServices = async( req, res) => {
    try {
        const col =await user_collection()
        const id = new ObjectId(`${req.user.id}`)
    
        const oldServices = await col.findOne(
            { "services.serviceId": { $eq: req.params.id } },
            {projection:
                { "services.$": 1 ,_id:0}
            }
         )
         
        
        const result = await col.updateOne({_id : id , "services.serviceId" : req.params.id},
            { $set :
                {
                    "services.$.serviceTitle" : req.body.serviceTitle ?? oldServices.services[0].serviceTitle,
                    "services.$.serviceDescription" : req.body.serviceDescription ?? oldServices.services[0].serviceDescription,
                    "services.$.serviceImageSrc" : req.body.serviceImageSrc ?? oldServices.services[0].serviceImageSrc
            }
        })
    
    
        res.json({message: "Updated Certificate" , result,})
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


export const getAllServices = async (req , res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)

    const services = await col.findOne({
        _id:id
    },{
        projection:{
            services :1 , _id:0
        }
    })

    res.json({message:"All certificates fetched ",services})
    res.status(200)
    res.end()

}


export const deleteService = async (req, res) => {
    try {
        const col = await user_collection() 
        const id = new ObjectId(`${req.user.id}`)
    
        const result = await col.updateOne(
            {
                _id:id
            },
            {
                $pull:{
                    services : {
                        serviceId : req.params.id
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
        res.json({message:"Service Deleted", result})
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