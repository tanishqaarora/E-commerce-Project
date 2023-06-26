const db = require('../models/index.js');

exports.addCategory = async(req, res) => {
    try {
        // Get Data
        const { category } = req.body;
        if(!category) {
            return res.status(401).json({
                msg: "Please specify the product category"
            })
        } 
        
        // Add category
        const addCategory = await db.product_category.create(req.body);
        return res.status(200).json({
            msg: "Product category added",
            category: addCategory
        });

    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

exports.updateCategory = async(req, res) => {
    try {
        // Get updated data
        const { category } = req.body;
        if(!category) {
            return res.status(401).json({
                msg: "Please specify the product category"
            })
        } 
        
        // Check if it exists
        const findCategory = await db.product_category.findOne({
            where: { id: req.params.id }
        })

        // Not found
        if(!findCategory) {
            return res.status(401).json({
                msg: "This category does not exist"
            });
        } 
        // Found --> update
        const updateCategory = await findCategory.update({ category })
        return res.status(200).json({
            msg: "updated successfully",
            category: updateCategory
        });
        

    } catch (error) {
        res.status(500).json({
           msg: error.message
       });
   }
}

exports.deleteCategory = async(req, res) => {
    try {
        // Find category
        const findCategory = await db.product_category.findOne({
            where: { id: req.params.id }
        })

        // Not found
        if(!findCategory) {
            return res.status(404).json({
                msg: "Category does not exist"
            });
        // Found --> delete
        } else {
            const removeCategory = await db.product_category.destroy({
                where: { id: req.params.id}
            });
            return res.status(200).json({
                msg: "Category deleted"
            });
        }

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}
