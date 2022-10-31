
const moment = require('moment');   //Fecha al instante

const isDate = ( value , { req , location , path } ) => {

   if(!value){
        return false;
   }

   const fecha = moment( value );
   //Funcion de moment 
   if( fecha.isValid() ) {
        return true
   } else {
        return false
   } 


}


module.exports = {
    isDate
}