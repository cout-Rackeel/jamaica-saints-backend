const express = require('express');
const router = express.Router();
const {getAllSaints,addSaint,getSaintById,editSaint,deleteSaint} = require('../controllers/saint.controller');


router
  .route('/')
  .get(getAllSaints)
  .post(addSaint)

router
  .route('/:id')
  .get(getSaintById)
  .patch(editSaint)
  .delete(deleteSaint)


module.exports = router;