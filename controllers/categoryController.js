const categoryModel = require("../models/category");
const asyncHandler = require('express-async-handler');



const getCategory = asyncHandler(async(req, res) => { 
    const categoryList = await categoryModel.find();

    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList);
});


const getCattegory = async (req, res) => {
    const category = await categoryModel.findById(req.params.id);
    if(!category) {
        res.status(500).json({message: "The category id does not exist"})
    }res.status(200).send(category);
}

const postCategory =  async(req, res) => { 
    let category = new categoryModel({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
       
    })

    category = await category.save();
    if(!category)
    return res.status(404).send("the category cannot be created");  

    res.send(category);

}


const putCat = async (req, res) => {
    const category = await categoryModel.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color  
        },
        {
            new:true
        }
    )
    if(!category)
    return res.status(404).send("the category cannot be created");  

    res.send(category);

}

const deleteCategory = async (req, res) => {
    categoryModel.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: "category deleted"})

        }else{
            return res.status(404).json({message:false, message: "Category not found"})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err.message})
        // console.log(err);
    });

}

module.exports = {getCategory, postCategory, deleteCategory, getCattegory, putCat }
 