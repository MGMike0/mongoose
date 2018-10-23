module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;

		if(!nombre.trim()) res.send('Falta el nombre');
		if(!edad) res.send('Falta el edad');

		if(!vacunas) res.send('Faltan las vacunas');
		const { tetano, polio } = vacunas;


		if(!tetano.trim()) res.send('Falta la vacuna del tetano');
		if(!polio.trim()) res.send('Falta la vacuna del polio');

		next();
	};

	const datosPrimitivos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;
		
		if(typeof(nombre) != "string") res.send("validar nombre");
		if(typeof(edad) != "number") res.send("validar edad");
	};

	return {
		datosCompletos,
		datosPrimitivos
	}

})();