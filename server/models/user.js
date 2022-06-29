const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    whoAreYou: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/originals/86/b9/4c/86b94c56b28e6bd8533320241440ddef.gif"
    },
    bio: {
        type: String,
    },
}, {
    timestamps: true
});

mongoose.model('User', userSchema);