App = {
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));	
		app.post('/evt',function(req,res){
			res.header("Content-Type", "application/json; charset=utf-8");
			
		});
		app.post('/sync',function(req,res) {
			
			res.header("Content-Type", "application/json; charset=utf-8");

			var Obj={success:false};
			var tables=[];
			var queries=[];
			var db=App.using('db');
			
			var uid=req.body.uid;
			if (!uid) {
				Obj.message="Unknown device ID";
				res.end(JSON.stringify(Obj,null,4));
				return;	
			};
			
			var update=req.body.update;
			if (update) {
				if (update.indexOf('T')==-1) Obj.message="Date must be in JSON Format";	
				if (update.indexOf('Z')==-1) Obj.message="Date must be in JSON Format";	
				if (Obj.message) {
					res.end(JSON.stringify(Obj,null,4));
					return;						
				} else {
					var TDate=update.split('Z')[0].replace('T',' ');
				}
			};

			function get(ndx,cb) {
				var param="";
				if (TDate) param=' WHERE modif>="'+TDate+'"'; 
				db.model("goprro",queries[ndx]+param,function(e,r){
					Obj[tables[ndx]]=r;
					if (ndx+1<tables.length) get(ndx+1,cb); else cb();
				});
			};	
			function total(ndx,cb) {
				var param="";
				var sql='SELECT count(*) K FROM '+tables[ndx];
				if (Obj.tables.indexOf(tables[ndx])==-1) Obj.tables.push(tables[ndx]);
				if (TDate) param=' WHERE modif>="'+TDate+'"'; 
				db.query("goprro",sql+param,function(e,r){
					Obj.data[tables[ndx]]=r[0].K;
					if (ndx+1<tables.length) total(ndx+1,cb); else cb();
				});
			};				
			
			var table=req.body.table;
			if (!table) {
				Obj.tables=[];
				Obj.data={};
				db.query("goprro",'SELECT * FROM devices WHERE IMEI="'+uid+'"',function(e,rr){
					if (rr.length==0) {
						Obj.message="Unknown device ID";
						res.end(JSON.stringify(Obj,null,4));
						return;						
					} else {
						var sql="SELECT nomTable,request FROM synchro";
						db.query("goprro",sql,function(e,r){
							for (var i=0;i<r.length;i++) {
								tables.push(r[i].nomTable);
								queries.push(r[i].request);
							};
							total(0,function(r) {
								Obj.success=true;
								res.end(JSON.stringify(Obj,null,4));	
							});				
						});					
					}
				});				
								
				return;
			};
			
			
			db.query("goprro",'SELECT * FROM devices WHERE IMEI="'+uid+'"',function(e,rr){
				if (rr.length==0) {
					Obj.message="Unknown device ID";
					res.end(JSON.stringify(Obj,null,4));
					return;						
				} else {
					if (table=="*") var sql="SELECT nomTable,request FROM synchro"; else var sql="SELECT nomTable,request FROM synchro WHERE nomTable='"+table+"'";
					db.query("goprro",sql,function(e,r){
						if (r.length==0) {							
							Obj.message="Table not found";
							res.end(JSON.stringify(Obj,null,4));
							return false;	
						};
						for (var i=0;i<r.length;i++) {
							tables.push(r[i].nomTable);
							queries.push(r[i].request);
						};
						get(0,function(r) {
							Obj.success=true;
							res.end(JSON.stringify(Obj,null,4));	
						});				
					});					
				}
			});
			

		});
	
	}
};

module.exports = App;