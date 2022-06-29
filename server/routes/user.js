const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/auth');

router.get('/getUsers', async (req,res)=>{
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
})

router.get('/getUser',requireLogin, async (req,res)=>{
    try {
        const user = await User.find({_id:req.user._id});
        res.json(user);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
})






router.post('/signup', async (req,res)=>{
    try {
        const {firstName, lastName, userName, email, password, whoAreYou, profilePic, bio} = req.body;

        if(!firstName || !lastName || !userName || !email || !password || !whoAreYou){
            return res.status(401).json({error: "Please Enter All the fields"});
        }

        const user1 = await User.findOne({userName});
        if(user1){
            return res.status(401).json({error: "Username already exists"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({error: "Email already exists"});
        }

        if(password.length < 6){
            return res.status(401).json({error: "Password must contain atleast 6 characters"});
        }

        const passwordHash = await bcrypt.hash(password,12);

        const newUser = new User({
            firstName,
            lastName,
            userName: userName.toLowerCase(),
            email: email.toLowerCase(),
            password: passwordHash,
            whoAreYou,
            profilePic,
            bio
        });

        await newUser.save();

        res.json({message: "User Signed Up successfully"});


    } catch (err) {
        return res.status(500).json({err: err.message});
    }
});

router.post('/signin', async (req,res)=>{
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(401).json({error: "Please Enter All the fields"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: "User does not exists"});
        }

        const doMatch = await bcrypt.compare(password, user.password);
        if(!doMatch){
            return res.status(401).json({error: "Invalid Email or Password"});
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
        res.json({
            token,
            user,
            message: "Signed in Successfully"    
        })


    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/updateProfilePic', requireLogin, async (req,res)=>{
	
    try {
        const updateProfile = await User.findByIdAndUpdate(req.user._id, {
            $set: {profilePic: req.body.profilePic}
        },{
            new: true
        },(err,result)=>{
            if(err) throw err;
            res.json(result);
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})


module.exports = router;