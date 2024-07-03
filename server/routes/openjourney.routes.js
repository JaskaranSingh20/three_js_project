import express from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';


dotenv.config(); // to use environmental variables from .env file using process.env

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basePath =  __dirname.split( '\\' ).slice( 0, -1 ).join( '\\' )


const router = express.Router();

router.route('/').get((req, res)=>{
    res.status(200).json({message: "Hello from open journey Routes"});
})

router.route('/').post(async(req, res)=>{
    try{
        const {prompt} = req.body;   

        console.log("prompt "+ prompt);
        
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                            "Content-Type": "application/json", },
                method: "POST",
                body: JSON.stringify({"inputs": prompt}),
            }
        );  // returning jpeg binary

       
        const arrayBuffer = await response.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        const randomName = Math.random() * (100000 - 1) + 1;
        
        const filePath = `${basePath}\\uploads\\img${randomName}.jpeg`;
        
        console.log("path " + filePath)

        fs.writeFileSync(filePath, buffer);

        res.status(200).sendFile(filePath);
        

    }catch(error){
        console.error(error);
    }
})

export default router;