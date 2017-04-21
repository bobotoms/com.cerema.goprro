GPS={
    convert: function(proj,xLambertII,yLambertII,cb) {
        var Proj4js = GPS.using("proj4");
        var projkt={};
        if (!proj) {
            cb(false);
            return;
        };
        if (!xLambertII) {
            cb(false);
            return;
        };
        if (!yLambertII) {
            cb(false);
            return;
        };
        GPS.using('db').query('goprro','select * from projections',function(e,r) {
            for (var i=0;i<r.length;i++) {
                Proj4js.defs('EPSG:'+r[i].epsg,r[i].projection_value);
                projkt[r[i].idprojections]='EPSG:'+r[i].epsg;
            };
            var source = new Proj4js.Proj(projkt[proj]); //Lambert II
            var destination = new Proj4js.Proj('EPSG:4326'); //Lat Long

            var point = new Proj4js.toPoint([xLambertII, yLambertII]);
            var latLon = Proj4js.transform(source, destination, point);

            console.log(latLon);
            cb(latLon);
        });

    }
};

module.exports=GPS;