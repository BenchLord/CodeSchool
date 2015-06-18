var express = require('express');

var OrderController = require('./orderController.js');

var router = express.Router();

// Create
router.get('/new', OrderController.new);
router.post('/', OrderController.create);

// Read
router.get('/', OrderController.index);
router.get('/:id', OrderController.show);

// Update
router.get("/:id/edit", OrderController.edit);
router.put("/:id" , OrderController.update);

// Destroy
router.delete('/:id', OrderController.delete);

module.exports = router;