const router = require('express').Router();
const requireLogin = require('../../middleware/auth');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile')
const Dribbble = mongoose.model('Dribbble');

router.get('/blog', requireLogin, async (req,res)=>{
    try {
        const blog = await Blog.find().populate('postedBy', 'userName profilePic').populate('b_likes.postedBy', 'userName profilePic').populate('b_comments.postedBy', 'userName profilePic').sort('-createdAt');
        res.json(blog);
    } catch (err) {
        return res.status(401).json({error: err.message});
    }
})

router.post('/blog', requireLogin, async (req,res)=>{
    try {
        const {b_coverPhoto, b_title, b_desc, b_body, b_post, b_category} = req.body;
        if(!b_coverPhoto || !b_post){
            return res.status(401).json({error: "No Images Selected"});
        } 

        if(!b_title || !b_body || !b_category){
            return res.status(401).json({error: "Please Enter the required Fields"});
        }

        const blog = await Blog.findOne({b_title});
        if(blog){
            return res.status(401).json({error: "Blog Title already exists"});
        }

        const newBlog = new Blog({
            b_coverPhoto,
            b_title,
            b_desc,
            b_body,
            b_post,
            b_category,
            postedBy: req.user
        });

        await newBlog.save();

        res.json({message: "Blog created Successfully"});


    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.get('/blog/:id', requireLogin, async (req,res)=>{
    try {
        await Blog.findOne({_id: req.params.id}).exec((err,blog)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }
           
		   
		   res.json(blog);
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})


router.delete('/blog/:id', requireLogin, async (req,res)=>{
    try {
        await Blog.findOne({_id: req.params.id}).populate('postedBy', '_id').exec((err,blog)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }
            if(blog.postedBy._id.toString() === req.user._id.toString()){
                const delblog = blog.remove();
                if(delblog){
                    res.json({message: "Post Deleted Successfully"})
                }else{
                    res.json({message: "Cant delete this post"})
                }
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/blog/:id', requireLogin, async (req,res)=>{
    try {
        const {b_coverPhoto, b_title, b_desc, b_body, b_post, b_category} = req.body;
        
        if(!b_coverPhoto || !b_post){
            return res.status(401).json({error: "No Images Selected"});
        } 

        await Blog.findOneAndUpdate({_id: req.params.id}, {
            b_coverPhoto, b_title, b_desc, b_body, b_post, b_category
        }, (err,blogs)=>{
            if(err) throw err;

            if(blogs.postedBy._id.toString() === req.user._id.toString()){
                const updateBlog = blogs.update()
                if(updateBlog){
                res.json({message: "Blog Updated Successfully"});
                }
            }
        });  
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/b_like', requireLogin, async (req,res)=>{
    try {
        const like = {
            postedBy: req.user
        }

        await Blog.findByIdAndUpdate(req.body.blogId, {
            $push: {b_likes: like}
        },{
            new: true
        }).populate('b_likes.postedBy', 'userName').exec((err,result)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }
            res.json({result});
        })

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/b_unlike', requireLogin, async (req,res)=>{
    try {
        const like = {
            postedBy: req.user
        }

        await Blog.findByIdAndUpdate(req.body.blogId, {
            $pull: {b_likes: like}
        },{
            new: true
        }).populate('b_likes.postedBy', 'userName').exec((err,result)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }
            res.json({result});
        })

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/b_comment', requireLogin, async (req,res)=>{
    try {
        const comment = {
            b_text: req.body.b_text,
            postedBy: req.user
        }

        await Blog.findByIdAndUpdate(req.body.blogId, {
            $push: {b_comments: comment}
        },{
            new: true
        }).populate('b_comments.postedBy', "userName profilePic").exec((err,result)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }
            res.json({result});
        })

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/b_uncomment', requireLogin, async (req,res)=>{
    try {
        const comment = {
            b_text: req.body.b_text,
            postedBy: req.user
        }
        await Blog.findByIdAndUpdate(req.body.blogId, {
            $pull: {b_comments: comment}
        },{
            new: true
        }).populate('b_comments.postedBy', "userName").exec((err,result)=>{
            if(err){
                return res.status(401).json({err: err.message});	
            }
            res.json({result});
        })

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

//User's blog 
router.get('/b_user', requireLogin, async(req,res)=>{ 
    try {
        const blog = await Blog.find({postedBy: req.user._id}).populate('postedBy', 'userName  profilePic').sort('-createdAt');
        res.json(blog);
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.get('/b_search', requireLogin, async (req,res)=>{
    try {
        const blogPattern = new RegExp("^"+req.body.query);
        const blog = await Blog.find({b_title:{$regex: blogPattern}})

        res.json(blog);

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

//To find User by Profile
router.get('/b_user_prof/:id', requireLogin, async(req,res)=>{
    try {
        const user = await User.findOne({_id: req.params.id}).select('-password');
        if(user){
            // await Blog.findOne({postedBy: req.params.id}).populate('postedBy','userName  profilePic').exec((err,posts)=>{
            //     if(err) throw err;
            //     res.json({user, posts});
            // });
            const profile = await Profile.find({postedBy: req.params.id}).populate("postedBy", "userName profilePic")
            const blog = await Blog.find({postedBy: req.params.id}).populate("postedBy", "userName profilePic");
            const dribbble = await Dribbble.find({postedBy: req.params.id}).populate("postedBy", "userName profilePic")
            res.json({user, profile, blog, dribbble})
        }
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router;