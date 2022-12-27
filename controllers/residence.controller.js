const {JSONResponse} = require('../helpers/jsonResponse');
const Residence = require('../models/residence.model');

exports.getAllResidences = async (req , res) => {
  try{
    const residences = await Residence.find().populate('parish');

    if(residences.length == 0){
      return JSONResponse.success(res,"No residence found",residences, 404);
    }

    return JSONResponse.success(res,"Successfully retrieved residences", residences , 200);
  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.getResidenceById = async (req , res) => {
  try{
    const {id} = req.params;
    const residence = await Residence.findById(id).populate('parish');

    if(!residence){
      return JSONResponse.success(res, `No residence found with the id of ${id}`, residence ,404);
    };

    return JSONResponse.success(res,'Successfully retrieved residence', residence , 200);


  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.addResidence = async (req , res) => {
  try{
    const {
      adrs_ln_one,
      adrs_ln_two,
      town,
      parish,
      isCurrent,
      typeOfResidence
    } = req.body;

    const addedResidence = await Residence.create({
      adrs_ln_one : adrs_ln_one,
      adrs_ln_two : adrs_ln_two, 
      town : town,
      parish : parish,
      isCurrent : isCurrent,
      typeOfResidence : typeOfResidence
    });

    return JSONResponse.success(res, 'Residence has been successfully created', addedResidence, 201);
  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.editResidence = async (req , res) => {
  try{
    const {id} = req.params;
    const {
      adrs_ln_one,
      adrs_ln_two,
      town,
      parish,
      isCurrent,
      typeOfResidence
    } = req.body;

    const editDetails = {
      adrs_ln_one : adrs_ln_one,
      adrs_ln_two : adrs_ln_two, 
      town : town,
      parish : parish,
      isCurrent : isCurrent,
      typeOfResidence : typeOfResidence
    }

    const residence = await Residence.findById(id);

    if(!residence){
      return JSONResponse.error(res, `Could not find Residence with the id of ${id}`, null , 404);
    }

    const editedResidence = await Residence.findByIdAndUpdate(id , editDetails);

    return JSONResponse.success(res, 'Residence has been successfully edited', editedResidence, 200)

  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.deleteResidence = async (req , res) => {
  try{
    const {id} = req.params;
    const residence = await Residence.findById(id);
    if(!residence){
      return JSONResponse.error(res, `Cannot find residence with the id of ${id} , hence cannot be deleted`, null , 404);
    }

    const deletedResidence = await Residence.findByIdAndRemove(id);
    return JSONResponse.success(res, 'Residence has been successfully deleted', deletedResidence, 200)
  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}