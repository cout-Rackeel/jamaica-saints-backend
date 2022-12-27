const mongoose = require('mongoose');


const parishSchema = new mongoose.Schema({
  parish_nm:{
    type:String,
    required : [true , 'A parish name is required'],
    unique : [true , 'This parish name already exists'],
    sparse : true
  }
}, {collection : 'parishes'})


const Parish = mongoose.model('Parish' , parishSchema);

module.exports = Parish;
