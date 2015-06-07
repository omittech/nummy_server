var express = require('express');
var router = express.Router();
var user =require('../controllers/user');
var restaurant =require('../controllers/restaurant');
var item =require('../controllers/item');
var order = require('../controllers/order');
var passport = require('passport');


//------------------User----------------------
router.get('/user',user.get);
router.get('/user/:id', user.get);
router.post('/user', user.create);
router.post('/user/:id', user.edit);
router.post('/login', user.login);
router.post('/logout', user.logout);

//-----------------Forgetpassword----------------
router.post('/forgetpassword', user.request_forgetpassword);
router.post('/retrievepassword', user.retrieve_password);


//-----------------Restaurant------------------

// pamars : (lng, lat) is the point of your location, range is the radius (km)
router.get('/restaurant/:lng/:lat/:distance',restaurant.getNearRestaurants);

router.post('/restaurant',restaurant.create);

router.get('/restaurant/:id', restaurant.get);

router.put('/restaurant/:id', restaurant.edit);

router.delete('/restaurant/:id', restaurant.delete);

//------------------Item------------------------

router.post('/item', item.create);

router.get('/item/:id', item.get);

router.get('/item/restaurant/:id', item.getByRestaurantId);

router.put('/item/:id', item.edit);

router.delete('/item/:id', item.delete);

//-------------------Order-----------------------
router.post('/order', order.create);

router.get('/order/:id', order.get);

router.post('/order/:id', order.edit);

router.get('/order/user/:id', order.getOrdersByUserId);

module.exports = router;























