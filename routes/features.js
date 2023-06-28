const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.post('/add-product-features', async (req, res) => {
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
                msg: "Please provide value"
            });
        }
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
})

module.exports = router;