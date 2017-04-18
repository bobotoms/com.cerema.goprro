AddNews = {
    insert: function(o,cb) {
        
        var idUser = o['0'];
        console.log("idUser");
        console.log(idUser);
        var diffusion = o['1'];
        console.log("diffusion");
        console.log(diffusion);
        var note = o['2'];
        console.log("note");
        console.log(note);
        var importance = o['3'];
        console.log("importance");
        console.log(importance);

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