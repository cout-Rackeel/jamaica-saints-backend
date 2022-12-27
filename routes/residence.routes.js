const express = require('express');
const router = express.Router();
const {getAllResidences,addResidence,getResidenceById,editResidence,deleteResidence} = require('../controllers/residence.controller');


router
  .route('/')
  .get(getAllResidences)
  .post(addResidence)

router
  .route('/:id')
  .get(getResidenceById)
  .patch(editResidence)
  .delete(deleteResidence)


module.exports = router;