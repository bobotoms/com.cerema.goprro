Visits = {
    select: function(o,cb) {
 		Visits.using('db').query("goprro","SELECT * FROM ouvrages left join familles on ouvrages.idFamille=familles.idFamille left join types on types.idType=ouvrages.idType left join geologies on geologies.idGeologie=ouvrages.idGeologie left join situations on situations.idSituation=ouvrages.idSituation left join acces on acces.idAcces=ouvrages.idAcces left join departements on departements.idDepartement=ouvrages.idDepartement WHERE departements.idDter = (SELECT idDter FROM users WHERE mail='"+o+"')",function(err,result){
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
    }
    ,
    selectVisit: function(o,cb) {
 		Visits.using('db').query("goprro","SELECT dateVisiteOuvrage FROM visite_ouvrages WHERE idUser = (select idUser from users where mail='"+o+"') GROUP BY dateVisiteOuvrage",function(err,result){
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
    selectVisitDate: function(o,cb) {
        
        var mail = o['0'];
        var date = o['1'];
        console.log("mail");
        console.log(mail);
        console.log("date");
        console.log(date);
        
 		Visits.using('db').query("goprro","SELECT * FROM visite_ouvrages WHERE dateVisiteOuvrage = '"+date+"' AND idUser = (select idUser from users where mail='"+mail+"')",function(err,result){
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
        
	insert: function(o,cb) {
        
        var mail = o['0'];
        var date = o['1'];
        var numOuvrage = o['2'];
        console.log("mail");
        console.log(mail);
        console.log("date");
        console.log(date);
        console.log("numOuvrage");
        console.log(numOuvrage);
                
        /**************** ici on récupère le numero de user + la date de la vis1te 
        on vérife dans la table visite si un numèro similaire existe déja si non on rajoute au bout 01 si oui on récupère le numèro le plus élevé et on rajoute 1.
        ensuite on enregsitre dans la table viste_ouvrage l'ouvrage selectionné en lui attribuant le numero créé juste avant.
        enfin on affiche la table
        ***********************************/
        Visit.using('db').query("goprro","INSERT INTO visite_ouvrages (dateVisiteOuvrage, idUser, nomOuvrage) VALUES ('"+date+"', (select idUser from users where mail='"+mail+"'), (select nomOuvrage from ouvrages where idOuvrage='"+numOuvrage+"'))",function(err,result){
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
		/*AddVisit.using('db').query("goprro","INSERT INTO notes (dateNote, texteNote, idUser) VALUES (NOW(), '"+note+"', (select idUser from users where mail='"+mail+"'))",function(err,result){
				if (!err) {
                    var response=true;
					cb(response);			
				} else {
                    var err=false;
					cb(err)			
				};
			});*/
        /*
        select: function(o,cb) {
            var db=Visit.using('db');
            db.model("goprro",db.sql("SELECT * FROM axes"),function(error,response){
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
        }
        */
	}
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