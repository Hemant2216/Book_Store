import express from "express"; //importing express
import {PORT,mongoDBURL} from "./config.js"; //importing PORT
import mongoose from "mongoose";
import {Book} from './models/bookModels.js';
import booksRoute from './routes/booksroute.js';
import cors from 'cors';


const app=express(); //storing it so that we can use
app.use(express.json());//middleware for parsing json body postman 

app.get('/',(req,res)=>{
    
    console.log(req);
    return res.status(234).send('welcome');
});



//middleware for handling CORS policy
// app.use(
//     cors({
//         origin:'https://book-store-frontend-inky.vercel.app',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Access-Control-Allow-Origin'],
//     })
// )
app.use(cors());
// app.use(cors({
//   origin: 'https://book-store-frontend-inky.vercel.app'  // Or use '*' to allow any origin
// }));

//midleware for crud using express
app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        // function listen to port and ensure server is running
        app.listen(PORT,()=>{
            console.log(`App is listening at: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });

