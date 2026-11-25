import dotenv from 'dotenv'

import mongoose from 'mongoose'
import connectDB from './db/index.js'
import express from 'express'



dotenv.config({
    path: './env'
})

const app = express();

connectDB()
.then(()=>{

    app.on("Error", (error) =>{
        console.log("Error", error);
        throw error;
    })

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running!!`);   
    })
})
.catch((error) =>{
    console.log("Error: ", error);
    
})

















// *************** Coonecting DB in index.js *******************************

// import mongoose from 'mongoose';
// import express from 'express';
// import { DB_NAME } from './constants';

// const app = express();


// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error", (error) => {
//             console.log("Error", error);
//             throw error;
            
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App listening on port: ${process.env.PORT}`);
            
//         })
        
//     } catch (error) {
//         console.error("Error: ", error);
        
//     }
// })()