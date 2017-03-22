AddNews = {
	insert: function(o,cb) {
		Elements.using('db').query("goprro",o,cb);	
	}
}

module.exports = AddNews;