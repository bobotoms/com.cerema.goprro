AddNews = {
    insert: function(o,cb) {
        
        var idUser = o['0'];
        var diffusion = o['1'];
        var note = o['2'];
        var importance = o['3'];

        AddNews.using('db').query("goprro","INSERT INTO notes (dateNote, diffusion, texteNote, importance, idUser) VALUES (NOW(), "+diffusion+", '"+note+"', '"+importance+"', "+idUser+")",function(err,result){
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