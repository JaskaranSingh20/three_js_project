import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config(); // to use environmental variables from .env file using process.env

const router = express.Router();

const config = new Configuration({  // Configuration class of OpenAI 
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config); // initializing the OpenAI API client

router.route('/').get((req, res)=>{
    res.status(200).json({message: "Hello from DALLE Routes"});
})

router.route('/').post(async(req, res)=>{
    try{
        const {prompt} = req.body;   // message 

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: "b64_json"
        })

        const image = response.data.data[0].b64_json;

        res.status(200).json({photo: image});
        

    }catch(error){
        console.error(error);
    }
})

export default router;