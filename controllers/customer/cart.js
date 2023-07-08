const db = require('../../models/index.js');
const { Op } = require("sequelize");

const addProductToCart = async(req, res) => {
    try {
        const { userId, productId } = req.body;
        let quantity = Number.parseInt(req.body.quantity);

        if(!userId) {
            return res.status(200).json({
                msg: "invalid user",
            })
        }

        if(!productId) {
            return res.status(200).json({
                msg: "invalid product",
            })
        }

        // Check if product is already in the cart
        const findProduct = await db.cart.findOne({
            where: { [Op.and]: [
                { userId },
                { productId }
            ]}
        })

        let productQuantity = findProduct.dataValues.quantity;

        // Found --> update
        if(findProduct) {
            // Update --> increase quantity by 1
            const updateProductInCart = await findProduct.update({ quantity: productQuantity+1 }, { where: { productId } });
            return res.status(200).json({
                msg: "Cart updated",
                product: updateProductInCart
            })
        }

        // Not found --> add
        const addProduct = await db.cart.create({ ...req.body, quantity });
        return res.status(200).json({
            msg: "Product added in the cart",
            product: addProduct
        })
    } catch(error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

const productsInCart = async(req, res) => {
    try {
        const getProducts = await db.cart.findAll({});

        if(!getProducts) {
            return res.status(200).json({
                msg: "Your cart is empty"
            })
        }
        return res.status(200).json({
            msg: "success",
            products: getProducts
        })
    } catch(error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

const deleteProductFromCart = async(req, res) => {
    try {
        const { userId, productId } = req.body;

        // Get product from the cart
        const findProduct = await db.cart.findOne({
            where: { [Op.and]: [
                { userId },
                { productId }
            ]}
        })

        let productQuantity = findProduct.dataValues.quantity;

        // If product quantity > 1
        if(findProduct && productQuantity > 1) {
            //decrease quantity by 1
            const updateProductInCart = await findProduct.update({ quantity: productQuantity-1 }, { where: { productId } });
            return res.status(200).json({
                msg: "Cart updated",
                product: updateProductInCart
            })
        }
        
        // Delete from cart
        const deleteProduct = await findProduct.destroy({})
        return res.status(200).json({
            msg: "product deleted from cart"
        })
    } catch(error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = {
    addProductToCart,
    productsInCart,
    deleteProductFromCart
}

