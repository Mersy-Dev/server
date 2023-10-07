const productModel = require("../models/product");
const categoryModel = require("../models/category");
const asyncHandler = require('express-async-handler');




const getProduct = asyncHandler(async(req, res) => { 
    const productList = await productModel.find().select('name image price');

    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
});


const getSingProduct = asyncHandler(async(req, res) => { 
    const sinGleProduct = await productModel.findById(req.params.id);

    if(!sinGleProduct){
        res.status(500).json({success:false})
    }
    res.send(sinGleProduct);
});

const postProduct = async (req, res) => { 
    const category = await categoryModel.findById(req.body.category);
    if(!category) return res.status(400).send('invalid Category')

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,


    })

    products = await product.save();

    if(!products)
    return res.status(500).send('The product cannot be created')
    
    res.send(products)
    
    // res.send(newpProd);
}

module.exports = {getProduct, postProduct, getSingProduct }


