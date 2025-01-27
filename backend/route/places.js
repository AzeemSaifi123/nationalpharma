const express = require('express');
const router = express.Router();
const places = require('../models/places')

  router.get('/',(req,res,next)=>{
    places.find().then((document)=>{
        console.log(document);     
        res.status(200).json({    
            message:"State fetched successfully",
            places:document // data base name
        })
    })
    .catch(err=>{
      req.status(500).json({
        error:err
      })
    })
  });

  
  module.exports = router;