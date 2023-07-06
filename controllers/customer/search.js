const db = require('../../models/index.js');
const { Op } = require("sequelize");

exports.searchProducts = async (req, res) => {
    try {
        // Find products
        const products = await db.product.findAll({
            where: { categoryId: req.params.categoryId }
        })
        if (products.length === 0) {
            return res.status(404).json({
                msg: "No products to show"
            });
        }
        return res.status(200).json({ products });

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

exports.searchProductsByFilters = async(req, res) => {
    try {
        const {name, description, color, price, rating, ...extraFilters} = req.body;

        const filters = {
            ...(name && { name: { [Op.iLike]: `%${name}%` } }),
            ...(description&& { description: { [Op.iLike]: `%${description}%` } }),
            ...(color && { color: { [Op.iLike]: `%${color}%` } }),
            ...(price && { price: {
                            [Op.and]: [
                                { [Op.gte]: Number(price.min) },
                                { [Op.lte]: Number(price.max) },
                            ]
                        }
            }),
            ...(rating && { rating: { [Op.gte]: `${value}` } })

        }

        const values = []
        const dynamicFilters = []

        Object.keys(extraFilters).map(key => {
            dynamicFilters.push(key)

        })

        Object.values(extraFilters).map(value => {
            values.push(value)

        })
        const filteredProducts = await db.product.findAll({
            where: filters,
            include: [{
                model: db.product_feature,
                where: { value: { [Op.in]: values }},
                required: true,
                include: {
                    model: db.feature_attribute,
                    where: { name: { [Op.in]: dynamicFilters }}
                }
            }]
           
        })

        if (filteredProducts.length > 0) {
            return res.status(200).json({ filteredProducts })
        }
        return res.status(500).json({
            msg: "No products to show"
        })

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}