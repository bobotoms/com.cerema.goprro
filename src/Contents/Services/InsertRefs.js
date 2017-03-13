
InsertRefs = {
	insert: function(o,cb) {
        /*console.log("o");
        console.log(o);
        var nb = o[1].length;
        var table = o[0][0];
        var columns ='';
        var values ='';
        for (var i=0;i<nb;i++) {
                columns += o[1][i]+',';
                values += o[2][i]+',';
        }*/
		Elements.using('db').query("goprro",o,cb);	
	},
    columns: function(o,cb) {
        
		//Elements.using('db').query("goprro","SELECT * FROM COLUMNS WHERE TABLE_NAME="+o,cb);
		Elements.using('db').query("goprro","SHOW columns FROM "+o,cb);
	}
}

module.exports = InsertRefs;
