import { validationResult } from "express-validator"

export const handleInputErrors = async (req , res ,next ) => { 
        const errors =  await validationResult(req)
        if (!errors.isEmpty){
            res.status(400)
            res.json({
                message:"Input not valid",
                errors:errors.array()
            })
        }
        next()
}