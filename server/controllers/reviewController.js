const Product = require('../models/productModel');
const User = require('../models/userModel');

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
            (r) => r.user.toString() === req.user.id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Product already reviewed' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const review = {
            user: req.user.id,
            username: user.username, 
            rating: Number(rating),
            comment,
        };
        console.log("review is : ", review);
        
        // Add the review to the product's reviews array
        product.reviews.push(review);
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        
        
        res.status(201).json({ message: 'Review added successfully',
            review: {
                _id: review._id,
                user: review.user.username,  // Return the username
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
            } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate('reviews.user', 'username').select('reviews');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product.reviews);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

