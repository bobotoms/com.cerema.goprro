Visits = {
    select: function(o,cb) {
        
 		Visits.using('db').query("goprro","SELECT * FROM ouvrages left join familles on ouvrages.idFamille=familles.idFamille left join types on types.idType=ouvrages.idType left join geologies on geologies.idGeologie=ouvrages.idGeologie left join situations on situations.idSituation=ouvrages.idSituation left join acces on acces.idAcces=ouvrages.idAcces left join departements on departements.idDepartement=ouvrages.idDepartement WHERE departements.idDter = "+o,function(err,result){
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
    selectVisit: function(o,cb) {
                    console.log("o");
                    console.log(o);
 		Visits.using('db').query("goprro","SELECT * FROM campagne WHERE idGestionnaire = "+o,function(err,result){
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
    selectCampagne: function(o,cb) {
                    console.log("o");
                    console.log(o);
 		Visits.using('db').query("goprro","SELECT * FROM campagne WHERE idcampagne = "+o,function(err,result){
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
        
        var idUser = o['0'];
        var idCampagne = o['1'];
        console.log("idUser");
        console.log(idUser);
        console.log("idCampagne");
        console.log(idCampagne);
        
 		Visits.using('db').query("goprro","SELECT * FROM visite_ouvrages left join departements on departements.idDepartement=visite_ouvrages.idDepartement WHERE idCampagne = "+idCampagne+" AND idUser = "+idUser,function(err,result){
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
  	insertCampagne: function(o,cb) {
        var idUser = o['0'];
        console.log("idUser");
        console.log(idUser);
        var dateDebut = o['1'];
        console.log("datedebut");
        console.log(dateDebut);
        var dateFin = o['2'];
        console.log("datefin");
        console.log(dateFin);
        Visits.using('db').query("goprro","SELECT * FROM campagne WHERE dateDebut BETWEEN '"+dateDebut+"' AND  '"+dateFin+"' OR dateFin BETWEEN '"+dateDebut+"' AND  '"+dateFin+"' AND idGestionnaire = "+idUser,function(err,result){
            if (!err) {
                    console.log("result");
                    console.log(result);
                    console.log("result.length");
                    console.log(result.length);
                if (result.length === 0)
                {
                    
                    console.log("avant insert");
                    Visits.using('db').query("goprro","INSERT INTO campagne (idGestionnaire, dateDebut, dateFin) VALUES ("+idUser+", '"+dateDebut+"', '"+dateFin+"')",function(err,result){
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
                    console.log("err insert date periode");
                    console.log(err);
                    var err="periode";
					cb(err)			
				};
            } else {
                console.log("err select");
                console.log(err);
                var err=false;
                cb(err)			
            };
            });
        },
  	insert: function(o,cb) {
        
        var idUser = o['0'];
        var date = o['1'];
        var numOuvrage = o['2'];
        var idCampagne = o['3'];
        Visits.using('db').query("goprro","SELECT * FROM visite_ouvrages WHERE dateVisiteOuvrage = '"+date+"' AND idUser = "+idUser+" AND idOuvrage = '"+numOuvrage+"' AND idCampagne= "+idCampagne+"",function(err,result){
            if (!err) {
                if (result.length === 0)
                {
                    Visits.using('db').query("goprro","INSERT INTO visite_ouvrages (dateVisiteOuvrage, idUser, idOuvrage, idCampagne, idFamille, idType, idDepartement, idZone, idGeologie, idSituation, idAcces, nomOuvrage, etiquetteOuvrage, idGestionnaire, idMaitreOuvrage, idFournisseur, idPoseur, datePose, PRDebut, PRFin, PRSens, oa_x, oa_y, oa_z, materiel, modif, creation, actif, idVille, idAxe, longueur, hauteur, surface, id_gestionnaire, id_fournisseur, id_poseur, coupure_route, acces, materiels, txt_fournisseur, txt_poseur, txt_gestionnaire, _BLOB) SELECT '"+date+"', "+idUser+", idOuvrage, "+idCampagne+", idFamille, idType, idDepartement, idZone, idGeologie, idSituation, idAcces, nomOuvrage, etiquetteOuvrage, idGestionnaire, idMaitreOuvrage, idFournisseur, idPoseur, datePose, PRDebut, PRFin, PRSens, oa_x, oa_y, oa_z, materiel, modif, creation, actif, idVille, idAxe, longueur, hauteur, surface, id_gestionnaire, id_fournisseur, id_poseur, coupure_route, acces, materiels, txt_fournisseur, txt_poseur, txt_gestionnaire, _BLOB FROM ouvrages WHERE idOuvrage='"+numOuvrage+"'",function(err,result){
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
    delCampagneVisite: function(o,cb) {
        
        Visits.using('db').query("goprro","SELECT * FROM visite_ouvrages WHERE idCampagne = "+o,function(err,result){
            if (!err) {
                if (result.length === 0)
                {
                    Visits.using('db').query("goprro","DELETE FROM campagne WHERE idcampagne = "+o,function(err,result){
                         if (!err) {
                            var response=true;
                            cb(response);
                        } else {
                            var err=false;
                            cb(err)
                        };
                    });     
                }
                else {
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
    delCampagne: function(o,cb) {
 		Visits.using('db').query("goprro","DELETE FROM campagne WHERE idcampagne = "+o,function(err,result){
             if (!err) {
                var response=true;
                cb(response);
            } else {
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
    },
    updateOuvrageVisit: function(o,cb) {
        
        var idVisiteOuvrage= o['0'];
        var lambProj= o['1'];
        var oaX= o['2'];
        var oaY= o['3'];
        var lambX= o['4'];
        var lambY= o['5'];
        var lambZ= o['6'];
        var debut= o['7'];
        var fin= o['8'];
        var longueur= o['9'];
        var hauteur= o['10'];
        var surface= o['11'];
        var famille= o['12'];
        var type= o['13'];
        var vegetation= o['14'];
        var geologie= o['15'];
        var departement= o['16'];
        var typeAxe= o['17'];
        var axe= o['18'];
        var ville= o['19'];
        var ouvrage= o['20'];
        var etiquette= o['21'];
        var idGest= o['22'];
        var TxtGest= o['23'];
        var idFourn= o['24'];
        var TxtFourn= o['25'];
        var idPos= o['26'];
        var TxtPos= o['27'];
        var materiel= o['28'];
        var coupure= o['29'];
        var acces= o['30'];
        var blob= o['31'];
        
 		Visits.using('db').query("goprro","UPDATE visite_ouvrages SET idFamille = "+famille+", idType = "+type+", idDepartement = "+departement+", idGeologie = "+geologie+",  nomOuvrage = '"+ouvrage+"', etiquetteOuvrage = '"+etiquette+"', idGestionnaire = "+idGest+", idFournisseur = "+idFourn+", idPoseur = "+idPos+", PRDebut = '"+debut+"', PRFin = '"+fin+"', oa_x = '"+oaX+"', oa_y = '"+oaY+"', materiel = '"+materiel+"', idVille = "+ville+", idAxe = "+axe+", longueur = '"+longueur+"', hauteur = '"+hauteur+"', surface = '"+surface+"', id_gestionnaire = "+idGest+", id_fournisseur = "+idFourn+", id_poseur = "+idPos+", coupure_route = '"+coupure+"', acces = '"+acces+"', materiels = '"+materiel+"', txt_fournisseur = '"+TxtFourn+"', txt_poseur = '"+TxtPos+"', txt_gestionnaire = '"+TxtGest+"', _BLOB = '"+blob+"', oa_lambert_x = '"+lambX+"',  oa_lambert_y = '"+lambY+"', oa_lambert_z = '"+lambZ+"', oa_lambert_proj = '"+lambProj+"', idVegetation = '"+vegetation+"' WHERE idVisiteOuvrage='"+idVisiteOuvrage+"'",function(err,result){
             if (!err) {
                console.log("true");
                var response=true;
                cb(response);
            } else {
                console.log("false");
                console.log(err);
                var err=false;
                cb(err)
            };
        });       
    }
};

module.exports = Visits;