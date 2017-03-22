AddNews = {
	insert: function(o,cb) {
        
        var mail = o['0'];
        var note = o['1'];
                
		AddNews.using('db').query("goprro","INSERT INTO notes (dateNote, texteNote, idUser) VALUES (NOW(), '"+note+"', (select idUser from users where mail='"+mail+"'))",cb);
        
	}
}

module.exports = AddNews;



Officer.using('db').store('bpclight','select kage,nom,prenom from agents where kage in (select kage from mela where libmela="'+mail+'")',function(err,result){
				if (!err) {
					var response={
						lastname: result.data[0].nom,
						firstname: result.data[0].prenom,
						uid: result.data[0].kage,
						mail: mail,
						profiles: Officer.getProfile(mail.split('@')[0])
					};
					cb(response);			
				} else cb(err);
			});