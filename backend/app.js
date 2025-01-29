const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./route/queries');
const routerPlaces = require('./route/places');
const cors = require('cors');
// const path = require('path');

const app = express();

const http = require("http");
// const app = require('app');

// const uri = 'mongodb://127.0.0.1:27017/database'; // Replace 'mydatabase' with your database name
const uri = 'mongodb://147.93.96.8:27017/database'; // Replace 'mydatabase' with your database name

// Connect to MongoDB
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

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
    // res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(cors());

const allowedOrigins = ['http://localhost:3000', 'https://thenationalpharma.com']; // Add your allowed origins

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) { // Allow requests from allowed origins or no origin (like Postman)
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images/", express.static('images'));

app.use('/database/places',routerPlaces);
app.use('/database/queries',router);
app.use('/database/user',router);
// app.use('/database/queries', routerQuery);








    



