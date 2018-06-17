const express               = require('express');
const router                = express.Router();
const userController        = require('../controllers/user');
const validateUser          = require('../middlewares/validate_user');

router.post('/signin', validateUser.signin, userController.signin )

router.post('/signup', validateUser.signup, userController.signup )

module.exports              = router;