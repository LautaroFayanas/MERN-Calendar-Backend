const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req , res = response , next ) => {

    //x-token HEADERS
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(400).json({
            ok: false,
            msg: 'No hay token en la validacion'
        });
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.secret_jwt_seed
        )

        req._id = payload._id;
        req.name = payload.name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
        
    }

    
    next();
}


module.exports={
    validarJWT,
}