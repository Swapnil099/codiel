const express = require('express');
// const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');


router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));
router.use('/search',require('./search'));


console.log("router loaded");

module.exports=router;