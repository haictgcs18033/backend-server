const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    productPictures: [
        {
            img: {
                type: String
            }
        }
    ],
    reviews: [
        {
            // we need the user account for review the product so we apply the foreign key to do review function
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',required:true },
    // createBy is used to determine the person who add the product into the system(e.g:Admin)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    updatedAt: Date,
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
