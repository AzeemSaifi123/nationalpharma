const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    state:{type:String,required:true},
    city:{type:String, required:true},
})

module.exports = mongoose.model("places",userSchema) // data base name