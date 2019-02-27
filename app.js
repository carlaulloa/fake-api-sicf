const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();

const PORT = 8082;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*
app.post('/login', (req, res, next) => {
	let body = req.body;
	console.log(body);
	res.status(200).json({username: 'user-fake', token: 'ASdjdhsakjdhkad'});
});

app.post('/login2', (req, res, next) => {
	let body = req.body;
	console.log(body);
	res.status(401).json({message: 'Usuario incorrecto'});
});
*/
app.get('/api/clasesTransaccion', (req, res, next) => {
	res.status(200).json([{idClaseTransaccion: 2, descripcion:'DESCRIPCION DE PRUEBA'}]);
});

/*
app.post('/api/clasesTransaccion', (req, res, next) => {
	res.status(200).json({idClaseTransaccion: '123457', descripcion:'DESCRIPCION DE PRUEBA 2'});
});
*/

// este es una muestra de como vendran los errores desde el servidor, tambien deben validarse 
// en el cliente (angular app) de acuerdo a las definiciones en bd 
app.post('/api/clasesTransaccion', (req, res, next) => {
	res.status(400).json({
    "codigo": 1,
    "mensajeUsuario": "Entidad no procesable",
    "mensajeDesarrollador": null,
    "errorFormularioResponses": [
        {
            "codigoErrorCampo": "NotNull",
            "nombreCampo": "descripcion",
            "mensajeErrorCampo": "La descripción no debe ser nulo",
            "valorRechazadoCampo": null
        },
        {
            "codigoErrorCampo": "Range",
            "nombreCampo": "idClaseTransaccion",
            "mensajeErrorCampo": "El identificador debe estar entre 1 y 99999",
            "valorRechazadoCampo": 0
        },
        {
            "codigoErrorCampo": "NotBlank",
            "nombreCampo": "descripcion",
            "mensajeErrorCampo": "La descripción no debe contener solo espacios en blanco",
            "valorRechazadoCampo": ""
        }
    ]
});
});

app.put('/api/clasesTransaccion/:id', (req, res, next) => {
	let body = req.body;
	console.lo(body);
	res.status(200).json({idClaseTransaccion: body.idClaseTransaccion, descripcion: body.descripcion });
});

app.delete('/api/clasesTransaccion/:id', (req, res, next) => {
	res.status(204).send();
});

app.listen(PORT, () => {
	console.log(`App listening at ${PORT}`);
});

/*
Para cada recurso se definen 
get 
post
put 
delete
estos son endpoints de prueba deben modificarlo de acuerdo al recurso que deseen
si desean bines le cambian y tambien deben cambiar las salidas 
para correrlo abran la cmd en el directorio donde se encuentra este archivo
y usen el siguiente comando
	npm run start:dev 
por cada cambio que hagan se hara un restart
*/