const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./route/queries');
const routerPlaces = require('./route/places');

const uri = 'mongodb://127.0.0.1:27017/database'; // Replace 'mydatabase' with your database name

// Connect to MongoDB
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const app = express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/backend/images/", express.static('backend/images'));

app.use('/database/places',routerPlaces);
app.use('/database/queries',router);
app.use('/database/user',router);
// app.use('/database/queries', routerQuery);





module.exports = app;






    



