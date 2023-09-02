require("dotenv").config()
const connectDB = require("./db/connect") 
const Product = require("./models/product")

// json file ko export krne ki jarurat nhi h it will automatically recognize it
const ProductJson = require("./products.json")

const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL)
        await Product.create(ProductJson)
        console.log("success")
    }
    catch(e){
        console.log(e);
    }
}

start()