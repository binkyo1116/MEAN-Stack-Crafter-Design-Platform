const mongoose = require('mongoose');

const dribbbleSchema = new mongoose.Schema({
    d_title: {
        type: String,
        required: true
    },
    d_pic: {
        type: String,
        default: "No photo"
    },
    d_desc: {
        type: String,
        required: true
    },
    d_category: {
        type: String,
        required: true
    },
    d_color: {
        type: Array,
        required: true
    },
    d_tags: [
        {
            type: Array,
            required: true
        }
    ],
    d_link: [
        {
            type: Array,
            required: true
        }
    ],
    d_likes: [
        {
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    d_comments: [
        {
            text: {
                type: String,
                required: true
            },
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

mongoose.model('Dribbble', dribbbleSchema);