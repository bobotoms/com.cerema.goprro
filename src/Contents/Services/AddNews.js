AddNews = {
	insert: function(o,cb) {
		//Elements.using('db').query("goprro",o,cb);	
        console.log("o");
        console.log(o);
        console.log("o");
        
        var mail = o['0'];
        var note = o['1'];
        
        console.log("mail");
        console.log(mail);
        
        console.log("note");
        console.log(note);
        
		Elements.using('db').query("goprro","INSERT INTO notes (dateNote, texteNote, idUser) VALUES (NOW(), '"+note+"', (select idUser from users where mail='"+mail+"'))",cb);
        
	}
}

module.exports = AddNews;