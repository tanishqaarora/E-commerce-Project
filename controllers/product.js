const db = require('../models/index.js');

exports.addProduct = async(req, res) => {
    try {
        // Check if it is 'seller'
        if(req.user.role === 'seller') {
            // Get Data
            const { name, description, price, rating, categoryId } = req.body;
            if(!rating || !name || !description || !price) {
                return res.status(401).json({
                    msg: "Please specify all product details"
                })
            } 
            
            if(!categoryId) {
                return res.status(401).json({
                    msg: "Please specify the product category"
                })
            } 

            // Add product
            const product = await db.product.create(req.body);
            return res.status(200).json({
                msg: "Product added",
                product
            });
        } else {
            return res.status(401).json({
                msg: "Not authorized as seller"
            })
        }
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

exports.getProduct = async(req, res) => {
    try {
        // Find product
        const findProduct = await db.product.findOne({
            where: { id: req.params.id },
            include: { model: db.product_category}
        });

        // Product not found
        if(!findProduct) {
            return res.status(404).json({
                msg: "Product does not exist"
            });

        // Found
        }
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

exports.getAllProducts = async(req, res) => {
    try {
        // Find products
        const products = await db.product.findAll({
            order: ['createdAt'],
            include: { model: db.product_category }
        });

        // Not found
        if(!products) {
            return res.status(404).json({
                msg: "No products to show"
            });
        }

        // Found
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

exports.updateProduct = async(req, res) => {
    try {
        console.log("role", req.user.role);
        if(req.user.role === 'seller') {
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
        } else {
            return res.status(401).json({
                msg: "Not authorized as seller"
            });
        }
        
        
    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

exports.deleteProduct = async(req, res) => {
    try {
        console.log("role", req.user.role);
        if(req.user.role === 'seller') {
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
        } else {
            return res.status(401).json({
                msg: "Not authorized as seller"
            });
        }
        

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}