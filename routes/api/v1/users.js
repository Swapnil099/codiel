const express = require('express');
const router = express.Router();
const users_api = require('../../../controllers/api/v1/users_api');

router.get('/users-data',users_api.send_users_data);
router.post('/create-session',users_api.create_session);


module.exports = router;