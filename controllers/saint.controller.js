const {JSONResponse} = require('../helpers/jsonResponse');
const Saint = require('../models/saint.model');

exports.getAllSaints = async (req , res) => {
  try{

    const saints = await Saint.find()
    
    // const saints = await Saint.find().populate([
    //   {
    //     path:'residence', 
    //     populate: {
    //       path : 'parish',
    //       select:['parish_nm']
    //     }
    // },
    //   {path:'campus', select:['campus_nm']},
    // ])

    if(saints.length == 0){
      return JSONResponse.success(res,"No saint found",saints, 404);
    }

    return JSONResponse.success(res,"Successfully retrieved saints", saints , 200);
  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.getSaintById = async (req , res) => {
  try{
    const {id} = req.params;
    const saint = await Saint.findById(id).populate([
      {
        path:'residence', 
        populate: {
          path : 'parish',
          select:'parish_nm'
        }
    },
      {path:'campus', select:'campus_nm'},
    ])

    if(!saint){
      return JSONResponse.success(res, `No saint found with the id of ${id}`, saint ,404);
    };

    return JSONResponse.success(res,'Successfully retrieved saint', saint , 200);

  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.addSaint = async (req , res) => {
  try{
    const {
      first_nm,
      last_nm,
      residence,
      dob,
      campus,
      waterBaptism,
      holyGhost
    } = req.body;

    const addedSaint = await Saint.create({
      first_nm : first_nm,
      last_nm : last_nm,
      residence : residence,
      dob : dob,
      campus : campus,
      waterBaptism : waterBaptism,
      holyGhost : holyGhost
    });

    return JSONResponse.success(res, 'Saint has been successfully created', addedSaint, 201);
  }catch(err){
    return JSONResponse.error(res, err.message , err , 500);
  }
}

exports.editSaint = async (req , res) => {
  try{
    const {id} = req.params;
    const {
      first_nm,
      last_nm,
      residence,
      dob,
      campus,
      waterBaptism,
      holyGhost
    } = req.body;

    const editDetails = {
      first_nm : first_nm,
      last_nm : last_nm,
      residence : residence,
      dob : dob,
      campus : campus,
      waterBaptism : waterBaptism,
      holyGhost : holyGhost
    }

    const saint = await Saint.findById(id);

    if(!saint){
      return JSONResponse.error(res, `Could not find Saint with the id of ${id}`, null , 404);
    }

    const editedSaint = await Saint.findByIdAndUpdate(id , editDetails);

    return JSONResponse.success(res, 'Saint has been successfully edited', editedSaint, 200)

  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

exports.deleteSaint = async (req , res) => {
  try{
    const {id} = req.params;
    const saint = await Saint.findById(id);
    if(!saint){
      return JSONResponse.error(res, `Cannot find saint with the id of ${id} , hence cannot be deleted`, null , 404);
    }

    const deletedSaint = await Saint.findByIdAndRemove(id);
    return JSONResponse.success(res, 'Saint has been successfully deleted', deletedSaint, 200)
  }catch(err){
    return JSONResponse.error(res, err.stack , err , 500);
  }
}

