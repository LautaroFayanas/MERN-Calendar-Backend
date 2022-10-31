
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//Post para crear un nuevo usuario porque necesito postear info.

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');


router.post(
    '/new',
    [       //Que NO este VACIO.
        check('name', 'El nombre es obligatorio').not().isEmpty()  ,
        check('email', 'El email es obligatorio').isEmail() ,
        check('pass', 'El password debe ser de 6 caracters').isLength({ min: 6 }) ,
        validarCampos
    ],
    crearUsuario);


router.post(
    '/',[
        check('email', 'El email es obligatorio').isEmail() ,
        check('pass', 'El password debe ser de 6 caracters').isLength({ min: 6 }) ,
        validarCampos
    ],
    loginUsuario);

router.get( '/renew' , validarJWT , revalidarToken );


module.exports = router;
