const { response } = require('express');
const { validationResult } = require('express-validator');

//Next es un callback
const validarCampos = ( req , res = response , next ) => {

    //Manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    //Si no tenemos errores llamamos al Next !
    next();

}

module.exports = {
    validarCampos
}