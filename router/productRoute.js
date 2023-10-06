// const express = require('express');
// const router = express.Router()
// const Product = require("../models/product")


// router.get(`/`, async(req, res) => { 
//     const productList = await Product.find();

//     if(!productList){
//         res.status(500).json({success:false})
//     }
//     res.send(productList);
// });

// router.post(`/`, (req, res) => { 
//     const product = new Product({
//         name: req.body.name,
//         image: req.body.image,
//         countInStock: req.body.countInStock
//     })

//     product.save().then((createdProd => {
//         res.status(201).json(createdProd)

//     })).catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
//     // res.send(newpProd);
// });



// module.exports = router


const express = require("express");
const { getProduct, postProduct, getSingProduct } = require("../controllers/productController")
// const { protect } = require("../middleware/authMiddleware");
const productRouter = express.Router()


productRouter.get("/getPro", getProduct);
productRouter.get("/:id", getSingProduct);

productRouter.post("/postPro", postProduct);



module.exports = productRouter
