const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    whatsapp:{type:String,required:true},
    hospital:{type:String,required:true},
    uploadslip:{type:String,required:true},
    address:{type:String,required:true},
    currState:{type:String,required:true},
    currCity:{type:String,required:true},
    pincode:{type:String,required:true}
})

module.exports = mongoose.model("queries",userSchema) // data base name