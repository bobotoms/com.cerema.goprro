
InsertRefs = {
	insert: function(o,cb) {
        var tabName = o['0'];
        var columns = o['1'];
        var values = o['2'];
        //var reqSql = "INSERT INTO "+tabName+" ("+columns+") VALUES ("+values+")";
		InsertRefs.using('db').query("goprro","INSERT INTO "+tabName+" ("+columns+") VALUES ("+values+")",function(err,result){
				if (!err) {
                    var response=true;
					cb(response);			
				} else {
                    var err=false;
					cb(err)			
				};
			});	
	},
    columns: function(o,cb) {
        
		//Elements.using('db').query("goprro","SELECT * FROM COLUMNS WHERE TABLE_NAME="+o,cb);
		InsertRefs.using('db').query("goprro","SHOW columns FROM "+o,cb);
	}
}

module.exports = InsertRefs;
