const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate');
const { getEventos,nuevoEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');

const router = Router();

//De esta manera le digo que todos los que estan por debajo de esta linea
//pasen por la validacion sin necesidad de ponerlo en cada router o peticion.
router.use(validarJWT);


//Obtener eventos
router.get('/', getEventos)


//Crear un nuevo evento
router.post('/', [
    check('title' , 'El itulo es obligatorio').not().isEmpty(),
    check('start' , 'La fecha de inicio es obligatoria').custom(isDate),
    check('end' , 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos
] , nuevoEvento)


//Actualizar evento
router.put('/:id', actualizarEvento)

//Eliminar evento
router.delete('/:id', eliminarEvento)

module.exports = router;