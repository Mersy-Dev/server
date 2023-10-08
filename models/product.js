const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    richDescription: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: '',
    },

    price: {
        type: Number,
        default: 0,
    },
    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 500

    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type : Boolean,
        default: false, 
    },
    dateCreated: { 
        type: Date,
        default: Date.now
    }
})

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
})


productSchema.set('toJSON', {
    virtuals: true,
})
// exports.Product = mongoose.model("Product", productSchema);



let productModel = mongoose.models.Product|| mongoose.model("Product", productSchema);



module.exports = productModel
