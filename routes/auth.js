const { Router } = require('express');
const { newUser, login, getToken } = require('../controllers/auth');

const router = Router();

// create user
router.post('/new', newUser)

// login
router.post('/', login )

// validate token
router.get('/renew', getToken )



module.exports = router;