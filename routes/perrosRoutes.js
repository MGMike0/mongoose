const mongoose = require('mongoose');
const perrosMiddleware = require('../lib/perrosMiddleware');

const Perro = mongoose.model('perros');

module.exports = (app) =>{
	app.get('/', async (req, res) =>{
		res.send("mensaje: Hola");
	});

	app.get('/api/perros', async (req, res) =>{
	const perros = await Perro.find();
	res.send(perros);
	});

	app.get('/api/perros/:id', async (req, res) =>{
	
		try{
			const perros = await Perro.find({ _id: req.params.id });
			res.send(perros);
		}catch(error){
			res.send(error.message)
		};

	});


	app.post(
		'/api/perros',
		perrosMiddleware.datosCompletos,
		perrosMiddleware.datosPrimitivos, 
		perrosMiddleware.datosValidos, 
		async (req, res) => {

		const { nombre, raza, edad, vacunas } = req.body;

		const perro = new Perro({
			nombre, raza, edad, vacunas
		});
		const respuesta= await perro.save();
		res.send(respuesta);
	});

	app.post(
		'/api/perros/:id',
		perrosMiddleware.datosCompletos,
		perrosMiddleware.datosPrimitivos, 
		perrosMiddleware.datosValidos, 
		async (req, res) => {

		const { nombre, raza, edad, vacunas } = req.body;

		const respuesta= await Perro.findOneAndUpdate(
			{_id:req.params.id},
			{nombre, raza, edad, vacunas},
			{new: true}
		).exec();
		res.send(respuesta);
	});

	app.delete('/api/perros/:id', async(req, res) =>{
		try{
		const perros = await Perro.find({ _id: req.params.id });
		if(!perros) res.send("Perro no existe")
		const respuesta = await Perro.deleteOne({ _id: req.params.id });
		res.send(respuesta);
	}catch(error){
		res.send(error.message);
	}
	});
};	