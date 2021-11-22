const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('back');
}

router.post('/create',checkAuthentication,commentController.create_comment);
router.get('/delete/:id',checkAuthentication,commentController.delete_comment);

module.exports = router;