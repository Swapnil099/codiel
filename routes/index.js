const { application } = require('express');
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const signUpController = require('../controllers/sign_up_controller');
const signUInontroller = require('../controllers/sign_in_controller');


router.get('/',homeController.home);
router.get('/sign_up',signUpController.sign_up);
router.get('/sign_in',signUInontroller.sign_in);
router.use('/users',require('./users'));


console.log("router loaded");

module.exports=router;