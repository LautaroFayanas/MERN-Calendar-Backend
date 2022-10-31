const { Schema , model } = require('mongoose');

const EventoSchema = Schema({
   
    title: {
        type: String,
        required: true,
    },

    notes: {
        type: String
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    user: {
        // Este type le dice a Mongoose que el type sera una refencia, y abajo aclaro la referencia
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    }

})

EventoSchema.method('toJSON' , function(){
    const {__v , _id , ...object} = this.toObject();
    object.id = _id;
    return object
    
})

module.exports = model('Evento' , EventoSchema );