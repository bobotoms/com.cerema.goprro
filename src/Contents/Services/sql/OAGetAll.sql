SELECT * FROM ouvrages 
	left join familles on ouvrages.idFamille=familles.idFamille 
    left join types on types.idType=ouvrages.idType
    left join geologies on geologies.idGeologie=ouvrages.idGeologie
    left join situations on situations.idSituation=ouvrages.idSituation
    left join acces on acces.idAcces=ouvrages.idAcces
    left join departements on departements.idDepartement=ouvrages.idDepartement
