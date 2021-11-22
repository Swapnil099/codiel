const express = require('express');
const router  = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/sign-in');
}


router.get('/profile',checkAuthentication,userController.profile);

router.get('/show-profile/:id',checkAuthentication,userController.show_user);

router.get('/sign-up',userController.sign_up);

router.get('/sign-in',userController.sign_in);

router.get('/sign-out',userController.destroy_session);

router.post('/create-user',userController.create_user);

router.post('/create-session', passport.authenticate(
    "local",
    {failureRedirect: '/user/sign-in'},
),userController.create_session);

router.get('/timeline',checkAuthentication,userController.timeline);

router.get('/search',checkAuthentication,userController.search);





module.exports = router;