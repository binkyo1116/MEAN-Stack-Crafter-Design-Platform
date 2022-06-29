const router = require('express').Router();
const requireLogin = require('../../middleware/auth');
const mongoose = require('mongoose');
const BlogQoute = mongoose.model('BlogQoute')

router.get('/b_qoutes', requireLogin, async (req,res)=>{
    try {
        const b_qoute = await BlogQoute.find().populate('postedBy', 'userName profilePic').sort('-createdAt');
        res.json(b_qoute);  
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.post('/b_qoutes', requireLogin, async (req,res)=>{
    try {
        const {b_qoute} = req.body;
        if(!b_qoute){
            return res.status(500).json({error: "Please Enter the required Field"})
        }

        const newBlogQoute = new BlogQoute({
            b_qoute,
            postedBy: req.user
        });

        await newBlogQoute.save();

        res.json({message: "Qoute Created Successfully", newBlogQoute});

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
})

router.delete('/b_qoutes/:id', requireLogin, async(req,res)=>{
    try {
        await BlogQoute.findOne({_id: req.params.id}).populate("postedBy","_id").exec((err,b_qoute)=>{
            if(err){
                return res.status(401).json({err: err.message});
            }
            if(b_qoute.postedBy._id.toString() === req.user._id.toString()){
                const del_bQoute = b_qoute.remove();
                if(del_bQoute){
                    res.json({message: "Blog Qoute deleted Successfully"});
                }
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

//Own User qoutes
router.get('/b_userqoutes', requireLogin, async (req,res)=>{
    try {
        const b_qoute = await BlogQoute.find({postedBy: req.user._id}).populate('postedBy', "userName profilePic").sort('-createdAt');
        res.json(b_qoute);
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router;