const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, getToken } = require('../controllers/auth');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-token');

const router = Router();

// create user
router.post('/new', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email no valid').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
    validFields
],newUser)

// login
router.post('/', [
    check('email', 'email no valid').isEmail(),
    check('password', 'password is required').isLength({ min: 6 }),
    validFields
],login )

// validate token
router.get('/renew', validJWT, getToken )



module.exports = router;