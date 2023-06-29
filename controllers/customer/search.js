const db = require('../../models/index.js');
const { Op } = require("sequelize");

exports.searchProducts = async(req, res) => {
    try {
        // Find products
        const products = await db.product.findAll({
            where: { categoryId: req.params.categoryId }
            
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


