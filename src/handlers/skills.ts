import { user_collection } from "../db";
import {ObjectId} from 'mongodb';

export const postskills =async ( req, res) => {

    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.updateOne({_id:id},{$push : {
                                                skills: {
                                                    skillId : ((Math.round(Math.random()*8e9)).toString()),
                                                    skillTitle : req.body.skillTitle,
                                                    skillDescription: req.body.skillDescription,
                                                    skillExperience: req.body.skillExperience
                                                }
                                                }
    })
    res.json({message:"Skills pushed",result,})
    res.status(200)
    res.end()
}

export const updateSkills = async( req, res) => {

    const col =await user_collection()
    const id = new ObjectId(`${req.user.id}`)
try {
    const oldSkills = await col.findOne(
        { "skills.skillId": { $eq: req.params.id } },
        {projection:
            { "skills.$": 1 ,_id:0}
        }
     )
     console.log(oldSkills)
    
    const result = await col.updateOne({_id : id , "skills.skillId" : req.params.id},
        { $set :
            {
                "skills.$.skillTitle" : req.body.skillTitle ?? oldSkills.skills[0].skillTitle,
                "skills.$.skillExperience" : req.body.skillExperience ?? oldSkills.skills[0].skillExperience,
                "skills.$.skillDescription" : req.body.skillDescription ?? oldSkills.skills[0].skillDescription,
               
        }
    })


    res.json({message: "Updated Skills" , result,})
    res.status(200)
    res.end()
    
} catch (error) {
    res.json({message:"Error Occured, id not valid",error})
    res.status(500)
    res.end()
}

}


export const getAllskills = async (req , res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)

    const skills = await col.findOne({
        _id:id
    },{
        projection:{
            skills :1 , _id:0
        }
    })

    res.json({message:"All skills fetched ",skills})
    res.status(200)
    res.end()

}


export const deleteSkill = async (req, res) => {
    try {
        const col = await user_collection() 
        const id = new ObjectId(`${req.user.id}`)
    
        const result = await col.updateOne(
            {
                _id:id
            },
            {
                $pull:{
                    skills : {
                        skillId : req.params.id
                    }
                }
            }        
        )
        res.json({message:"Skill Deleted", result})
        res.status(200)
        res.end()
        if (result.modifiedCount === 0){
            res.status(500)
            res.json({
            message:"Error found, Maybe input is not valid",
        })
        res.end()
        return
        }
        
    } catch (error) {
        res.status(500)
        res.json({
            message:"Error found, Maybe input is not valid",
            error,
        })
        res.end()        
    }

}