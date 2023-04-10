import {user_collection} from "../db"

export const checkUsernamaAvailability  =async (req, res, next) => {
    const col = await user_collection();
    const result = await col.findOne({username:req.body.username})
    if (result){
        res.json({message:"Username Already in use."})
        res.status(500)
        return
    }
    next();
}