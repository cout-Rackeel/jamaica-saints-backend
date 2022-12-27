const mongoose = require('mongoose');


const campusSchema = new mongoose.Schema({
  campus_nm:{
    type:String,
    required : [true , 'A campus name is required'],
    unique : [true , 'This campus name already exists'],
    sparse : true
  }
}, {collection : 'campuses'})


const Campus = mongoose.model('Campus' , campusSchema);

module.exports = Campus;
