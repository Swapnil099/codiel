const express = require('express');
const router = express.Router();
const posts_api = require('../../../controllers/api/v1/post_api');
const passport = require('passport');

router.delete('/:id',passport.authenticate('jwt',{session:false}),posts_api.delete_post);

module.exports = router;