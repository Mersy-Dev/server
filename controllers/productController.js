const productModel = require("../models/product");
const categoryModel = require("../models/category");
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');




const getProduct = asyncHandler(async (req, res) => {
    //const productList = await productModel.find().select('name image price -_id ');
    //const productList = await productModel.find().populate('category');

    const productList = await productModel.find().populate('category');

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});


const getSingProduct = asyncHandler(async (req, res) => {
    const sinGleProduct = await productModel.findById(req.params.id).populate('category');

    if (!sinGleProduct) {
        res.status(500).json({ success: false })
    }
    res.send(sinGleProduct);
});




const postProduct = async (req, res) => {
    const category = await categoryModel.findById(req.body.category);
    if (!category) return res.status(400).send('invalid Category')

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

    if (!products)
        return res.status(500).send('The product cannot be created')

    res.send(products)

    // res.send(newpProd);
}


const putPro = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('invalid product id')
    }
    const category = await categoryModel.findById(req.body.category);
    if (!category) return res.status(400).send('invalid Category')

    const prod = await categoryModel.findByIdAndUpdate(req.params.id,
        {
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
        },
        {
            new: true
        }
    )
    if (!prod)
        return res.status(500).send("the product cannot be updated");

    res.send(prod);

}


const deleteProd = async (req, res) => {
    productModel.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success: true, message: "Product deleted"})

        }else{
            return res.status(404).json({message:false, message: "Product not found"})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err.message})
        // console.log(err);
    });

}
const getSpecificNum = async (req, res) => {
    const prodCount = await productModel.countDocuments();

    if(!prodCount) {
        res.status(500).json({ success: false })
    }
    res.json({count: prodCount});
}



const getFeatured = async (req, res) => {
    const featProd = await productModel.find({isFeatured: true});

    if(!featProd) {
        res.status(500).json({ success: false })
    }
    res.send(featProd);
}


module.exports = { getProduct, postProduct, getSingProduct, putPro, deleteProd, getSpecificNum, getFeatured}


