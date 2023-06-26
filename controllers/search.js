const db = require('../models/index.js');
const { Op } = require("sequelize");

exports.addProduct = async(req, res) => {
    try {
        const addProduct = await db.product.create(req.body)
        return res.status(200).json({ addProduct });
    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.getProduct = async(req, res) => {
    try {
        const product = await db.product.findOne({
            where: { id: req.params.id },
        })
        if(!product) {
            return res.status(200).json({
                msg: "Product not found"
            });
        }
        return res.status(200).json({ 
            msg: "success",
            product 
        });

    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.searchProducts = async(req, res) => {
    try {
        // Find products
        const products = await db.product.findAll({
            where: { categoryId: categoryId },
            include: { model: db.product_category}
            
        }) 
        if(products.length === 0) {
            return res.status(404).json({
                msg: "No products to show"
            });
        }
        return res.status(200).json({ products });

    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.searchProductsByQuery = async(req, res) => {
    try {
        const query = req.query.query;
        
        // Show all products
        if(query === '' || !query) {
            const products = await db.product.findAll({});
            return res.status(200).json({ products });
        }

        // Find products based on the query
        const filteredProducts = await db.product.findAll({
            where: {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${query}%` } }, 
                  { description: { [Op.iLike]: `%${query}%` } }
                  
                ],
              } 
        }) 

        if(filteredProducts.length === 0) {
            return res.status(404).json({
                msg: "No products to show"
            });
        }
        return res.status(200).json({ filteredProducts });
    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
}