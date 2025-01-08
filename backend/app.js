const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./route/user');

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

app.use('/database/query',router);
app.use('/database/places',router);









// io.on('connection', (socket) => {
//   console.log('A user connected');

//   io.emit('welcome', 'Hello world'); 
//   socket.on('message',(data)=>{
//     console.log('Received message:', data)
//   })

//   // Handle chat messages
//   // socket.on('chat message', (msg) => {
//   //   console.log(`Received message: ${msg}`);

//   //   io.emit('chat message', msg); // Broadcast the message to all connected clients

//   // });

//   // Handle disconnections
//   // socket.on('disconnect', () => {
//   //   console.log('User disconnected');
//   // });
// });


// app.post('/wassapp/chats', (req,res,next) => {
//   const msg = req.body; // Access the JSON body sent by the client
//   console.log('Received data:', msg);

//   // Respond back
//   res.status(201).json({
//       message: 'Data received successfully!',
//       receivedData: msg
//   });
// });

// const server = app.listen(port,()=>{
//     console.log("server is listening...")
// });

// const wss = new WebSocket.Server({server}); 

// wss.on("connection", (ws)=>{
//     ws.on("message",(data)=>{
//         console.log("data from client:",data);
//         ws.send("thanks buddy!")
//     })
// })

module.exports = app;

///  api //




    



