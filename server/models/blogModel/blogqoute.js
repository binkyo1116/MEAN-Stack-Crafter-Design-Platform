const mongoose = require('mongoose');

const blogQouteSchema = new mongoose.Schema({
    b_qoute: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

mongoose.model("BlogQoute", blogQouteSchema);