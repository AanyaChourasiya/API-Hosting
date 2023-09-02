//routes mtlb humee kis kis routes mein jaana h

const express = require('express')
const router = new express.Router()

const {getAllProducts,getAllProductsTesting} = require("../controllers/products")

router.route("").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting)

module.exports = router