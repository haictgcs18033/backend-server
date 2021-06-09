const Cart = require('../models/cart')

exports.addCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((err, cart) => {
            if (err) return res.status(400).json({ msg: err })
            if (cart) {
                // if cart already exist then update cart by quantity
                //   res.status(200).json({message:cart})

                const product = req.body.cartItems.product
                const isItemAdded = cart.cartItems.find(item => item.product == product)
                let limitedPrice = req.body.cartItems.limitedPrice
                if (isItemAdded) {
                    //   "cartItems.product" dua tren object cartItems tu mongodb

                    Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                        "$set": {
                            // Add .$ operator to avoid error xoa toan bo cac san pham da add ma chi giu lai san pham gan nhat
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: isItemAdded.quantity + req.body.cartItems.quantity,
                                price: isItemAdded.price + limitedPrice
                            }
                        }
                    }).exec((err, _cart) => {
                        if (err) return res.status(400).json({ msg: err })
                        if (_cart) {
                            return res.status(200).json({ cart: cart })
                        }
                    })


                } else {
                    Cart.findOneAndUpdate({ user: req.user._id }, {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }).exec((err, _cart) => {
                        if (err) return res.status(400).json({ msg: err })
                        if (_cart) {
                            return res.status(200).json({ cart: cart })
                        }
                    })
                }


            } else {
                // if cart dont exist then create a new cart
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                })
                cart.save((err, cart) => {
                    if (err) return res.status(400).json({ msg: err })
                    if (cart) {
                        return res.status(200).json({ cart: cart })
                    }
                })
            }
        })

}
exports.decremental = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((err, cart) => {
            if (err) return res.status(400).json({ msg: err })
            if (cart) {

                const product = req.body.cartItems.product
                const isItemAdded = cart.cartItems.find(item => item.product == product)

                let limitedPrice = req.body.cartItems.limitedPrice

                if (isItemAdded.quantity === 1 && isItemAdded.price === limitedPrice) {
                    return res.status(400).json({
                        msg: 'Cant decrease element'
                    })
                }

                if (isItemAdded) {
                    Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                        "$set": {
                            // Add .$ operator to avoid error xoa toan bo cac san pham da add ma chi giu lai san pham gan nhat
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: isItemAdded.quantity - req.body.cartItems.quantity,
                                price: isItemAdded.price - limitedPrice
                            }
                        }
                    })
                        .exec((err, _cart) => {
                            if (err) return res.status(400).json({ msg: err })
                            if (_cart) {
                                return res.status(200).json({ cart: cart })
                            }
                        })
                }

            }
        })

}

exports.getCart = (req, res) => {
    Cart.findOne({ user: req.user._id })
        .populate("cartItems.product", "_id name price description productPictures")
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (!cart) {
                return res.status(400).json({
                    msg: 'No Item Found'
                })
            }
            if (cart) {

                itemArray = []
                cart.cartItems.forEach((item) => {

                    itemArray.push(item)
                });
                res.status(200).json({ itemArray });
            }
        });

};
exports.removeFromCart = (req, res) => {
    const { productId } = req.body;
    if (productId) {
      Cart.updateOne({ user: req.user._id },
        {
         $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      ).exec()
      .then(output=>{
         return res.status(200).json({output})
      })
      .catch(err=>{
          return res.status(400).json({err})
      });
    }
}




