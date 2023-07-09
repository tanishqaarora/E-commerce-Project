const db = require('../../models/index.js');

const addProduct = async(req, res) => {
    try {
        // Get Data
        
        const { name, description, color, price, rating, categoryId } = req.body;
        if( !name || !description || !color || !price || !rating) {
            return res.status(401).json({
                msg: "Please specify all product details"
            })
        }

        // No category
        if(!categoryId) {
            return res.status(401).json({
                msg: "Please specify the product category"
            })
        } 

        // Add product
        console.log(req.body)
        const product = await db.product.create(req.body);
        console.log("product", product)
        return res.status(200).json({
            msg: "Product added",
            product
        });
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

const getProduct = async(req, res) => {
    try {
        // Find product
        const findProduct = await db.product.findOne({
            where: { id: req.params.id },
            include: [
                { model: db.product_category },
                { model: db.product_feature }
            ]
        });

        // Product not found
        if(!findProduct) {
            return res.status(404).json({
                msg: "Product does not exist"
            });
        }
        // Found
        return res.status(200).json({
            msg: "success",
            findProduct
        });
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

const getAllProducts = async(req, res) => {
    try {
        // Find products
        const products = await db.product.findAll({
            order: ['createdAt'],
            include: [
                { model: db.product_category },
                { model: db.product_feature }
            ]

        });

        // No Products
        if(products.length === 0) {
            return res.status(404).json({
                msg: "No products to show"
            });
        }

        // Show products
        return res.status(200).json({
            msg: "success",
            products
        });
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

const updateProduct = async(req, res) => {
    try {
        // Find product
        const findProduct = await db.product.findOne({
            where: { id: req.params.id }
        });

        // Not found
        if(!findProduct) {
            return res.status(404).json({
                msg: "Product does not exist"
            });

        // Found --> update
        } else {
            const updatedProduct = await findProduct.update(req.body);
            
            res.status(200).json({
                msg: "Product updated successfully",
                updatedProduct
            });
        }
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

const deleteProduct = async(req, res) => {
    try {
        // Find product
        const findProduct = await db.product.findOne({
            where: { id: req.params.id }
        })

        // Not found
        if(!findProduct) {
            return res.status(404).json({
                msg: "Product does not exist"
            });
        // Found --> delete
        } else {
            const removeProduct = await db.product.destroy({
                where: { id: req.params.id}
            });
            return res.status(200).json({
                msg: "Product deleted"
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}