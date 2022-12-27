const mongoose = require('mongoose');

const residenceSchema = new mongoose.Schema({

  // saintId : {
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : 'Saint',
  // },

  adrs_ln_one : {
    type: String,
    required : [true , 'Address line one is required']
  },
  adrs_ln_two : {
    type: String,
  },
  town : {
    type: String,
    required : [true , 'Your town name is required']
  },
  parish : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Parish',
    required:[true , 'Your parish is required']
  },
  isCurrent : {
    type : Boolean,
    required : [true , 'Please indicate if you are currently living at this address']
  },
  typeOfResidence : {
    type : String,
  }
}, {collection : 'residences'});

const Residence = mongoose.model('Residence', residenceSchema);

module.exports = Residence;