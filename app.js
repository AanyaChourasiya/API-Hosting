require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes/route')
const connectDB = require('./db/connect')

// middleware or to set routers
// url mein localhost:5000 k baad kya path caahiye
app.use("/api/products",router)

const start = async () =>{
    try{
        await connectDB(process.env.MONGODB_URL)
        app.listen(port,()=>{
            console.log(`connected to port no. ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()