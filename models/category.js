const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type : String,
    },
    color: {
        type : String,
    },
    // countInStock: {
    //     type: Number,

    // }
})

// exports.Category = mongoose.model("Category", categorySchema);

let categoryModel = mongoose.models.Category|| mongoose.model("Category", categorySchema);



module.exports = categoryModel
