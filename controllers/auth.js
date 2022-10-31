//De Express extraigo la response
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    const { name, email, pass } = req.body;

    try {

        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya es existente con ese email'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar Password
        const salt = bcrypt.genSaltSync();
        usuario.pass = bcrypt.hashSync(pass, salt);

        await usuario.save();

        //Si todo salio bien , Generamos el Token.
        const token = await generarJWT(usuario._id, usuario.name)

        res.status(201).json({
            ok: true,
            _id: usuario._id,
            name: usuario.name,
            token

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


const loginUsuario = async (req, res = response) => {

    const { email, pass } = req.body

    try {

        let usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Confirmar passwords
        const validPassword = bcrypt.compareSync(pass, usuario.pass);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valida'
            })
        }

        //Si todo salio bien , Generamos el Token.
        const token = await generarJWT(usuario._id, usuario.name)

        res.json({
            ok: true,
            _id: usuario._id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


const revalidarToken = async (req, res = response) => {

   const { _id , name } = req;

    const token = await generarJWT( _id, name )


    res.json({
        ok: true,
        _id, name ,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}