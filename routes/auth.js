const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, getToken } = require('../controllers/auth');

const router = Router();

// create user
router.post('/new', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email no valid').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
],newUser)

// login
router.post('/', [
    check('email', 'email no valid').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),

],login )

// validate token
router.get('/renew', getToken )



module.exports = router;