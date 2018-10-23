const mongoose = require('mongoose');
const perrosMiddleware = require('../lib/perrosMiddleware');
const { datosCompletos, datosPrimitivos } = perrosMiddleware;

const Perro = mongoose.model('perros');

module.exports = (app) =>{
	app.get('/', async (req, res) =>{
		res.send("mensaje: Hola");
	});

	app.get('/api/perros', async (req, res) =>{
	const perros = await Perro.find();
	res.send(perros);
	});


	app.post('/api/perros', datosCompletos, datosPrimitivos, async (req, res) => {

		const { nombre, raza, edad, vacunas } = req.body;

		const perro = new Perro({
			nombre, raza, edad, vacunas
		});
		const respuesta= await perro.save();
		res.send(respuesta);
	});

};	