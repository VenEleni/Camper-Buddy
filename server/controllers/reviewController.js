const Product = require('../models/productModel');

exports.createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Check if the user has already reviewed this product
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Product already reviewed' });
        }
        const review = {
            user: req.user._id,
            rating: Number(rating),
            comment,
        };
        // Add the review to the product's reviews array
        product.reviews.push(review);
        // Update the overall rating of the product
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).select('reviews');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product.reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
