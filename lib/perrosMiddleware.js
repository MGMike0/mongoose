module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;

		if(!nombre.trim()) res.send('Falta el nombre');
		if(!edad) res.send('Falta el edad');

		if(!vacunas) res.send('Faltan las vacunas');
		const { tetano, polio } = vacunas;


		if(!tetano) res.send('Falta la vacuna del tetano');
		if(!polio) res.send('Falta la vacuna del polio');

		next();
	};

	const datosPrimitivos = (req, res, next) => {
		const { nombre, edad, vacunas } = req.body;
		
		if(typeof(nombre) != "string") res.send("validar nombre");
		if(typeof(edad) != "number") res.send("validar edad");
		if(typeof(vacunas.tetano) != "string") res.send("Tetano debe de ser texto.");
		if(typeof(vacunas.polio) != "string") res.send("Polio debe de ser texto.");

		next();

	};

	const datosValidos = (req, res, next) => {
		const {nombre, edad, vacunas} = req.body;

		if(nombre.trim().length > 30) res.send("Maximo 30 caracteres para el nombre ");
		if(edad < 0 || edad > 30 ) res.send("Validar la edad");

		validarFecha(vacunas.polio  , res);
		validarFecha(vacunas.tetano  , res);

		next();
	};

	const validarFecha = (fecha, res) => {
		if(fecha.length != 8) res.send("Fecha con formato DDMMAAAA por favor");
		
		if(isNaN(parseInt(fecha))) res.send("Fecha no valida");

		let anio = fecha.substring(4);
		let mes = parseInt(fecha.substring(2,4)) -1 ;
		let dia = fecha.substring(0,2);
		let fecha_dada = new Date(anio, mes, dia);

		if(fecha_dada > new Date()) res.send("Fecha del futuro no se puede.");
		if(!(fecha_dada instanceof Date)) res.send("Fecha invalida");
		
		next();
	};

	return {
		datosCompletos,
		datosPrimitivos,
		datosValidos
	}

})();