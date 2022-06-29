const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    p_coverPhoto: {
        type: String,
        required: true
    },
    p_contact: {
        type: String,
        required: true
    },
    p_links: [
        {
            link_type: {
                type: String,
                required: true
            },
            link_url: {
                type: String,
                required: true
            }
        }
    ],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

mongoose.model('Profile', profileSchema);