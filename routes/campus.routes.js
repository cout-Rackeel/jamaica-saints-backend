const express = require('express');
const router = express.Router();
const {getAllCampuses,addCampus,getCampusById,editCampus,deleteCampus} = require('../controllers/campus.controller');


router
  .route('/')
  .get(getAllCampuses)
  .post(addCampus)

router
  .route('/:id')
  .get(getCampusById)
  .patch(editCampus)
  .delete(deleteCampus)


module.exports = router;