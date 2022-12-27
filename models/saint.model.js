const mongoose = require('mongoose');

const saintSchema = new mongoose.Schema({
  first_nm : {
    type: String,
    required : [true , 'Your first name is required']
  },
  last_nm : {
    type: String,
    required : [true , 'Your last name is required']
  },
  residence : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Residence',
    sparse:true,
    required:[true , 'Your residence is required']
  }],
  dob : {
    type : Date,
    required : [true , 'Your date of birth is required']
  },
  campus : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Campus',
    sparse:true,
    required:[true , 'Your campus is required']
  }],
  waterBaptism : {
    is_baptised : {
      type : Boolean,
      default : false,
    },
    baptism_dt : {
      type : Date,
    }
  },
  holyGhost : {
    is_filled : {
      type : Boolean,
      default : false
    },
    filled_dt : {
      type : Date
    },
    witnesses : [{
      type : String
    }]
  }

}, {collection : 'saints'})

const Saint = mongoose.model('Saint', saintSchema);

module.exports = Saint;