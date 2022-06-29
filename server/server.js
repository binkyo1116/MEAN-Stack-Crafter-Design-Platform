require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}))

require('./models/user');
require('./models/blogModel/blogmodel');
require('./models/blogModel/blogCategory');
require('./models/blogModel/blogqoute');
require('./models/profile');
require('./models/dribbbleModel/dribbbleModel');
require('./models/dribbbleModel/dribbleCategory');

app.use(require('./routes/user'));
app.use(require('./routes/blogRoutes/blogRouter'));
app.use(require('./routes/blogRoutes/blogCategoryRouter'));
app.use(require('./routes/blogRoutes/blogUploadRouter'));
app.use(require('./routes/blogRoutes/blogQouteRouter'));
app.use(require('./routes/profile'));
app.use(require('./routes/dribbbleRoutes/dribbbleRouter'));
app.use(require('./routes/dribbbleRoutes/dribbbleCategoryRouter'));

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log('Database running @27017');
})

mongoose.connection.on('error', (err)=>{
    console.log('Error:', err)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req,res)=>{
    console.log(`Server running ${PORT}`);
})

