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

exports.searchProductsByFilters = async(req, res) => {
    try {
        const { name, description, color, minPrice, maxPrice, rating } = req.query;
        const filters = {};

        // Check for filter input
        if(name) {
            filters.name = { [Op.iLike]: `%${name}%` }
        }
        if(description) {
            filters.description = { [Op.iLike]: `%${description}%` }
        }
        if(color) {
            filters.color = { [Op.iLike]: `%${color}%` }
        }
        if(minPrice && maxPrice) {
            filters.price = { [Op.and]: [
            
                { [Op.gte]: `${Number(minPrice)}` } ,
                { [Op.lte]: `${Number(maxPrice)}` } ,

                ] 
            }
        }
        if(rating) {
            filters.rating = { [Op.gte]: `${rating}` }
        }
        
        // Based on filters --> find products
        const products = await db.product.findAll({ where: filters })
        if(products.length > 0) {
            return res.status(200).json({ products })
        }
        return res.status(500).json({ 
            msg: "No products to show"
         })
    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
}