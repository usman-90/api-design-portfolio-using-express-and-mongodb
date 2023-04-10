import { user_collection } from "../db";
import {ObjectId} from 'mongodb';

export const postCertificates =async ( req, res) => {

    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.updateOne({_id:id},{$push : {
                                                certificates: {
                                                    certificateId : ((Math.round(Math.random()*8e9)).toString()),
                                                    certificateTitle : req.body.certificateTitle,
                                                    certificateDate : req.body.certificateDate,
                                                    certificateDescription: req.body.certificateDescription,
                                                    certificateOrganization:req.body.certificateOrganization,
                                                    certificateImageSrc:req.body.certificateImageSrc

                                                }
                                                }
    })
    res.json({message:"certificates pushed",result,})
    res.status(200)
    res.end()
}

export const updateCertificates = async( req, res) => {
    try {
        const col =await user_collection()
        const id = new ObjectId(`${req.user.id}`)
    
        const oldCertificates = await col.findOne(
            { "certificates.certificateId": { $eq: req.params.id } },
            {projection:
                { "certificates.$": 1 ,_id:0}
            }
         )
         
        
        const result = await col.updateOne({_id : id , "certificates.certificateId" : req.params.id},
            { $set :
                {
                    "certificates.$.certificateTitle" : req.body.certificateTitle ?? oldCertificates.certificates[0].certificateTitle,
                    "certificates.$.certificateDate" : req.body.certificateDate ?? oldCertificates.certificates[0].certificateDate,
                    "certificates.$.certificateDescription" : req.body.certificateDescription ?? oldCertificates.certificates[0].certificateDescription,
                    "certificates.$.certificateOrganization" : req.body.certificateOrganization ?? oldCertificates.certificates[0].certificateOrganization,
                    "certificates.$.certificateImageSrc" : req.body.certificateImageSrc ?? oldCertificates.certificates[0].certificateImageSrc
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


export const getAllCertificates = async (req , res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)

    const certificates = await col.findOne({
        _id:id
    },{
        projection:{
            certificates :1 , _id:0
        }
    })

    res.json({message:"All certificates fetched ",certificates})
    res.status(200)
    res.end()

}

export const getOneCertificate = async (req , res) => {
    try {
        const col = await user_collection()
        const id = new ObjectId(`${req.user.id}`)
    
        const certificate = await col.findOne({_id:id , "certificates.certificateId" : req.params.id},
        {
            projection:{
                "certificates.$": 1
            }
        }
        )
    
        res.json({message:"Certificate fethced",certificate:certificate.certificates[0]})
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

export const deleteCertificate = async (req, res) => {
    try {
        const col = await user_collection() 
        const id = new ObjectId(`${req.user.id}`)
    
        const result = await col.updateOne(
            {
                _id:id
            },
            {
                $pull:{
                    certificates : {
                        certificateId : req.params.id
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
        res.json({message:"Certificate Deleted", result})
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