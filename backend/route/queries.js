const express = require('express');
const router = express.Router();
const Queries = require('../models/queries')
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
      cb(null, "images");
    },
    filename: function(req,file,cb){

    let fileext = file.originalname.split('.').pop();

    // cb(null,'MedicianSlip_' + Date.now() + file.originalname.substring(0, 10).split(' ').join('-') + '.' + fileext)
      
      cb(null, `${Date.now()}-${file.originalname}` );
    },
    limits: {fileSize : 1024 * 1024 * 5}, // 5mb file size limit
    fileFilter: fileFilter,
   
  })

}).single('uploadslip');

// for display image

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'carethenationalpharma@gmail.com',
    pass: 'giff bwwv kubi blmi'
  }
});

router.post('/',upload,(req,res,next)=>{  

  let url = req.protocol + "://" + req.get("host");

    console.log("Hello")

     // const { email } = req.body;
    // const { name } = req.body;
    // query.findOne({ email })
     
    const query = new Queries({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        whatsapp:req.body.whatsapp,
        hospital:req.body.hospital,
        uploadslip:req.file?url+"/images/"+req.file.filename:'',
        address:req.body.address,  
        currState:req.body.currState,   
        currCity:req.body.currCity,   
        pincode:req.body.pincode,    
    });  
  
    query.save();


const resetLink = "http://localhost:4200/queryform";

    const mailOptions = {
      from: 'carethenationalpharma@gmail.com', // sender mail
      to: [
        // { name: "Sharif Sahab", address: "adsaifee768@gmail.com" },
        { name: "Sharif Sahab", address: "carethenationalpharma@gmail.com" },
        { name: `${query.name}`, address: `${query.email}` },
      ], // reciever mail
      subject: "Order Successfully placed",
      attachments: [
        {
        // filename: 'Medician Slip.jpg',
        path: query.uploadslip,
        // contentType: 'application/jpg',
        },
      {
        filename: 'logo-pharma.png',
        // path: query.uploadslip,
        path:'./images/pharma-logo.png',
        cid: 'logo-pharma',
      },
      {
        filename: 'call.png',
        // path: query.uploadslip,
        path:'./images/call.png',
        cid: 'call',
      }
    ],
      html:`
          <table border="0" cellpadding="0" cellspacing="0" width="auto"  style="color:#566372; padding:15px; border:1px solid #dddddd; font-size: 14px;"  cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                  <th align="left">
                      <a style="https://thenationalpharma.com" style="color: #6C8098">
                        <img  style="width: 40px; float: left;" src="cid:logo-pharma"/>
                        <span class="slog" style="float: left; margin-left: 4px; line-height: 10px;">
                          <small style="font-size: 9px; font-weight: 300;">The</small>
                          <span  style="font-size: 9px; display: block;">National</span>
                          <span style="font-size: 10px;">Pharma</span>
                        </span>
                      </a>
                  </th>
                  <th>
                    <a href="tel:9811824495" style="color: #6C8098; text-decoration: none;">
                        <span style="width: 20px; float: left; height:20px; margin-right: 6px;  border-radius: 100%; border: 1px solid #ddd;">
                            <img style="width: 12px; margin-top: 4px;" src="cid:call" alt="call">
                        </span>                   
                        <span style="font-size: 12px; font-weight:400;">9811824495</span>
                    </a>
                  </th>
              </tr>   
          
            </thead> 
            <tbody>  
            <tr><td align="left" style="font-size:16px; color:#113561; padding-top:20px; padding-bottom:10px;">Our agent call you shortly</td></tr>    
            <tr><td><b style="color:#113561;">Dear${query.name}</b></td></tr>  
            <tr><td>Email - ${query.email}</td></tr> 
            <tr><td>Phone - ${query.phone}</td></tr>
            <tr><td>Whatsapp - ${query.whatsapp}</td></tr>
            <tr><td>Hospital - ${query.hospital}</td></tr> 
            <tr><td>address - ${query.address}</td></tr> 
            <tr><td>State - ${query.currState}</td></tr> 
            <tr><td>City - ${query.currCity}</td></tr> 
            <tr><td>Pincode - ${query.pincode}</td></tr> 
            <tr>
            <p>We have received a request to your medician order for The National Pharma</p>
            <a href="${resetLink}" style="cursor: pointer;"><button type"button" style="padding:10px 15px; cursor: pointer; background:#1565c0; color:#fff; border-radius:3px; outline:0; border:0;cursor: pointer;">GO TO HOME</button></a>
            <p>Thanks you</p>
            <p>Team The National Pharma</p>
            </tr>
            </tbody>
        </table>
       
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
          Queries:result,
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
      Queries.find().then((doc)=>{
          console.log(doc);
          res.status(201).json({
            message:"Query fetched successfully",
            queries:doc
          })
          
      })
      .catch(err=>{
        req.status(501).json({
          error:err
        })
      })
      
  });

//   router.get('/',(req,res,next)=>{
//     user.find().then((doc)=>{
//         console.log(doc);
//         res.status(200).json({
//           message:"Query fetched successfully",
//           user:doc
//         })
        
//     })
//     .catch(err=>{
//       req.status(501).json({
//         error:err
//       })
//     })
    
// });


  
  module.exports = router;