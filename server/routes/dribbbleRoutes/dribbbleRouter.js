const router = require('express').Router();
const requireLogin = require('../../middleware/auth');
const mongoose = require('mongoose');
const Dribbble = mongoose.model('Dribbble');
const User = mongoose.model('User');

router.get('/dribbble', requireLogin, async (req,res)=>{
    try {
        const d_post = await Dribbble.find().populate('postedBy', 'userName profilePic').populate('d_likes.postedBy', 'userName profilePic').populate('d_comments.postedBy', 'userName profilePic').sort('-createdAt');
        if(d_post){
            return res.json(d_post)
        } 
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.post('/dribbble', requireLogin, async (req,res)=>{
    try {
        const {d_title, d_pic, d_desc, d_category, d_color, d_tags, d_link} = req.body;
         
        if(!d_pic) return res.status(401).json({msg: "No Images Selected"});

        if(!d_title || !d_desc || !d_category || !d_color || !d_tags || !d_link){
            return res.status(401).json({msg: "Please Enter all the fields"});
        }

        const newPost = new Dribbble({
            d_title,
            d_pic, 
            d_desc, 
            d_category,
            d_color,
            d_tags,
            d_link,
            postedBy: req.user
        });

        await newPost.save();
        res.json({msg: "Post created Successfully"});

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.delete('/dribbble/:id', requireLogin, async (req,res)=>{
    try {
        await Dribbble.findOne({_id: req.params.id}).populate("postedBy", "_id").exec((err, posts)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }

            if(posts.postedBy._id.toString() === req.user._id.toString()){
                const delPost = posts.remove();
                if(delPost){
                    res.json({msg: "Post Deleted Successfully"});
                }else{
                    return res.status(401).json({msg: "Cant delete this Post"});
                }
            }

        });

    } catch (error) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/dribbble/:id', requireLogin, async (req,res)=>{
    try {
        const {d_title, d_pic, d_desc, d_category, d_color, d_tags, d_link} = req.body;

        if(!d_pic){
            return res.status(401).json({msg: "No Image Selected"});
        }

        if(!d_title || !d_desc || !d_category || !d_color || !d_tags || !d_link){
            return res.status(401).json({msg: "Please Enter all the fields"})
        }

        const post = await Dribbble.findOneAndUpdate({_id: req.params.id}, {
            d_title, d_pic, d_desc, d_category, d_color, d_tags, d_link, postedBy: req.user
        }, (err, posts)=>{
            if(err) throw err;
            if(posts.postedBy._id.toString() === req.user._id.toString()){
                const updatePost = posts.update();
                if(updatePost){
                    res.json({msg: "Post Updated Sucessfully"})
                }else{
                    return res.status(401).json({msg: "Can't update this post"});
                }
            }
        })

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

//Get User posts
router.get('/get_d_posts', requireLogin, async (req,res)=>{
    try {
        const post = await Dribbble.find({postedBy: req.user._id}).populate('postedBy', 'userName profilePic').sort('-createdAt');
        res.json(post);
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/d_like', requireLogin, async (req,res)=>{
    try {

        const like = {
            postedBy: req.user
        }

        const post = await Dribbble.findByIdAndUpdate(req.body.postId, {
            $push: {d_likes: like}
        }, {
            new: true
        }).populate('d_likes.postedBy', 'userName profilePic').exec((err, result)=>{
            if(err) throw err;
            res.json({msg: "Post Liked Successfully"});
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/d_unlike', requireLogin, async (req,res)=>{
    try {

        const like = {
            postedBy: req.user
        }

        const post = await Dribbble.findByIdAndUpdate(req.body.postId, {
            $pull: {d_likes: like}
        }, {
            new: true
        }).populate('d_likes.postedBy', 'userName profilePic').exec((err, result)=>{
            if(err) throw err;
            res.json({msg: "Post Unliked Successfully"});
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/d_comment', requireLogin, async (req,res)=>{
    try {
        const comment = {
            text: req.body.text,
            postedBy: req.user
        }

        const post = await Dribbble.findByIdAndUpdate(req.body.postId, {
            $push: {d_comments: comment}
        }, {
            new: true
        }).populate('d_comments.postedBy', 'userName profilePic').exec((err, result)=>{
            if(err) throw err;
            res.json({msg: "Commented Successfully"});
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.put('/d_uncomment', requireLogin, async (req,res)=>{
    try {
        const comment = {
            text: req.body.text,
            postedBy: req.user
        }

        const post = await Dribbble.findByIdAndUpdate(req.body.postId, {
            $pull: {d_comments: comment}
        }, {
            new: true
        }).populate('d_comments.postedBy', 'userName profilePic').exec((err, result)=>{
            if(err) throw err;
            res.json({msg: "Uncommented Successfully"});
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.get('/d_search', requireLogin, async (req,res)=>{
    try {
        const dribbblePattern = new RegExp("^"+req.body.query);
        const dribbble = await Dribbble.find({b_title:{$regex: dribbblePattern}})

        res.json(dribbble);
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.get('/d_profile/:id', requireLogin, async (req,res)=>{
    try {
        const user = await User.findOne({_id: req.params.id}).select('-password')
            if(user){
                await Dribbble.findOne({postedBy: req.params.id}).populate('postedBy', 'userName profilePic').sort('-createdAt').exec((err, posts)=>{
                    if(err) throw err;
                    res.json({user, posts});
                })
            }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router;