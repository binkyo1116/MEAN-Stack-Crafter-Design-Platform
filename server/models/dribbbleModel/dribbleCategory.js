const mongoose = require('mongoose');

const d_categorySchema = new mongoose.Schema({
    d_catName: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

mongoose.model('D_Category', d_categorySchema);