const router = require('express').Router();
const requireLogin = require('../../middleware/auth');
const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.post('/b_upload', requireLogin, async (req,res)=>{
    try {
        console.log(req.files);
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({message: "No files choosen"});
        }

        const file = req.files.file;
        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: "Size is too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({message: 'Unsupported file format'});
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async (err,result)=>{
            if(err) throw err;
            removeTmp(file.tempFilePath)
            res.json({public_id: result.public_id, url: result.secure_url});
        })
    } catch(err){
        return res.status(500).json({err: err.message});
    }
})


router.post('/b_destroy', requireLogin, async (req,res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id){
            return res.status(401).json({error: "No Images choosen"});
        }

        cloudinary.v2.uploader.destroy(public_id, async (err, result)=>{
            if(err) throw err;

            res.json({message: "Deleted Successfully"});

        })

    } catch (err) {
        return res.status(500).json({err: err.message});
    }
})

const removeTmp = (path)=>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router;