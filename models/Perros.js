const mongoose = require('mongoose');
const { Schema } = mongoose;

const perroSchema = new Schema({
	nombre: String,
    raza: {
    	type:String,
    	default:'Solovino'
    },

    edad: Number,
    vacunas: {
        tetano: String,
        polio: String
    }
});

mongoose.model('perros', perroSchema);