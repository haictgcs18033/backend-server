const Product = require('../models/product')

const shortid = require('shortid')
const slugify = require('slugify')
const Category = require('../models/category')
const product = require('../models/product')
exports.getProduct = (req, res) => {
    // res.send('Hello')
    Product.find({})
        .exec((err, product) => {
            if (err) return res.status(400).json({
                msg: err
            })
            if (product) {
                return res.status(200).json(product)
            }
        })
}
exports.productAdd = (req, res) => {
    const { name, price, quantity, description, category } = req.body
    let productPictures = []
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename }
        })
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        quantity: quantity,
        description: description,
        productPictures: productPictures,
        category: category,
        createdBy: req.user._id
    })
    product.save(((err, product) => {
        if (err) {
            return res.status(400).json({
                msg: err
            })
        }
        if (product) {
            res.status(200).json({
                product
            })
        }
    }))
    //    res.status(200).json({
    //        file:req.files,
    //        body:req.body,
    //    })
}
exports.getProductItemBySlug = (req, res) => {
    const { slug } = req.params
    Category.findOne({ slug: slug })
        .select('_id name slug type')
        .exec()
        .then(category => {
            if (!category) {
                return res.status(400).json({
                    msg: 'No Category Found'
                })
            }
            if (category) {

                Product.find({ category: category._id })
                    .exec()
                    .then(products => {


                        if (products.length === 0) {
                            return res.status(400).json({
                                msg: 'This category has no product'
                            })
                        }
                        if (products.length > 0) {
                            res.status(200).json({
                                products,
                                productByPrice: {
                                    under5K: products.filter(product => product.price <= 5000),
                                    under10K: products.filter(product => product.price <= 10000 && product.price > 5000),
                                    under15K: products.filter(product => product.price <= 15000 && product.price > 10000),
                                    under20K: products.filter(product => product.price <= 20000 && product.price > 15000),
                                    under25K: products.filter(product => product.price <= 25000 && product.price > 20000)
                                }
                            })
                        }


                    }).catch(error => {
                        return res.status(400).json({ error })
                    })
            }
        }
        ).catch(error => {
            return res.status(400).json({ error })
        })
}
exports.getProductDetailById = (req, res) => {
    let { productId } = req.params
    if (productId) {
        Product.findOne({ _id: productId })
        .exec()
        .then(product => {
            return res.status(200).json({ product })
        })
        .catch(err=>{
            return res.status(400).json({
                err:'Can not find the product'
            })
        })
        
    }
}
