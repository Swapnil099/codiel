const express = require('express');
const router = express.Router();
const search_controller = require('../controllers/search_controller'); 

router.post('/search-user',search_controller.searchUser);


module.exports = router;