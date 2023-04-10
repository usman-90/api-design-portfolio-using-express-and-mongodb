import * as dotenv from 'dotenv';
import app from "./server";
dotenv.config();
import config from './config';


app.listen(config.port,()=>{
    console.log(`listening on http://localhost:${config.port}`)
})