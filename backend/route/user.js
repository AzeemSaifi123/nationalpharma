const express = require('express');
const router = express.Router();
const Query = require('../models/query')
const places = require('../models/places')
const multer = require('multer');
const nodemailer = require('nodemailer');


const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'uploadslip/jpeg' || file.mimetype === 'uploadslip/png' || file.mimetype === 'uploadslip/webp' || file.mimetype === 'uploadslip/pdf'){
      cb(null, true);
  }else{
      cb(null, false);
  }
}

const upload = multer({
  storage:multer.diskStorage({
    destination:function(req,file,cb){
      cb(null, "backend/images");
    },
    filename: function(req,file,cb){

    let fileext = file.originalname.split('.').pop();

    cb(null,'MedicianSlip_' + Date.now() + file.originalname.substring(0, 10).split(' ').join('-') + '.' + fileext)
      
      // cb(null, `${Date.now()}-${file.fieldname}`  + ".pdf");
    },
    limits: {fileSize : 1024 * 1024 * 5}, // 5mb file size limit
    fileFilter: fileFilter,
   

  })

}).single('uploadslip');

// for display image

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adkhan9355@gmail.com',
    pass: 'xgkd vtmt bsat jdgk'
  }
});


router.post('/',upload,(req,res,next)=>{  

  let url = req.protocol + "://" + req.get("host");

    console.log("Hello")

     // const { email } = req.body;
    // const { name } = req.body;
    // query.findOne({ email })
     
    const query = new Query({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        whatsapp:req.body.whatsapp,
        hospital:req.body.hospital,
        uploadslip:req.file?url+"/backend/images/"+req.file.filename:'',
        address:req.body.address,  
        currState:req.body.currState,   
        currCity:req.body.currCity,   
        pincode:req.body.pincode,    
    });  
  
    query.save();


const resetLink = "http://localhost:4200/queryform"
   

    // res.status(201).json({
    //   message: 'query send successfully'
    // });

    const mailOptions = {
      from: 'adkhan9355@gmail.com', // sender mail
      to: [
        // { name: "Sharif Sahab", address: "adsaifee768@gmail.com" },
        { name: `${query.name}`, address: "infowebmilky@gmail.com" },
      ], // reciever mail
      subject: "New Order",
      attachments: [{
        // filename: 'Medician Slip.jpg',
        path: query.uploadslip,
        // contentType: 'application/jpg',
      }],
      html:`
        <html>
          <head>
              <title>New Order</title>
          </head>
          <body>
               <table border="0" cellpadding="0" cellspacing="0" width="auto" style="color:#566372; padding:25px; border:1px solid #dddddd;" cellspacing="0" cellpadding="0">
               <thead>
                  <tr><th align="left"><h1 style="font-size:18px; color:#113561; margin-top:0;">New Order</h1></th></tr>
               </thead> 
               <tbody>  
               <tr><td><p style="margin-top:0"><b style="color:#113561;">Dear ${query.name}</b></td></p></tr>  
               <tr><td>Email - ${query.email}</td></tr> 
               <tr><td>Phone - ${query.phone}</td></tr>
               <tr><td>Hospital - ${query.hospital}</td></tr> 
               <tr><td>address - ${query.address}</td></tr> 
               <tr><td>State - ${query.currState}</td></tr> 
               <tr><td>City - ${query.currCity}</td></tr> 
               <tr><td>Pincode - ${query.pincode}</td></tr> 
               <tr>
               <p>We have received a request to your medician order for National Pharma</p>
               <a href="${resetLink}" style="cursor: pointer;"><button type"button" style="padding:10px 15px; cursor: pointer; background:#1bc8b1; color:#fff; border-radius:3px; outline:0; border:0;cursor: pointer;">Go for agian</button></a>
               <p>Thanks you</p>
               <p>Team National Pharma</p>
               </tr>
               </tbody>
               </table>
          </body>
        <html>
      `
    };
     
  //   await transporter.sendMail(mailOptions);
  //   res.status(200).send('Email sent successfully');
  // } catch (error) {
  //   res.status(500).send('Error sending email: ' + error.message);
  // }
  
  transporter.sendMail(mailOptions)

      .then(result=>{ 
        res.status(200).json({
          query:result,
          message:"Email sent successfully"
        });
        // res.status(200).send('Email sent successfully');
      })
      .catch(err=>{
        res.status(500).json({
          error:err
        })
      })

  
  });



 router.get('/',(req,res,next)=>{
    places.find().then((document)=>{
        console.log(document);     
        res.status(200).json(
            {    
                message:"state fetched successfully",
                places:document // data base name
            }
           )
    })
    .catch(err=>{
      req.status(500).json({
        error:err
      })
    })
  });



  module.exports = router;