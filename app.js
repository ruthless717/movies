const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const path= require('path');

const app= express();
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
require('dotenv').config();

const PORT=3000;

mongoose.connect(process.env.MONGO,{
    // userNewUrlParser: true,
    // useUnifiedTopology: true
});

const movieRouter= require('./routes/movies');
app.use('/api',movieRouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`);
});