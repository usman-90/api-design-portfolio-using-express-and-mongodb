import { create } from "domain";
import {user_collection} from "./db";
import { comparePassword, hashedPasswords } from "./modules/auth";
import { createJwt } from "./modules/auth";

export const signup = async (req, res) => {
    try {
        
        const col = await user_collection()
        const result = await col.insertOne({
            username: req.body.username,
            password: await hashedPasswords(req.body.password),
            createdAt:new Date()
        })

        result.username = req.body.username;
        const token = await createJwt(result)
        res.json({
            message:"Account Created",
            result,
            token,
        })
        res.status(200)
        res.end();

    } catch (error) {
        res.json({
            message:"Error occured"
        })
        res.send(error)
        res.status(400)
        
    }
}

export const signin =async (req,res) => {
    try {
        const col = await user_collection();
        const result = await col.findOne({username:req.body.username},{projection:{username:1,password:1}})
        
        const isValid = await comparePassword(req.body.password,result.password);
     
        if (!isValid){
            res.status(400)
            res.json({message: "Error occured"})
            return
        }
            const token = await createJwt(result);
            res.json({
                message:"Loged in",
                username:result.username,id:result._id,
                token,
            })
            res.status(200)
            res.end()

        
        
    } catch (error) {
        res.status(400)
        res.json({message: "Error occured, account not found. invalid username"})
    }

}