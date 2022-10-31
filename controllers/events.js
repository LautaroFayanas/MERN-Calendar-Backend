const { response } = require('express');
const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        eventos
    })

}


const nuevoEvento = async (req, res = response) => {


    const evento = new Evento(req.body)

    try {

        evento.user = req._id;
        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    //Verefico que tengo el evento
    console.log(req.body);

}

const actualizarEvento = async (req, res = response) => {

    const eventoID = req.params.id;
    const _id = req._id;

    try {

        const evento = await Evento.findById(eventoID);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }

        if(evento.user.toString() !== _id){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene previlegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: _id
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoID , nuevoEvento , { new: true } );

        res.json({
            ok:true,
            eventoActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async (req, res = response) => {


    const eventoID = req.params.id;
    const _id = req._id;

    try {

        const evento = await Evento.findById(eventoID);

        if (!evento) {
           return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }

        if(evento.user.toString() !== _id){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene previlegio de eliminar este evento'
            })
        }

        const eventoActualizado = await Evento.findByIdAndDelete( eventoID );

        res.json({
            ok:true,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    getEventos,
    nuevoEvento,
    actualizarEvento,
    eliminarEvento
}


