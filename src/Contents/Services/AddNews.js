AddNews = {
    insert: function(o,cb) {
        
        var idUser = o['0'];
        var diffusion = o['1'];
        var note = o['2'];
        var importance = o['3'];

        console.log("idUser");
        console.log(idUser);
        console.log("note");
        console.log(note);
        console.log("dif");
        console.log(diffusion);
        console.log("importance");
        console.log(importance);
        
        AddNews.using('db').query("goprro","INSERT INTO notes (dateNote, diffusion, texteNote, importance, idUser) VALUES (NOW(), "+diffusion+", '"+note+"', '"+importance+"', "+idUser+")",function(err,result){
            if (!err) {
                console.log("result");
                console.log(result);
                var response=true;
                cb(response);
            } else {
                console.log("err");
                console.log(err);
                var err=false;
                cb(err)
            };
        });

    }
}

module.exports = AddNews;