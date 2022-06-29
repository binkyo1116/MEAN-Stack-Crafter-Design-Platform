const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    b_coverPhoto: {
        type: String,
        required: true
    },
    b_title: {
        type: String,
        required: true
    },
    b_desc: {
        type: String,
        required: true
    },
        b_body:[ {
        heading:String,
        para:[{
        text:String,    
        }],
        image:String
        }],
    b_post: {
        type: String,
        required: true
    },
    b_category: {
        type: String,
        required: true
    },
    b_likes: [
        {
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    b_comments: [
        {
            b_text: {
                type: String,
                required: true
            },
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    featured: {
        type: Boolean,
        default: false
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

mongoose.model('Blog', blogSchema);