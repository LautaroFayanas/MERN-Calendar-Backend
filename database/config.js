
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

      await mongoose.connect(process.env.DBConection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('DB ONLINE');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD')
    }


}

module.exports = { 
    dbConnection
}