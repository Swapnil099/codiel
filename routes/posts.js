const express = require('express');
const router  = express.Router();
const postsController = require('../controllers/posts_controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('back');
}

router.post('/create-post',checkAuthentication,postsController.create_post);
router.get('/delete-post/:id',checkAuthentication,postsController.delete_post);

module.exports = router;