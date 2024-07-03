import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalle.routes.js'
import openRoutes from './routes/openjourney.routes.js'

dotenv.config();  // dotenv package is used for environmental variables

const app = express();   // created an express app

app.use(cors());  // cors is a middleware for Cross-Origin Resource Sharing

app.use(express.json({limit: "50mb"}));  // sets the limit of the payload

// app.use('/api/v1/dalle', dalleRoutes);  // here we use dalleRoutes as a middleWare
app.use('/api/v1/openjourney', openRoutes); // here we use openRoutes as a middleWare
app.get('/', (req, res)=>{              
    res.status(200).json({message: "Hello from DALL.E"})
})

app.listen(8080, ()=>{
    console.log('Server has started on port 8080');
})


