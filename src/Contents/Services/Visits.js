Visits = {
    select: function(o,cb) {
        console.log('******* USER MAIL *****');
        var mail = Auth.User.mail;
        console.log("******* MAIL SELECT *******");
        console.log(mail);
        console.log('******* USER MAIL *****');
        var mail = o;
 		Refs.using('db').query("goprro","SELECT idUser FROM users WHERE mail='"+mail+"'",function(err,result){
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