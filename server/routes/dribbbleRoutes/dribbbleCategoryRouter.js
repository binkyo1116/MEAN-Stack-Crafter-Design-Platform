const router = require('express').Router();
const requireLogin = require('../../middleware/auth');
const mongoose = require('mongoose');
const D_Category = mongoose.model('D_Category');

router.get('/d_category', requireLogin, async (req,res)=>{
    try {
        const d_category = await D_Category.find();
        res.json({d_category});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.post('/d_category', requireLogin, async (req,res)=>{
    try {
        const {d_catName} = req.body;
        if(!d_catName){
            return res.status(401).json({err: err.message});
        }

        const newCategory = new D_Category({
            d_catName
        });

        await newCategory.save();
        res.json({msg: "Category Created Successfully"});

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

router.delete('/d_category/:id', requireLogin, async (req,res)=>{
    try {
        const d_category = await D_Category.findByIdAndDelete(req.params.id);
        res.json({msg: "Category deleted"});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

module.exports = router;