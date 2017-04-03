
Ouvrages = {
    getAll: function(o,cb) {
        var db=Ouvrages.using('db');
        db.model("goprro",db.sql("OAGetAll"),cb);
    },
    select: function(o,cb) {
        /*
        console.log("user mail");
        var mail = Auth.User.mail;
        console.log(mail);
        */
 		var db=Ouvrages.using('db');
		db.model("goprro",db.sql("OAGetAll"),function(error,response){
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
};

module.exports = Ouvrages;