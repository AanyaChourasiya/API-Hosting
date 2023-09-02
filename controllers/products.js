// jb hum usss route yaa path mein jaaege to kya kya krna hai wo controller btaaega

const Product = require("../models/product")

const getAllProducts = async (req,res) => {
    // res.status(200).json({"msg":"getAllProducts"})

    // const myData = await Product.find({})
    // console.log(req.query)

    // const myData = await Product.find({name:"iphone"})
    // res.send(myData)

    const myData = await Product.find(req.query)
    console.log(req.query);
    res.send(myData)
}

const getAllProductsTesting = async (req,res) =>{
    // res.status(200).send({msg:"getAllProductsTesting"})

    // agr koi ek query shi ho or doosri glt hence we are doing neeche waali process

    //  hamne company or name variable bnae inside curly braces jisse agr req.query mein obj k form mein key company hui to (agar vo variable req.query me present rehte hai to) unhe company or name variable me daal do
    const {company,name,featured,sort,select} = req.query
    console.log(req.query)
    const queryObject = {}
    console.log(queryObject)
    if(company){
        queryObject.company = company
    }

    // #advance search functionality
    // below provides strict searching means if ?name=iphone then only iphone will get searched not iPhone not iphone10 in order to overcome this regex came into existence 
    // if(name){
    //     queryObject.name = name
    // }

    // use of regex :-
    if(name){
        queryObject.name = { $regex: name, $options: "i"}
    }

    if(featured){
        queryObject.featured = featured
    }

    let data = Product.find(queryObject)

    if(sort){
        let fixSort = sort.replace(","," ")
        data = data.sort(fixSort)
    }

    if(select){
        const fixSelect = select.split(",").join(" ")
        data = data.select(fixSelect)
    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 3

    let skip = (page - 1) * limit

    // page = 2 // kis number k page ka data dekhna hai ?
    // limit = 3
    // skip = 1 * 3 = 3 // shuru k doc skip hokeee sequence acc 4th se lekar 6 tk page 2 m doc dikhege

    data = data.skip(skip).limit(limit)

    console.log(queryObject)
    const myData = await data
    res.status(200).json({myData,nbHits:myData.length})  
}

module.exports = {getAllProducts,getAllProductsTesting}