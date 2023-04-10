import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { body } from 'express-validator/src/middlewares/validation-chain-builders';
import router from './routes';
import { signup,signin } from './user';
import { checkUsernamaAvailability } from './middlewares/accChk';
import { protect } from './modules/auth';
import { handleInputErrors } from './middlewares/handleInpErr';

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/',async (req,res) =>{
    res.status(200)
    res.json({
        message: "ok"
    })
    console.log("Yes req has recieved")
    res.end()

})


app.use('/api' , protect , router)

app.post('/signup',
                body('username').isString().exists().notEmpty(),
                body('password').isString().exists().notEmpty(),
                handleInputErrors,
                checkUsernamaAvailability, 
                signup )

app.post('/signin',
                body('username').isString().exists().notEmpty(),
                body('password').isString().exists().notEmpty(),
                handleInputErrors, 
                signin )

export default app; 