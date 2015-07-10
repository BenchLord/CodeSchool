var express = require('express');
var RestaurantsCtrl = require('../controllers/restaurants_controller.js');

var router = express.Router();

router.get('/restaurants(.:format)?', RestaurantsCtrl.index);
router.get('/restaurants/new', RestaurantsCtrl.new);
router.post('/restaurants(.:format)?', RestaurantsCtrl.create);
router.get('/restaurants/(:id)(.:format)?', RestaurantsCtrl.show);
router.delete('/restaurants/(:id)(.:format)?', RestaurantsCtrl.destroy)
router.get('/restaurants/edit/:id', RestaurantsCtrl.change)
router.put('/restaurants/(:id)(.:format)?', RestaurantsCtrl.update)

module.exports = router;