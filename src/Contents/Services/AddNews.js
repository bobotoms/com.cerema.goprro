AddNews = {
	insert: function(o,cb) {
        
        var mail = o['0'];
        var note = o['1'];
                
		Elements.using('db').query("goprro","INSERT INTO notes (dateNote, texteNote, idUser) VALUES (NOW(), '"+note+"', (select idUser from users where mail='"+mail+"'))",cb);
        
	}
}

module.exports = AddNews;