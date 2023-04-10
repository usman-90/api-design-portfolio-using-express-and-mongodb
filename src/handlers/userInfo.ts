import { ObjectId } from "mongodb"
import {user_collection} from "../db"

export const postOrUpdateUserInfo = async (req, res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id }`)
    
    const info = await col.findOne({_id:id},{projection:{name:1,profession:1,age:1,contactNum:1,country:1,city:1,socialAccs:1}})
    console.log(info)
    const result = await col.updateOne({_id:id},

                                            {$set: {name : req.body.name ?? info.name ,
                                                profession: req.body.profession ?? info.profession,
                                                age:req.body.age?? info.age,
                                                contactNum:req.body.contactNum?? info.contactNum,
                                                country:req.body.country?? info.country,
                                                city:req.body.city?? info.city,
                                                },
                                            $addToSet :{
                                                socialAccs:req.body.socialAccs ?? info.socialAccs
                                            }})
    res.json({
                message:"info successfuly uploaded",
                result,
            })
    res.status(200)
    res.end()
}

export const getUserInfo = async (req,res) => {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.findOne({_id: id},{projection:{ name: 1, age: 1, contactNum: 1, country: 1, city: 1, socialAccs: 1, profession: 1,_id:0 }})
    console.log(result)
    res.json({message:"Data Recieved",
                result,})
    res.status(200)
    res.end()
}

export const deleteUser = async(req,res )=> {
try {
    const col = await user_collection()
    const id = new ObjectId(`${req.user.id}`)
    const result = await col.deleteOne({_id:id})
    console.log(result)
    res.json({message:"Account Successfully Deleted!",result,})
    res.status(200)
    res.end()
    
} catch (error) {
    res.json({message:"Error occured, couldnt delete user."})
}
}