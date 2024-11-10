const express= require('express');
const router= express.Router();
const Movie=require('../models/movie');

const bodyParser=require('body-parser');
const movie= require('../models/movie');

router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));


router.get('/movies', async(req,res)=>{
    try{
    const movies= await Movie.find().sort({ date: -1});
    res.json(movies);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
});

router.post('/movies', async(req,res)=>{
    const movie= new Movie({
       title: req.body.title,
       year: req.body.year,
       rating: req.body.rating,
       description: req.body.description,
       poster: req.body.poster
    });

    try{
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

router.put('/movies/:id', async(req,res)=>{
    try{
        const updatedMovie= await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatedMovie);
    }catch(error){
        res.status(400).json({ message: error.message});
    }
});

router.delete('/movies/:id', async(req,res)=>{
    try{
        await Movie.findByIdAndDelete(req.params.id);
        res.json({message:'movie successfully removed'});
    }catch(error){
        res.status(400).json({ message: error.message});
    }
});

module.exports = router;