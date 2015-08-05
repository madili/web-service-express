var db = require('../db_config.js');

exports.list = function(res){
	db.User.find({}, function(error, users){
		if (error) {
			res({error: 'Não foi possivel retornar a lista de usuarios'});
		} else {
			res(users);
		}
	});
};

exports.user = function(id, res){	
	db.User.findById(id, function(error, user){
		if (error) {
			res({error: 'Não foi possivel retornar o usuario'});
		} else {
			res(user);
		}
	});
};

exports.save = function(newUser, res){
	new db.User({
		fullname: newUser.fullname,
		email: newUser.email,
		password: newUser.password,
		create_at: new Date()
	}).save(function(error, user){
		if (error) {
			res({error: 'Não foi possivel salvar o usuario'});	
		} else {
			res(user);
		}
	});
};

exports.update = function(user, res){
	db.User.findById(user.id, function(error, user_db){
		if (error) {
			res({error: 'Não foi possivel recuperar o usuario para alterar'});
		} else {
			if (user.fullname) {
				user_db.fullname = user.fullname;
			}
			if (user.email) {
				user_db.email = user.email;
			}
			if (user.password) {
				user_db.password = user.password;
			}			
		}
		
		user_db.save(function(error, user1){
			if (error) {
				res({error: 'Não foi possivel salvar o usuario'});	
			} else {
				res(user1);
			}
		});
	});
};

exports.deletar = function(id, res){
	db.User.findById(id, function(error, user){
		if (error) {
			res({error: 'Não foi possivel retornar o usuario'});
		} else {
			user.remove(function(error){
				if (!error) {
					res({response: 'Usuario excluido com sucesso'});
				}
			});
		}
	});
};