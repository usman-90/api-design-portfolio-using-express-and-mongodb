import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashedPasswords = async (password) => {
    return await bcrypt.hash(password , 5)
}

export const comparePassword = async (password,hash) =>{
    return bcrypt.compare(password,hash)
}

export const createJwt = async (user:any) => {
    const token = await jwt.sign({id:user.insertedId || user._id,
    username: user.username},process.env.JWT_SECRET)
    console.log(token)
    return token;
}


export const protect = (req,res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer){
        res.json({message: "Auth token not found"})
        res.status(400)
        return
    }
    const [,token] = bearer.split(' ')
    if (!token){
        res.json({message: "Auth token not found"})
        res.status(400)
        return
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data;
        next()
        
    } catch (error) {
        res.json({
            message : "Errors occured, jwt token not valid",
            error,
        })
        res.status(400)
        return
    }
}