AddNews = {
	insert: function(o,cb) {
        
        var mail = o['0'];
        var note = o['1'];
                
		//AddNews.using('db').query("goprro","INSERT INTO notes (dateNote, texteNote, idUser) VALUES (NOW(), '"+note+"', (select idUser from users where mail='"+mail+"'))",cb);
		AddNews.using('db').query("goprro","INSERT INTO notves (dateNote, texteNote, idUser) VALUES (NOW(), '"+note+"', (select idUser from users where mail='"+mail+"'))",function(err,result){
				if (!err) {
                    var response=true;
					cb(response);			
				} else {
                    var err=false;
					cb(err)			
				};
			});
        
	}
}

module.exports = AddNews;