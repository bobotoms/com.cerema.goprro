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
        Visits.using('db').query("goprro","SELECT * FROM visite_ouvrages WHERE dateVisiteOuvrage = '"+date+"' AND idUser = (select idUser from users where mail='"+mail+"') AND idOuvrage = '"+numOuvrage+"'",function(err,result){
            if (!err) {
                if (result.length === 0)
                {
                    Visits.using('db').query("goprro","INSERT INTO visite_ouvrages (dateVisiteOuvrage, idUser, idOuvrage, idFamille, idType, idDepartement, idZone, idGeologie, idSituation, idAcces, nomOuvrage, etiquetteOuvrage, idGestionnaire, idMaitreOuvrage, idFournisseur, idPoseur, datePose, PRDebut, PRFin, PRSens, oa_x, oa_y, oa_z, materiel, modif, creation, actif, idVille, idAxe, longueur, hauteur, surface, id_gestionnaire, id_fournisseur, id_poseur, coupure_route, acces, materiels, txt_fournisseur, txt_poseur, txt_gestionnaire, _BLOB) SELECT '"+date+"', (select idUser from users where mail='"+mail+"'), idOuvrage, idFamille, idType, idDepartement, idZone, idGeologie, idSituation, idAcces, nomOuvrage, etiquetteOuvrage, idGestionnaire, idMaitreOuvrage, idFournisseur, idPoseur, datePose, PRDebut, PRFin, PRSens, oa_x, oa_y, oa_z, materiel, modif, creation, actif, idVille, idAxe, longueur, hauteur, surface, id_gestionnaire, id_fournisseur, id_poseur, coupure_route, acces, materiels, txt_fournisseur, txt_poseur, txt_gestionnaire, _BLOB FROM ouvrages WHERE idOuvrage='"+numOuvrage+"'",function(err,result){
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
                else {
                    console.log("err");
                    console.log(err);
                    var err=false;
					cb(err)			
				};
            } else {
                console.log("err");
                console.log(err);
                var err=false;
                cb(err)			
            };
            });
        },
    delOuvrageVisit: function(o,cb) {
 		Visits.using('db').query("goprro","DELETE FROM visite_ouvrages WHERE idVisiteOuvrage = "+o,function(err,result){
             if (!err) {
                var response=true;
                cb(response);
            } else {
                var err=false;
                cb(err)
            };
        });       
    }
};

module.exports = Visits;