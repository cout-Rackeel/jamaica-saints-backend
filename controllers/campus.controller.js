const {JSONResponse} = require('../helpers/jsonResponse');
const Campus = require('../models/campus.model');

exports.getAllCampuses = async (req , res) => {
  try{
    const campuses = await Campus.find();

    if(campuses.length == 0){
      return JSONResponse.success(res,"No campus found",campuses, 404);
    }

    return JSONResponse.success(res,"Successfully retrieved Campuses", campuses , 200);
  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.getCampusById = async (req , res) => {
  try{
    const {id} = req.params;
    const campus = await Campus.findById(id);

    if(!campus){
      return JSONResponse.success(res, `No campus found with the id of ${id}`, campus ,404);
    };

    return JSONResponse.success(res,'Successfully retrieved Campus', campus , 200);

  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.addCampus = async (req , res) => {
  try{
    const {campus_nm} = req.body;

    const addedCampus = await Campus.create({
      campus_nm : campus_nm
    });

    return JSONResponse.success(res, 'Campus has been successfully created', addedCampus, 201);
  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.editCampus = async (req , res) => {
  try{
    const {id} = req.params;
    const {campus_nm} = req.body;
    const editDetails = {
      campus_nm : campus_nm,
    }

    const campus = await Campus.findById(id);

    if(!campus){
      return JSONResponse.error(res, `Could not find Campus with the id of ${id}`, null , 404);
    }

    const editedCampus = await Campus.findByIdAndUpdate(id , editDetails);

    return JSONResponse.success(res, 'Campus has been successfully edited', editedCampus, 200);
  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.deleteCampus = async (req , res) => {
  try{
    const {id} = req.params;
    const campus = await Campus.findById(id);
    if(!campus){
      return JSONResponse.error(res, `Cannot find Campus with the id of ${id} , hence cannot be deleted`, null , 404);
    }

    const deletedCampus = await Campus.findByIdAndRemove(id);
    return JSONResponse.success(res, 'Campus has been successfully deleted', deletedCampus, 200)

  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}