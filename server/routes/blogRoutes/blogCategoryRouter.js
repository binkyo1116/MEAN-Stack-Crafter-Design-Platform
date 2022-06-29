const { Mongoose } = require('mongoose');

const router = require('express').Router();
const mongoose = require('mongoose');
const BlogCategory = mongoose.model('BlogCategory');
const requireLogin = require('../../middleware/auth');

router.get('/b_category', requireLogin, async (req,res)=>{
    try {
        const b_category = await BlogCategory.find();
        res.json({b_category});
    } catch (err) {
        return res.status(401).json({err: err.message});
    }
})

router.post('/b_category', requireLogin, async (req,res)=>{
    try {
        const {b_catName} = req.body;

        if(!b_catName){
            return res.status(401).json({error: "Please Enter category"});
        }

        const b_category = await BlogCategory.findOne({b_catName});
        if(b_category){
            return res.status(401).json({error: "Category already exists"});
        }

        const newCategory = new BlogCategory({
            b_catName
        });

        await newCategory.save();

        res.json({message: "Category added Successfully"});

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.delete('/b_category/:id', requireLogin, async (req,res)=>{
    try {
        const b_category = await BlogCategory.findByIdAndDelete(req.params.id);
        res.json({message: "Category Deleted Successfully"});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.put('/b_category/:id', requireLogin, async (req,res)=>{
    try {
        const {b_catName} = req.body
        const b_category = await BlogCategory.findOneAndUpdate({_id: req.params.id}, {b_catName});
        res.json({message: "Updated Category Successfully"});
    } catch (err) {
        return res.status(401).json({err: err.message});
    }
})

module.exports = router;