var app = require('./config.js');
var userController = require('./controller/userController.js');

//Valida o envio do body
var validator = require('validator');

//Urls hash
app.get('/', function(req, res){
	res.end('Servidor ON!');
});

//Busca todos os usuarios
app.get('/users', function(req, res){	
	userController.list(function(user){
		res.json(user);
	});
});

//Busca o usuario pelo id do banco
app.get('/users/:id', function(req, res){
	//express deprecated req.param(name): Use req.params, req.body, or req.query instead
	var id = validator.trim(validator.escape(req.params.id));
	
	userController.user(id, function(user){
		res.json(user);
	});
});

//Cria um novo usuario
app.post('/users', function(req, res){
	//req.body.* recupera as propriedades do objeto
	var newUser = {
		fullname: validator.trim(validator.escape(req.body.fullname)),
		email: validator.trim(validator.escape(req.body.email)),
		password: validator.trim(validator.escape(req.body.password)),
	};
	
	userController.save(newUser, function(user) {
		res.json(user);
	});
		
});

//Modifica usuarios já cadastrados
app.put('/users', function(req, res){
	//Localiza o id do banco e altera as propriedades se existirem
	var user = {
		id: validator.trim(validator.escape(req.body.id)),	
		fullname: validator.trim(validator.escape(req.body.fullname)),	
		email: validator.trim(validator.escape(req.body.email)),
		password: validator.trim(validator.escape(req.body.password)),	
	};	
	
	userController.update(user, function(resp){
		res.json(resp);
	});
});

//Deleta o usuario
app.delete('/users/:id', function(req, res){
	//express deprecated req.param(name): Use req.params, req.body, or req.query instead
	var id = validator.trim(validator.escape(req.params.id));
	
	userController.deletar(id, function(resp){
		res.json(resp);
	});
});