Elements={
    delOuvrage: function(o,cb) {
        Elements.using('db').query("goprro","DELETE FROM oa_elements WHERE idOuvrage="+o,cb);
    },
    getAllByType: function(o,cb) {
        var db=Elements.using('db');
        var ff=[];
        var sql="SELECT idElement,parent,elements.idType_element,elements.nomElement FROM elements join types_elements on elements.idType_element=types_elements.idType where elements.idType="+o.type+" order by parent";
        var db=Elements.using('db');
        db.query("goprro",sql,function(e,r){
            console.log(e);
            var root=[];
            var obj={};
            for (var i=0;i<r.length;i++) {
                var id=r[i].idElement;
                var parent=r[i].parent;
                if (!obj[id]) obj[id]={
                    id: id,
                    name: "c"+id,
                    text: r[i].nomElement,
                    type_element: r[i].idType_element,
                    leaf: true
                };
                if (parent==0) root.push(obj[id]); else {
                    if (!obj[parent].children) {
                        obj[parent].children=[];
                        obj[parent].leaf=false;
                    };
                    obj[parent].children.push(obj[id]);
                }
            };

            cb(root);
        });
    },
    getSelect: function(items,idType,cb) {
        var db=Elements.using('db');
        var ff=[];
        var O={};
        var sql="SELECT idElement,parent,elements.idType_element,elements.nomElement,elements.modif FROM elements join types_elements on elements.idType_element=types_elements.idType where elements.idType="+idType+" order by parent";
        var db=Elements.using('db');
        db.query("goprro",sql,function(e,r){
            var root=[];
            var Root=[];
            var obj={};
            console.log(e);
            for (var i=0;i<r.length;i++) {
                var id=r[i].idElement;
                var parent=r[i].parent;
                if (!obj[id]) obj[id]={
                    id: id,
                    name: "c"+id,
                    text: r[i].nomElement,
                    leaf: true
                };
                O[id]={
                    id: id,
                    name: "c"+id,
                    text: r[i].nomElement,
                    parent: parent
                };
                if (parent==0) root.push(obj[id]); else {
                    if (!obj[parent].children) {
                        obj[parent].children=[];
                        obj[parent].leaf=false;
                    };
                    obj[parent].children.push(obj[id]);
                }
            };
            var i=1;

            var Obj=[];
            console.log(obj);

            if (!Array.isArray(items)) items=[
                items
            ];
            for (var z=0;z<items.length;z++) {
                var itemId=items[z];
                var objs=[];
                if (!obj[itemId].leaf) O[itemId].text="<b>"+O[itemId].text+"</b>";
                while (itemId!=0) {
                    objs.push(O[itemId]);
                    itemId=O[itemId].parent;
                };

                for (var i=objs.length-1;i>=0;i--) {
                    if (objs[i-1]) {
                        objs[i].leaf=false;
                        objs[i].children=[];
                        objs[i].id="c"+objs[i].id;
                    } else {
                        objs[i].leaf=true;
                        objs[i].id=Elements.using('shortid').generate();
                    };
                };


                for (var i=objs.length-1;i>=0;i--) Obj.push(objs[i]);
            };

            cb(Obj);

        });
    }
};

module.exports=Elements;