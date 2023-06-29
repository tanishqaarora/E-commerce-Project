const db = require('../../models/index.js');

exports.addProductFeature = async(req, res) => {
    try {
        console.log("Body", req.body)
        const { productId, featureId, value } = req.body;
        if(!productId || !featureId) {
            return res.status(400).json({
                msg: "invalid request"
            });
        }
        if(!value) {
            return res.status(400).json({
                msg: "Please provide value to be added"
            });
        }
        const product = await db.product.findOne({ 
            where: { id: req.body.productId }
        })
        // No Product
        if(!product) {
            return res.status(404).json({
                msg: "Product does not exist"
            })
        }
        // Found
        const addFeature = await db.product_feature.create(req.body)
        return res.status(200).json({
            msg: "feature added",
            addFeature
        })
    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
}