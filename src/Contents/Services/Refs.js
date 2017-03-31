Refs = {
    selectZones: function(o,cb) {
 		Refs.using('db').query("goprro","SELECT * FROM zones left join villes on zones.idVille=villes.idVille WHERE ville_departement = '"+o+"'",function(err,result){
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
    selectVilles: function(o,cb) {
 		Refs.using('db').query("goprro","SELECT idVille FROM villes WHERE nomVille = '"+o+"'",function(err,result){
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
    del: function(o,cb) {
        var tab = o['0'];
        var idTab = o['1'];
        var id = o['2'];
 		Refs.using('db').query("goprro","DELETE FROM "+tab+" WHERE "+idTab+" = "+id,function(err,result){
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

module.exports = Refs;