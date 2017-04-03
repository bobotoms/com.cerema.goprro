Visits = {
    select: function(o,cb) {
 		Visits.using('db').query("goprro","SELECT * FROM ouvrages left join familles on ouvrages.idFamille=familles.idFamille left join types on types.idType=ouvrages.idType left join geologies on geologies.idGeologie=ouvrages.idGeologie left join situations on situations.idSituation=ouvrages.idSituation left join acces on acces.idAcces=ouvrages.idAcces left join departements on departements.idDepartement=ouvrages.idDepartement WHERE departements.idDter = (SELECT idDter FROM users WHERE mail='"+o+"')"),function(err,result){
            if (!err) {
                    console.log("result");
                    console.log(result);
					cb(result);			
				} else {
                    console.log("err");
                    console.log(err);
                    var err=false;
					cb(err)			
				};
        });       
    },
 /*		var db=Ouvrages.using('db');
		db.model("goprro",db.sql("OAGetAll"),function(error,response){
            console.log('******* USER MAIL *****');
            console.log(response);
            response.metaData.fields.push({
                name: "select",
                type: "boolean"
            });
            for (var i=0;i<response.data.length;i++) {
                response.data[i].select="0";
            }
            cb(response);
        });       
    }*/
};

module.exports = Visits;