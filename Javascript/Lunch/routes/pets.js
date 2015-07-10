var express = require('express');
var PetsCtrl = require('../controllers/pets_controller.js');

var router = express.Router();

router.get('/', PetsCtrl.index);

module.exports = router;