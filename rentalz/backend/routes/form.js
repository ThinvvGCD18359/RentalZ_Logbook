const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/get/search', formController.search);
router.post('/upsert/note', formController.editNote);
router.get('/get/note', formController.getAllNote);
router.post('/delete', formController.deleteRentForm);
router.get('/get', formController.getAllForm);
router.post('/create', formController.createNewForm);

module.exports = router;