// Require needed modules
var dbProductMagic = require('../dbMagic/productMagic');
var config = require("../../config/config.js")();
var dbCategoryMagic = require('../dbMagic/categoryMagic');
// Export functions
module.exports = {

    // Show a product from url request
    getBySEO: function(req, res) {
        // Get categories for top nav
        dbCategoryMagic.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            // Find requested product
            dbProductMagic.findProductBySEO(req.params.seo, function(err, product) {
                
                // Catch product not found
                if (err) {
                    
                    res.render('404', {
                        store: config.store.name,
                        title: err.message,
                        logged: req.isAuthenticated(),
                        user: req.user,
                        cart: req.session.cart,
                        categories: categories
                    });    
                
                } else {
            
                    // Render product view
                    res.render('product/product', {
                        store: config.store.name,
                        title: product.name,
                        logged: req.isAuthenticated(),
                        user: req.user,
                        cart: req.session.cart,
                        categories: categories,
                        product: product
                    });
                }
            });
        });
    }
};