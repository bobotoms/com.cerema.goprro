AddNews = {
	insert: function(o,cb) {
		//Elements.using('db').query("goprro",o,cb);	
        console.log("o");
        console.log(o);
        console.log("o");
		Elements.using('db').query("goprro","INSERT INTO notes (dateNote, texteNote, idUser) VALUES (NOW(), '"+o+"', 1)",cb);
        
	}
}

module.exports = AddNews;