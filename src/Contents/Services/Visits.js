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
    selectDept: function(o,cb) {
                    console.log("o");
                    console.log(o);
 		Visits.using('db').query("goprro","SELECT nomDepartement FROM departements WHERE codeDepartement = "+o,function(err,result){
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
    updateOuvrageVisit: function(o,cb) {
        
        console.log("idVisiteOuvrage");
        var idVisiteOuvrage= o['0'];
        console.log(idVisiteOuvrage);
        console.log("longitude");
        var longitude= o['1'];
        console.log(longitude);
        console.log("latitude");
        var latitude= o['2'];
        console.log(latitude);
        console.log("debut");
        var debut= o['3'];
        console.log(debut);
        console.log("fin");
        var fin= o['4'];
        console.log(fin);
        console.log("longueur");
        var longueur= o['5'];
        console.log(longueur);
        console.log("hauteur");
        var hauteur= o['6'];
        console.log(hauteur);
        console.log("surface");
        var surface= o['7'];
        console.log(surface);
        console.log("famille");
        var famille= o['8'];
        console.log(famille);
        console.log("type");
        var type= o['9'];
        console.log(type);
        console.log("departement");
        var departement= o['10'];
        console.log(departement);
        console.log("geologiel");
        var geologie= o['11'];
        console.log(geologie);
        console.log("axe");
        var axe= o['12'];
        console.log(axe);
        console.log("ville");
        var ville= o['13'];
        console.log(ville);
        console.log("zone");
        var zone= o['14'];
        console.log(zone);
        console.log("ouvrage");
        var ouvrage= o['15'];
        console.log(ouvrage);
        console.log("etiquette");
        var etiquette= o['16'];
        console.log(etiquette);
        console.log("idGest");
        var idGest= o['17'];
        console.log(idGest);
        console.log("TxtGest");
        var TxtGest= o['18'];
        console.log(TxtGest);
        console.log("idFourn");
        var idFourn= o['19'];
        console.log(idFourn);
        console.log("TxtFourn");
        var TxtFourn= o['20'];
        console.log(TxtFourn);
        console.log("idPos");
        var idPos= o['21'];
        console.log(idPos);
        console.log("TxtPos");
        var TxtPos= o['22'];
        console.log(TxtPos);
        console.log("materiel");
        var materiel= o['23'];
        console.log(materiel);
        console.log("coupure");
        var coupure= o['24'];
        console.log(coupure);
        console.log("acces");
        var acces= o['25'];
        console.log(acces);
        
        //, oa_z = '"++"'
        //, idSituation = '"++"'
        //, idAcces = '"++"',
        // , idMaitreOuvrage = '"++"'
        //, datePose = '"++"'
        //, PRSens = '"++"'
        
        //, modif = '"++"'
        //, creation = '"++"'
        //, actif = '"++"'
        
        //, materiel = '"+materiel+"     ?
        //, materiels = '"+materiel+"'   ?
                console.log("avant sql");
 		Visits.using('db').query("goprro","UPDATE visite_ouvrages SET idFamille = "+famille+", idType = "+type+", idDepartement = "+departement+", idZone = "+zone+", idGeologie = "+geologie+",  nomOuvrage = '"+ouvrage+"', etiquetteOuvrage = '"+etiquette+"', idGestionnaire = "+idGest+", idFournisseur = "+idFourn+", idPoseur = "+idPos+", PRDebut = '"+debut+"', PRFin = '"+fin+"', oa_x = '"+latitude+"', oa_y = '"+longitude+"', materiel = '"+materiel+"', idVille = "+ville+", idAxe = "+axe+", longueur = '"+longueur+"', hauteur = '"+hauteur+"', surface = '"+surface+"', id_gestionnaire = "+idGest+", id_fournisseur = "+idFourn+", id_poseur = "+idPos+", coupure_route = '"+coupure+"', acces = '"+acces+"', materiels = '"+materiel+"', txt_fournisseur = '"+TxtFourn+"', txt_poseur = '"+TxtPos+"', txt_gestionnaire = '"+TxtGest+"' WHERE idVisiteOuvrage='"+idVisiteOuvrage+"'",function(err,result){
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