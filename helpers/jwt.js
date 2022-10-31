const jwt = require('jsonwebtoken');

const generarJWT = ( _id , name ) => {

    return new Promise ((resolve , rejet) => {
            
        const payload = { _id , name };

        //Asignar el jwt
        jwt.sign( payload , process.env.secret_jwt_seed , {
            expiresIn: '90h'
        } , ( err , token ) => {

            if(err){
                console.log(err);
                rejet('No se pudo generar el Token');
            }

            resolve( token );

        })



    })



}

module.exports = {
    generarJWT,
}