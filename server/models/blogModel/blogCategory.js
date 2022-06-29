const mongoose = require('mongoose');

const blogCategorySchema = new mongoose.Schema({
    b_catName: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

mongoose.model('BlogCategory', blogCategorySchema);