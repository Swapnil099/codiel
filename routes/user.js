const express = require('express');
const router  = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.sign_up);
router.get('/sign-in',userController.sign_in);
router.get('/sign-out',userController.sign_out);
router.post('/create-user',userController.create_user);
router.post('/create-session',userController.create_session);


module.exports = router;