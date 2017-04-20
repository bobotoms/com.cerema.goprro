var TMap={};

function hideForms() {
    var form=App.get('mainform panel#CPanel');
    for (var i=0;i<form.items.length;i++) form.items.items[i].hide();
};

function GMap(l,m)
{

    TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
        zoom: 10,
        center: new google.maps.LatLng('43.299999','5.4'),
        mapTypeId: google.maps.MapTypeId.MAP
    });

    google.maps.event.trigger(TMap.map, 'resize');
    TMap.markers=[];
    TMap.setMarker=function(l,m,title,idOuvrage, color, param) {
        
        var marker=new google.maps.Marker({
            position: new google.maps.LatLng(l,m),
            animation: google.maps.Animation.DROP,
            title: title,
            itemId: idOuvrage
        });
        marker.setZIndex(0);
        if (color == "colorMarker")
        {
            marker.setZIndex(1);
            marker.setIcon('http://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Marker-Outside-Chartreuse-icon.png');
        }
        marker.setMap(TMap.map);
        
        
        if (param == "visit")
        {
            marker.addListener('click', function(x) {
                var form=App.get("mainform panel#Work");
                form.idOuvrage=this.itemId;
                form.show();
            });
        }
        else if (param == "workvisit")
        {
            marker.addListener('click', function(x) {
                var form=App.get("mainform panel#UpWork");
                form.idVisiteOuvrage=this.itemId;
                form.show();
            });
        }
        else if (param == "addvisit")
        {
            marker.addListener('click', function(x) {
                var form=App.get("mainform panel#AddWork");
                form.idOuvrage=this.itemId;
                form.show();
            });
        }
        else
        {
            marker.addListener('click', function(x) {
                hideForms();
                var form=App.get("mainform panel#Saisie");
                form.idOuvrage=this.itemId;
                form.show();
            });
        }
        TMap.markers.push(marker);
        return marker;
  
    };
    TMap.clearMarkers=function() {
        
        for (var i = 0; i < TMap.markers.length; i++) {
            TMap.markers[i].setMap(null);
        }
    };

    App.DB.get("goprro://ouvrages{idOuvrage,oa_x,oa_y,nomOuvrage,idOuvrage}",function(r) {
   // App.DB.get("goprro://ouvrages{oa_x,oa_y,nomOuvrage,idOuvrage}",function(r) {
        console.log("r map");
        console.log(r);
        for (var i=0;i<r.data.length;i++) {
            TMap.setMarker(r.data[i].oa_y,r.data[i].oa_x,r.data[i].nomOuvrage,r.data[i].idOuvrage);
        }
    });
  
};

App.controller.define('CMain', {

    views: [
        "VMain",
        "VSaisie",
        "VAddItem",
        "VShowDoc",
        "Settings.VCharacteristics",
        "Settings.VRefs",
        "References.VAxes",
        "References.VFamilles",
        "References.VFournisseurs",
        "References.VGeologies",
        "References.VGestionnaires",
        "References.VPoseurs",
        "References.VTypes",
        "References.VZones",
        "VAddVisit",
        "VVisit",
        "VVisitWork",
        "VAddVisitWork",
        "VUpVisitWork",
        "VDate",
        "VAddVisitItem"
    ],

    models: [
    ],

    init: function()
    {
        var p=this;

        this.control({
            "menu>menuitem": {
                click: "Menu_onClick"
            },
            "button#clickme": {
                click: "clickme_onclick"
            },
            "mainform grid#gridO": {
                itemdblclick: "gridO_select"
            },
            "mainform button#ecrire": {
                click: "click_news"
            },
            "VSaisie": {
                show: "VSaisie_onShow"
            },
            "VSaisie combo#dpt": {
                select: "dpt_onselect"
            },
            "VSaisie combo#ville": {
                select: "ville_onselect"
            },
            "VSaisie combo#famille": {
                select: "famille_select"
            },
            "VSaisie button#add_item": {
                click: "add_item_click"
            },
            "VSaisie uploadfilemanager#up": {
                itemdblclick: "up_onclick"
            },
            "VUpVisitWork uploadfilemanager#up": {
                itemdblclick: "up_onclick"
            },
            "VSaisie treepanel": {
                beforeedit: "treeSaisie_beforeedit",
                itemclick: "treeSaisie_click"
            },
            "VUpVisitWork treepanel": {
                beforeedit: "treeSaisie_beforeedit",
                itemclick: "treeSaisie_click"
            },
            "VSaisie button#Record": {
                click: "new_ouvrage_record"
            },
            "VSaisie propertygrid": {
                edit: "propertygrid_edit"
            },
            "VAddItem": {
                show: "VAddItem_onShow"
            },
            "VAddVisitItem": {
                show: "VAddVisitItem_onShow"
            },
            "VAddItem button#AddItem": {
                click: "AddItem_click"
            },
            "VAddItem button#RemoveItem": {
                click: "RemoveItem_click"
            },
            "VAddVisitItem button#AddItem": {
                click: "AddItem_click"
            },
            "VAddVisitItem button#RemoveItem": {
                click: "RemoveItem_click"
            },
            "VAddItem button#validate": {
                click: "validate_catalog"
            },
            "VAddVisitItem button#validate": {
                click: "validate_visit_catalog"
            },
            "VCharacteristics combo#cboType": {
                select: "charact_cbotype_select"
            },
            "VCharacteristics combo#cboFamille": {
                select: "charact_cboFamille_select"
            },
            "VCharacteristics treepanel#T0": {
                itemclick: "treeT0_click"
            },
            "VCharacteristics grid#T1": {
                edit: "charact_grid_edit"
            },
            "VCharacteristics button#add": {
                click: "charact_validate_click"
            },
            "VAddNews button#addNews": {
                click: "add_news"
            },
            "VRefs combo#cboRefs": {
                select: "ref_cboRefs_select"
            },
            "VZones combo#cboDepartements": {
                select: "cboDepartements_select"
            },
            "VZones grid#T1": {
                beforeedit: "combo_villes_beforeedit"
            },
            "VRefs button#addRef": {
                click: "add_ref"
            },
            "VRefs button#delRef": {
                click: "del_ref"
            },
            "VRefs grid#T1": {
                edit: "ref_grid_edit"
            },
            "VVisit combo#idCampagne": {
                select: "showVisitDate"
            },
			"VAddVisit button#VisitRecord": {
				click: "add_visit"	
			},
            "VAddVisit grid#gridVisitAdd": {
                itemdblclick: "add_visit_select"
            },
            "VVisit grid#gridVisit": {
                itemdblclick: "visit_select"
            },
            "VAddVisit":{
                show: "showMapAddV"
            },
            "VVisit":{
                show: "showMapV"
            },
            "mainform":{
                show: "showMapIndex"
            },
            "VVisitWork": {
                show: "VSaisie_onShow"
            },
            "VAddVisitWork": {
                show: "VSaisie_onShow"
            },
            "VUpVisitWork": {
                show: "VVisit_onShow"
            },
            "VAddVisit checkbox#select":{
                click: "checkColumnAddV"
            },
            "VAddVisitWork button#addVisitWork": {
                click: "add_visit_work"
            },
            "VVisitWork button#visitWork": {
                click: "VDate_onShow"
            },
            "VDate button#visitWorkDate": {
                click: "visit_work"
            },
            "VAddVisit checkcolumn#select": {
                checkchange: "add_visit_check"
            },
            "VUpVisitWork button#Record": {
                click: "new_visit_ouvrage_record"
            },
            "VUpVisitWork button#add_item": {
                click: "add_visit_item_click"
            },
        });

        App.init('VMain',function(){
            p.onLoad(p);
        });

    },
    checkColumnAddV: function(me, store)
    {
        console.log("checkColumn");
        console.log(store.data);
    }
    ,
    up_onclick: function(p, record)
    {
        App.view.create('VShowDoc', {
            modal: true,
            title: record.data.filename,
            pid: record.data.docId
        }).show().center();
    },
    dpt_onselect: function(me,_store) {
        var store=App.store.create('goprro://villes{idVille,ville_nom+}?ville_departement='+_store.data.codeDepartement);
        App.get('VSaisie combo#ville').bindStore(store);
        store.load();
    },
    ville_onselect: function(me,_store) {
        var store=App.store.create('goprro://zones{idZone,nomZone+}?idVille='+_store.data.idVille);
        App.get('VSaisie combo#zone').bindStore(store);
        store.load();
    },
    propertygrid_edit: function(ed,o) {
        var store=App.get(o.grid.up('panel').up('panel'),"treepanel").getStore().data;
        var selectedNode = App.get(o.grid.up('panel').up('panel'),"treepanel").getSelectionModel().getSelection()[0];
        var idx = App.get(o.grid.up('panel').up('panel'),"treepanel").getStore().indexOf(selectedNode);
        store.items[idx].properties=[];
        for (var i=0;i<o.store.data.items.length;i++) {
            store.items[idx].properties.push({
                name: o.store.data.items[i].data.name,
                value: o.store.data.items[i].data.value
            });
        };
    },
    VSaisie_onShow: function(me) {
        /**/console.log("VSaisie_onShow");
        /**/console.log("me");
        /**/console.log(me);
        /**/console.log("xtype");
        /**/console.log(me.xtype);
        var xtype = me.xtype;
        me.element={};
        App.reset(me);
        App.get(me,"treepanel").getRootNode().removeAll();
        App.get(me,"propertygrid").getStore().removeAll();
        if (me.idOuvrage) {
            function getElements(PARAM,PARAMX,PARAMZ,ndx,cb) {
                App.Elements.getSelect(PARAM[ndx],App.get(me,"combo#type").getValue(),function(r){
                    console.log(r);
                    if (!r[r.length-1].leaf) r[r.length-1].text="<b>"+r[r.length-1].text+"</b>";
                    if (PARAMX[ndx]) r[r.length-1].description=PARAMX[ndx];
                    if (PARAMZ[ndx]) r[r.length-1].id=PARAMZ[ndx];
                    for (var i=0;i<r.length;i++) {
                        var xnode=App.get(me,"treepanel").getRootNode().store.getNodeById('c'+r[i].parent);
                        if (!xnode) {
                            if (!App.get(me,"treepanel").getRootNode().store.getNodeById(r[i].id)) App.get(me,"treepanel").getRootNode().appendChild(r[i]);
                        } else {
                            if (!App.get(me,"treepanel").getRootNode().store.getNodeById(r[i].id)) xnode.appendChild(r[i]);
                        };
                        App.get(me,"treepanel").expandAll();
                    }
                    if (ndx+1<PARAM.length) getElements(PARAM,PARAMX,PARAMZ,ndx+1,cb); else cb();
                });
            };
            var store=App.store.create('goprro://types',{autoLoad:true});
            App.get(me,'combo#type').bindStore(store);
            App.get(me,'combo#type').getStore().load();
            App.get(me,'combo#famille').setDisabled(true);
            App.get(me,'combo#type').setDisabled(true);
            // On charge les premiers items
            App.DB.get('goprro://ouvrages?idOuvrage='+me.idOuvrage,me,function(re){
                if (re.data[0]._BLOB) App.get(me,'uploadfilemanager#up').setFiles(JSON.parse(re.data[0]._BLOB));
                // On continue par les éléments
                App.DB.get('goprro://oa_elements{idOAElement,idElement,nomOAElement,caracteristiques}?idOuvrage='+me.idOuvrage,function(r){

                    var id= App.get('VSaisie combo#dpt').getValue();
                    if (id) {
                        var record = App.get('VSaisie combo#dpt').findRecordByValue(id).get('codeDepartement');
                        console.log(record);
                        var store=App.store.create('goprro://villes{idVille,ville_nom+}?ville_departement='+record);
                        App.get('VSaisie combo#ville').bindStore(store);
                        store.load();
                    };


                    //var store=App.store.create('goprro://zones{idZone,nomZone+}?idVille='+re.data[0].idVille);
                    //App.get('VSaisie combo#zone').bindStore(store);
                    //store.load();
                    var PARAM=[];
                    var PARAMX=[];
                    var PARAMZ=[];
                    var CARACT=[];
                    if (r.data.length>0) {
                        for (var i=0;i<r.data.length;i++) {
                            PARAM.push(r.data[i].idElement);
                            PARAMX.push(r.data[i].nomOAElement);
                            PARAMZ.push(r.data[i].idOAElement);
                            if (r.data[i].caracteristiques) CARACT[r.data[i].idOAElement]=JSON.parse(r.data[i].caracteristiques); else CARACT[r.data[i].idOAElement]=[];
                        };
                        getElements(PARAM,PARAMX,PARAMZ,0,function(){
                            var store=App.get(me,"treepanel").getStore().data;
                            console.log('all done.');
                            for (var i=0;i<store.items.length;i++) {
                                if (CARACT[store.items[i].data.id]) store.items[i].properties=CARACT[store.items[i].data.id];
                            };
                            console.log(store);
                        });
                    }
                });
            });
        };
    },
    gridO_select: function(me,store) {
        /**/console.log("gridO_select");
        //App.view.create('VSaisie',{idOuvrage:store.data.idOuvrage,modal: true}).show().center();
        hideForms();
        App.get('mainform panel#southpanel').collapse();
        var form=App.get("mainform panel#Saisie");
        form.idOuvrage=store.data.idOuvrage;
        form.show();
    },
    new_ouvrage_record: function(me) {
        me.setDisabled(true);
        var store=App.get(me.up('panel'),"treepanel").getStore().data;
            console.log("me.up('panel')");
            console.log(me.up('panel'));
        App.DB.post('goprro://ouvrages',me.up('panel'),function(r){
            console.log("App.get('uploadfilemanager#up').getFiles()");
            console.log(App.get('uploadfilemanager#up').getFiles());
            // On post l'upload
            App.Docs.upload(App.get('uploadfilemanager#up').getFiles(),0,function() {
                //alert('posté!');
            });
            if (!me.up('panel').idOuvrage) {
                if (!r.insertId) {
                    App.notify("Impossible d'enregistrer la fiche");
                    me.setDisabled(false);
                    return;
                };
                if (r.insertId==0) {
                    App.notify("Impossible d'enregistrer la fiche");
                    me.setDisabled(false);
                    return;
                };
            } else r.insertId=me.up('panel').idOuvrage;
            var Post=[];
            for (var i=0;i<store.items.length;i++) {
                var descr="";
                var parent=0;
                if (store.items[i].data.description) descr=store.items[i].data.description;
                if (store.items[i].data.parentId) {
                    if (store.items[i].data.parentId.split('c').length>1) parent=store.items[i].data.parentId.split('c')[1];
                };
                if (store.items[i].data.leaf) {
                    var dta={
                        nomOAElement: descr,
                        parentOAElement: parent,
                        idOuvrage: r.insertId,
                        idElement: store.items[i].data.name.split('c')[1],
                        idType: App.get(me.up('panel'),"combo#type").getValue(),
                        _BLOB: App.get('uploadfilemanager#up').getFiles()
                    };
                    if (store.items[i].properties) dta.caracteristiques=JSON.stringify(store.items[i].properties);
                    Post.push(dta);
                };
            };
            App.Elements.delOuvrage(r.insertId,function(e) {
                App.DB.post("goprro://oa_elements",Post,function(r){
                    console.log(r);
                    App.get('mainform grid#gridO').getStore().load();
                    me.up('panel').hide();
                    hideForms();
                    App.get("mainform grid#gridO").show();
                    me.setDisabled(false);
                });
            });
        });
    },
    treeSaisie_click: function(me,o) {
        var grid=App.get("mainform propertygrid");
        var gridPanel=grid.up('panel');
        App.get("mainform panel#Saisie").element[o.data.name.split('c')[1]]=[];
        App.get("mainform panel#Saisie").curElement=o.data.name.split('c')[1];
        App.DB.get('goprro://elements{idType_element}?idElement='+o.data.name.split('c')[1],function(r){
            App.DB.get('goprro://caracteristiques?idType='+r.data[0].idType_element,function(r){
                var source={};
                var sourceConfig={};
                for (var i=0;i<r.data.length;i++) {
                    App.get("mainform panel#Saisie").element[o.data.name.split('c')[1]].push(r.data[i]);
                    if (r.data[i].typeCaracteristique=="BOOL") source[r.data[i].nomCaracteristique]=false;
                    if (r.data[i].typeCaracteristique=="STRING") source[r.data[i].nomCaracteristique]="-";
                    if (r.data[i].typeCaracteristique=="NUMBER") source[r.data[i].nomCaracteristique]=.0;
                    if (r.data[i].typeCaracteristique=="SELECT") {
                        source[r.data[i].nomCaracteristique]="";
                        var items=r.data[i].valeursCaracteristique.split(',');
                        if (items.length>0) {
                            var Item=[];
                            for (var j=0;j<items.length;j++) Item.push({value:items[j]});
                            sourceConfig[r.data[i].nomCaracteristique]={
                                editor: {
                                    xtype: "combo",
                                    queryMode: 'local',
                                    editable: false,
                                    displayField: "value",
                                    valueField: "value",
                                    store: App.store.create({fields:["value"],data:Item,autoLoad: true})
                                }
                            }
                        }
                    };
                };
                var obj={
                    flex: 1,
                    border: false,
                    labelAlign: "top",
                    height: "100%",
                    layout: 'fit'
                };
                obj.source=source;
                obj.sourceConfig=sourceConfig;

                var grid2=Ext.create('Ext.grid.property.Grid',obj);
                console.log('-----');
                console.log(o.properties);
                console.log('-----');
                if (o.properties) {
                    for (var i=0;i<o.properties.length;i++) {
                        console.log(o.properties[i]);
                        grid2.setProperty(o.properties[i].name,o.properties[i].value)
                    }
                };

                gridPanel.removeAll();
                gridPanel.add(grid2);
            });
        });
    },
    charact_validate_click: function(me) {
        App.DB.get('goprro://@caracteristiques',function(r) {
            var e={};
            for (var i=0;i<r.data.length;i++) {
                e[r.data[i].COLUMN_NAME]='';
            };
            var sm = App.get(me.up('panel').up('panel'),"treepanel#T0").getSelectionModel().getSelection();
            if (sm.length==0) {
                Ext.Msg.alert('GOPRRO',"Vous devez sélectionner un élement du catalogue.");
                return;
            };
            e.idType=sm[0].data.type_element;
            e.actif=1;
            console.log(e);
            App.get(me.up('panel').up('panel'),'grid#T1').getStore().insert(0, e);
        });
    },
    charact_grid_edit: function(ed,o) {
        var data=o.record.data;
        delete data.creation;
        delete data.modif;
        App.DB.post("goprro://caracteristiques",data,function(r){
            o.grid.getStore().load();
        });
    },
    treeT0_click: function(me,store) {
        var store=App.store.create('goprro://caracteristiques?idType='+store.data.type_element);
        App.get('VCharacteristics grid#T1').bindStore(store);
        store.load();
    },
    charact_cboFamille_select: function(me) {
        App.get(me.up('panel'),'combo#cboType').setValue('');
        App.get(me.up('panel'),'grid#T1').getStore().removeAll();
        App.get(me.up('panel'),'treepanel#T0').getRootNode().removeAll();
        var store=App.store.create('goprro://types{nomType+,idType}?idFamille='+me.getValue());
        App.get(me.up('panel'),'combo#cboType').bindStore(store);
        App.get(me.up('panel'),'combo#cboType').getStore().load();
    },
    charact_cbotype_select: function(me,store) {
        console.log(store);
        App.get(me.up('panel'),'treepanel#T0').getRootNode().removeAll();
        App.get(me.up('panel'),'grid#T1').getStore().removeAll();
        App.get(me.up('panel'),'treepanel#T0').getStore().getProxy().extraParams.type=store.data.idType;
        App.get(me.up('panel'),'treepanel#T0').getStore().load();
        App.get(me.up('panel'),'treepanel#T0').getStore().on('load',function(){
            App.get(me.up('panel'),'treepanel#T0').expandAll();
        });
    },
    treeSaisie_beforeedit: function(ed, obj, eo) {
        // si c'est un container, on n'édite pas !
        if (!obj.record.data.leaf) return false;
        console.log(obj.record);
    },
    validate_catalog: function(me) {        
        var clone = function(node) {
            var result = node.copy(),
                len = node.childNodes ? node.childNodes.length : 0,
                i;
            for (i = 0; i < len; i++) result.appendChild(clone(node.childNodes[i]));
            return result;
        };
        var CStore=App.get(me.up('panel'),"treepanel#T1").getStore();
        var oldRoot = CStore.getRootNode(),
            newRoot = clone(oldRoot);
        App.get('VSaisie treepanel').getStore().setRootNode(newRoot);
        me.up('window').close();
    },
    validate_visit_catalog: function(me) {        
        var clone = function(node) {
            var result = node.copy(),
                len = node.childNodes ? node.childNodes.length : 0,
                i;
            for (i = 0; i < len; i++) result.appendChild(clone(node.childNodes[i]));
            return result;
        };
        var CStore=App.get(me.up('panel'),"treepanel#T1").getStore();
        var oldRoot = CStore.getRootNode(),
            newRoot = clone(oldRoot);
        App.get('VUpVisitWork treepanel').getStore().setRootNode(newRoot);
        me.up('window').close();
    },
    AddItem_click: function(me) {
        var tree = App.get(me.up('panel').up('panel'),"treepanel#T0");
        var selModel = tree.getSelectionModel();
        var node = selModel.getLastSelected();
        App.Elements.getSelect(node.data.id,me.up('panel').up('panel').type_item,function(r){
            if (!r[r.length-1].leaf) r[r.length-1].text="<b>"+r[r.length-1].text+"</b>";
            console.log(r);
            for (var i=0;i<r.length;i++) {

                var xnode=App.get(me.up('panel').up('panel'),"treepanel#T1").getRootNode().store.getNodeById('c'+r[i].parent);
                if (!xnode) {
                    if (!App.get(me.up('panel').up('panel'),"treepanel#T1").getRootNode().store.getNodeById(r[i].id)) App.get(me.up('panel').up('panel'),"treepanel#T1").getRootNode().appendChild(r[i]);
                } else {
                    if (!App.get(me.up('panel').up('panel'),"treepanel#T1").getRootNode().store.getNodeById(r[i].id)) xnode.appendChild(r[i]);
                };
                App.get(me.up('panel').up('panel'),"treepanel#T1").expandAll();
            }
        });
    },
    RemoveItem_click: function(me) {
        var tree=App.get(me.up('panel'),"treepanel#T1");
        var record = tree.getSelectionModel().getSelection()[0];
        function recursedel(record,cb) {
            var xnode=tree.getRootNode().store.getNodeById('c'+record.data.parent);
            if (xnode.childNodes.length<=1) {
                if (xnode.data.parent) recursedel(xnode,cb);
                xnode.remove(true);
            }
        };
        recursedel(record,function() {
            console.log('all done.')
        });

        record.remove(true);
        tree.getStore().sync();
    },
    VAddItem_onShow: function(me) {
        var clone = function(node) {
            var result = node.copy(),
                len = node.childNodes ? node.childNodes.length : 0,
                i;
            for (i = 0; i < len; i++) result.appendChild(clone(node.childNodes[i]));
            return result;
        };
        var CStore=App.get("VSaisie treepanel").getStore();
        var oldRoot = CStore.getRootNode(),
            newRoot = clone(oldRoot);
        App.get(me,'treepanel#T1').getStore().setRootNode(newRoot);
        App.get(me,'treepanel#T1').expandAll();
        App.get(me,'treepanel#T0').getStore().getProxy().extraParams.type=me.type_item;
        App.get(me,'treepanel#T0').getStore().load();
        App.get(me,'treepanel#T0').getStore().on('load',function(){
            App.get(me,'treepanel#T0').expandAll();
        });
    },
    VAddVisitItem_onShow: function(me) {
        var clone = function(node) {
            var result = node.copy(),
                len = node.childNodes ? node.childNodes.length : 0,
                i;
            for (i = 0; i < len; i++) result.appendChild(clone(node.childNodes[i]));
            return result;
        };
        var CStore=App.get("VUpVisitWork treepanel").getStore();
        var oldRoot = CStore.getRootNode(),
            newRoot = clone(oldRoot);
        App.get(me,'treepanel#T1').getStore().setRootNode(newRoot);
        App.get(me,'treepanel#T1').expandAll();
        App.get(me,'treepanel#T0').getStore().getProxy().extraParams.type=me.type_item;
        App.get(me,'treepanel#T0').getStore().load();
        App.get(me,'treepanel#T0').getStore().on('load',function(){
            App.get(me,'treepanel#T0').expandAll();
        });
    },
    add_item_click: function(me) {
        App.view.create('VAddItem',{modal: true,type_item: App.get(me.up('panel').up('panel').up('panel'),'combo#type').getValue()}).show().center();
    },
    add_visit_item_click: function(me) {
        App.view.create('VAddVisitItem',{modal: true,type_item: App.get(me.up('panel').up('panel').up('panel'),'combo#type').getValue()}).show().center();
    },
    famille_select: function(me) {
        App.get('VSaisie combo#type').setValue('');
        var store=App.store.create('goprro://types{idType,nomType+}?idFamille='+me.getValue());
        App.get('VSaisie combo#type').bindStore(store);
        App.get('VSaisie combo#type').getStore().load();
    },
    showSaisie: function() {
        /**/console.log("showSaisie");
        //App.view.create('VSaisie',{modal: true}).show().center();
        hideForms();
        var form=App.get("mainform panel#Saisie");
        form.idOuvrage=null;
        var cbo=App.getAll(form,'combo');
        for (var i=0;i<cbo.length;i++)	cbo[i].setDisabled(false);
        form.show();
    },
    Menu_onClick: function(p)
    {
        if (p.itemId) {
            if (p.itemId=="mnu_saisie") {

            }
        };
    },
    clickme_onclick: function()
    {

    },
    hideForms: function()
    {
        var form=App.get('mainform');
        for (var i=0;i<form.items.length;i++) form.items[i].remove();
    },
    showMap: function(p)
    {
        console.log("showMap");
        hideForms();
        //TMap.clearMarkers();
        App.get("mainform panel#map").show();
        console.log("mainform panel#map");
        console.log(App.get("mainform panel#map"));
        App.DB.get("goprro://ouvrages{idOuvrage,oa_x,oa_y,nomOuvrage,idOuvrage}",function(r) {
            for (var i=0;i<r.data.length;i++) {
        console.log("for");
                TMap.setMarker(r.data[i].oa_y,r.data[i].oa_x,r.data[i].nomOuvrage,r.data[i].idOuvrage);
            }
        });
    },
    showGrid: function(p)
    {
        hideForms();
        App.get("mainform grid#gridO").show();
    },
    showSettingsCharacteristics: function(p) {
        hideForms();
        App.get("mainform panel#setup_characteristics").show();
    },
    showSettingsRefs: function(p) {
        hideForms();
        App.get("mainform panel#setup_refs").show();
    },
    click_news: function() {
        App.view.create('VAddNews',{modal:true}).show().center();
    },
    add_news: function(me) {
        
        var idUser = Auth.User.idUser;
        var dif = App.get('VAddNews combo#diffusion').getValue();
        var news = App.get('VAddNews textarea#texteNote').getValue();
        var importance = App.get('VAddNews combo#importance').getValue();
        if (dif == 'National')
        {
            var diffusion = 0;
        }
        else
        {
            var diffusion = Auth.User.idDter;;
        }
        
        var tabNews = [idUser, diffusion, news, importance];
        App.AddNews.insert(tabNews,function(response) {
            App.get('VAddNews').close();
            if (response === true)
            {
                Ext.Msg.alert('GOPRRO',"Votre commentaire est enregistré.");
                var html='<li><p class="timeline-date">%DATE%<br><span style="color:#6fc173; font-weight:bold">%TAG%</span></p><div class="timeline-content"><h3>%POSTER%</h3><p>%COMMENT%</p></div></li>';
                var tpl=[];
                App.Notes.getAll({},function(e,r) {
                     var idDter = Auth.User.idDter;
            
                    for (var i=0;i<r.result.data.length;i++) {   
                        if ((r.result.data[i].diffusion == 0) || (r.result.data[i].diffusion == idDter))
                        {
                            var results=html;
                            results=results.replace('%DATE%',r.result.data[i].dateNote.toDate().toString('dd/MM/yyyy hh:mm'));
                            results=results.replace('%POSTER%',r.result.data[i].nomprenom);
                            results=results.replace('%COMMENT%',r.result.data[i].texteNote);
                            results=results.replace('%TAG%',r.result.data[i].importance);
                            tpl.push(results);
                        }
                    };
                    results='<ul class="timeline">'+tpl.join('')+'</ul>';
                    App.get('mainform panel#timeline').update(results);
                });
            }
            else
            {
                Ext.Msg.alert('GOPRRO',"Une erreur s'est produite, merci de réessayer.");
            }
        })
    },
    ref_cboRefs_select: function(me) {

        App.get('mainform panel#southpanel').collapse();
        App.store.familles.load();

        var choix = App.get('VRefs combo#cboRefs').getValue();
        var store=App.store.create('goprro://'+choix);
        var ref = choix.charAt(0).toUpperCase() + choix.substring(1).toLowerCase();

        App.get('V'+ref+' grid#T1').bindStore(store);
        store.load();

        switch (choix) {
            case "axes":
                console.log('axes');
                App.get('VAxes').show();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
            case "familles":
                console.log('familles');
                App.get('VAxes').hide();
                App.get('VFamilles').show();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
            case "fournisseurs":
                console.log('fournisseurs');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').show();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
            case "geologies":
                console.log('geologies');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').show();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
            case "gestionnaires":
                console.log('gestionnaires');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').show();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
            case "poseurs":
                console.log('poseurs');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').show();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
            case "types":
                console.log('types');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').show();
                App.get('VZones').hide();
                break;
            case "zones":
                console.log('zones');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').show();
                App.get('VZones combo#cboDepartements').reset();
                App.get('VZones grid#T1').hide();
                break;
            default:
                console.log('default');
                App.get('VAxes').hide();
                App.get('VFamilles').hide();
                App.get('VFournisseurs').hide();
                App.get('VGeologies').hide();
                App.get('VGestionnaires').hide();
                App.get('VPoseurs').hide();
                App.get('VTypes').hide();
                App.get('VZones').hide();
                break;
        }

    },
    cboDepartements_select: function(me) {
        App.get('mainform panel#southpanel').collapse();
        App.get('VZones').show();
        if(App.get('VZones grid#T1').store)
            App.get('VZones grid#T1').store.removeAll();

        var choix = App.get('VZones combo#cboDepartements').getValue();
        App.Refs.selectZones(choix,function(response) {

            var data=[];
            for (var i=0;i<response.length;i++) {
                data.push({
                    idZone:response[i].idZone,
                    idVille:response[i].idVille,
                    nomVille:response[i].nomVille,
                    nomZone:response[i].nomZone
                })
            };
            var store=App.store.create({
                fields:["idZone","idVille","nomVille","nomZone"],data:data
            });
            if(store)
            {
                App.get('VZones grid#T1').bindStore(store);
                store.load();
            }

            App.get('VZones grid').show();
        })
    },
    add_ref: function(me) {
        var grid=me.up('grid');
        grid.getStore().insert(grid.getStore().data.items.length,{});
    },
    del_ref: function(me,store) {
        var grid=me.up('grid');
       Ext.Msg.confirm('Delete', 'Êtes-vous sûr de vouloir supprimer le(s) référentiel(s) ?', function(btn){
           console.log("btn");
           console.log(btn);
       if(btn === 'yes'){
            var tabName = App.get('VRefs #cboRefs').getValue()
            for (var i=0;i<grid.getStore().data.items.length;i++) {
                if (grid.getStore().data.items[i].data.select)
                {

                    console.log("Dans if");
                    switch (tabName) {
                        case "axes":
                            var id = grid.getStore().data.items[i].data.idAxe;
                            var idTab = "idAxe";
                            break;
                        case "familles":
                            var id = grid.getStore().data.items[i].data.idFamille;
                            var idTab = "idFamille";
                            break;
                        case "fournisseurs":
                            var id = grid.getStore().data.items[i].data.idFournisseurs;
                            var idTab = "idFournisseurs";
                            break;
                        case "geologies":
                            var id = grid.getStore().data.items[i].data.idGeologie;
                            var idTab = "idGeologie";
                            break;
                        case "gestionnaires":
                            var id = grid.getStore().data.items[i].data.idGestionnaires;
                            var idTab = "idGestionnaires";
                            break;
                        case "poseurs":
                            var id = grid.getStore().data.items[i].data.idPoseurs;
                            var idTab = "idPoseurs";
                            break;
                        case "types":
                            var id = grid.getStore().data.items[i].data.idType;
                            var idTab = "idType";
                            break;
                        case "zones":
                            var id = grid.getStore().data.items[i].data.idZone;
                            var idTab = "idZone";
                            break;
                        default:
                            Ext.Msg.alert('GOPRRO',"Erreur lors de la suppression");
                            break;
                    }

                    var tabRefs = [tabName, idTab, id];
                    App.Refs.del(tabRefs,function(response) {
                        if (response !== true)
                            Ext.Msg.alert('GOPRRO',"Une erreur s'est produite, merci de réessayer.");

                    })
                }
            }
            if(tabName == "zones")
            {
                var choix = App.get('VZones combo#cboDepartements').getValue();
                App.Refs.selectZones(choix,function(response) {
                    var data=[];
                    for (var i=0;i<response.length;i++) {
                        data.push({
                            idZone:response[i].idZone,
                            idVille:response[i].idVille,
                            nomVille:response[i].nomVille,
                            nomZone:response[i].nomZone
                        })
                    };
                    var store=App.store.create({
                        fields:["idZone","idVille","nomVille","nomZone"],data:data
                    });
                    if(store)
                    {
                        App.get('VZones grid#T1').bindStore(store);
                        store.load();
                    }

                    App.get('VZones grid').show();
                });
                
            }
            else
            {
                grid.getStore().load();
            }
            //Ext.Msg.alert('GOPRRO',"Suppression enregistré.");
       }
       else
       {
            Ext.Msg.alert('GOPRRO',"Une erreur s'est produite, merci de réessayer.");
       }
       });
    },
    ref_grid_edit: function(ed,o) {
        var tabName = App.get('VRefs combo#cboRefs').getValue();
        var data=o.record.data;
        if(tabName == "zones" )
        {
            App.Refs.selectVilles(data["nomVille"],function(response) {
                data["idVille"] = response[0].idVille;
                delete data.creation;
                delete data.modif;
                App.DB.post("goprro://"+tabName,data,function(r){
                    App.get('VZones grid#T1').store.removeAll();

                    var choix = App.get('VZones combo#cboDepartements').getValue();
                    App.Refs.selectZones(choix,function(response) {

                        var data=[];
                        for (var i=0;i<response.length;i++) {
                            data.push({
                                idZone:response[i].idZone,
                                idVille:response[i].idVille,
                                nomVille:response[i].nomVille,
                                nomZone:response[i].nomZone
                            })
                        };
                        var store=App.store.create({
                            fields:["idZone","idVille","nomVille","nomZone"],data:data
                        });
                        if(store)
                        {
                            App.get('VZones grid#T1').bindStore(store);
                            store.load();
                        }

                        App.get('VZones grid').show();
                    });
                });
            })
        }
        else{
            delete data.creation;
            delete data.modif;
            App.DB.post("goprro://"+tabName,data,function(r){
                o.grid.getStore().load();
            });
        }
    },
    combo_villes_beforeedit: function(ed,cx) {

        if (cx.column.dataIndex == 'nomVille')
        {
            console.log(ed);
            console.log(cx);
            var cbo=ed.editors.items[0];
            var store=App.store.create('goprro://villes{nomVille+}?ville_departement='+App.get('VZones combo#cboDepartements').getValue(),{autoLoad:true});
            //cbo.bindStore(store);
            store.load();
            cx.column.setEditor(new Ext.create('Ext.form.field.ComboBox',{
                store: store,
                displayField: "nomVille",
                valueField: "nomVille"
            }));
        }
    },
    /******************************************************************************************************/
    showAddVisit: function(p) {
        console.log("showAddVisit");
        App.get('mainform panel#southpanel').collapse();
        hideForms();
        App.get("mainform panel#addVisit").show();
        var idDter = Auth.User.idDter;        
        
        TMap.clearMarkers();
        
        App.Visits.select(idDter,function(response) {
            
        console.log("response");
        console.log(response);
            var data=[];
            for (var i=0;i<response.length;i++) {
                data.push({
                    idOuvrage:response[i].idOuvrage,
                    nomOuvrage:response[i].nomOuvrage,
                    nomDepartement:response[i].nomDepartement,
                    oa_x:response[i].oa_x,
                    oa_y:response[i].oa_y,
                    select:false
                })
                TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idOuvrage,"","addvisit");
            };
            var store=App.store.create({
                fields:["idOuvrage","nomOuvrage","nomDepartement","oa_x","oa_y", "select"],data:data
            });
            if(store)
            {
                App.get('VAddVisit grid#gridVisitAdd').bindStore(store);
                store.load();
            }
            
        App.get("VAddVisit panel#addVisitMap").show();
        App.get("VAddVisit panel#map").show();

        });
        
    },
    showVisit: function(p) {
        App.get('mainform panel#southpanel').collapse();
        App.get('VVisit grid#gridVisit').store.removeAll();
        App.get('VVisit combo#idCampagne').reset();
        hideForms();
        App.get("mainform panel#visit").show();
        var idDter = Auth.User.idDter;
        
        App.Visits.select(idDter,function(response) {
            
         console.log("response");
         console.log(response);
            var data=[];
            for (var i=0;i<response.length;i++) {
                data.push({
                    idOuvrage:response[i].idOuvrage,
                    nomOuvrage:response[i].nomOuvrage,
                    nomDepartement:response[i].nomDepartement,
                    oa_x:response[i].oa_x,
                    oa_y:response[i].oa_y
                })
                TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idOuvrage,"","visit");
            };
        });
     
        var dataCombo=[];
        App.DB.get('goprro://campagne',function(r){
            
            for (var i=0;i<r.data.length;i++) {
                var dateDeb = Ext.Date.parse(r.data[i].dateDebut,"c");
                var dateDebut = Ext.Date.format(dateDeb, 'd-m-Y');
                var dateF = Ext.Date.parse(r.data[i].dateFin,"c");
                var dateFin = Ext.Date.format(dateF, 'd-m-Y');
                var periode = dateDebut+' / '+dateFin;
                dataCombo.push({
                    idCampagne:r.data[i].idCampagne,
                    periode:periode
                })
            }
            
            var storeCombo=App.store.create({
                fields:["idCampagne","periode"],data:dataCombo
            });
            if(storeCombo)
            {
                App.get('VVisit combo#idCampagne').bindStore(storeCombo);
                storeCombo.load();
            };
        });
    },
    showVisitDate: function(p) {
        App.get('mainform panel#southpanel').collapse();
        App.get("mainform panel#visit").show();
        var idUser = Auth.User.idUser;
        var idDter = Auth.User.idDter;
        TMap.clearMarkers();
        App.Visits.select(idDter,function(response) {
            
            var data=[];
            for (var i=0;i<response.length;i++) {
                data.push({
                    idOuvrage:response[i].idOuvrage,
                    nomOuvrage:response[i].nomOuvrage,
                    nomDepartement:response[i].nomDepartement,
                    oa_x:response[i].oa_x,
                    oa_y:response[i].oa_y
                })
                
                TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idOuvrage,"","visit");
            };
            var idCampagne =  App.get("VVisit combo#idCampagne").getValue();
            var tabDate = [idUser, idCampagne];
            App.Visits.selectVisitDate(tabDate,function(response) {
                var data=[];
                for (var i=0;i<response.length;i++) {
                    data.push({
                        idOuvrage:response[i].idOuvrage,
                        idCampagne:response[i].idCampagne,
                        idVisiteOuvrage:response[i].idVisiteOuvrage,
                        idDepartement:response[i].idDepartement,
                        dateVisiteOuvrage:response[i].dateVisiteOuvrage,
                        nomOuvrage:response[i].nomOuvrage,
                        nomDepartement:response[i].nomDepartement,
                        oa_x:response[i].oa_x,
                        oa_y:response[i].oa_y
                    })

                    TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idVisiteOuvrage,"colorMarker","workvisit");
                };
                var store=App.store.create({
                    fields:["idOuvrage","idCampagne","idVisiteOuvrage","idDepartement","nomOuvrage","dateVisiteOuvrage","nomDepartement","oa_x","oa_y"],data:data
                });
                if(store)
                {
                    App.get('VVisit grid#gridVisit').bindStore(store);
                    store.load();
                }
                App.get('VVisit grid').show();
                
            });
        });
    },
    add_visit: function(me, store) {
        
        var LongDateDebut = App.get('VAddVisit datefield#dateDebut').getValue();
        var dateDebut = Ext.Date.format(LongDateDebut, 'Y-m-d');
        var LongDateFin = App.get('VAddVisit datefield#dateFin').getValue();
        var dateFin = Ext.Date.format(LongDateFin, 'Y-m-d');
        if((LongDateDebut != null) && (LongDateFin != null))
        {
            //var mail = Auth.User.mail;
            var idUser = Auth.User.idUser;
            var panel=me.up('panel');
            var dataStore=App.get(me.up('panel'),"grid").getStore().data;
            var tabCampagne = [idUser, dateDebut, dateFin];
            App.Visits.insertCampagne(tabCampagne,function(response) { 
                if (response != "periode")
                {
                    var idCampagne = response.insertId;
                    var compteurSelect = 0;
                    var compteurAdd = 0;
                    for (var i=0;i<dataStore.items.length;i++) {
                        if (dataStore.items[i].data.select)
                        {
                            compteurSelect ++;
                            var idOuvrage = dataStore.items[i].data.idOuvrage;
                            var LongDate = dataStore.items[i].data.date;
                            var date = Ext.Date.format(LongDate, 'Y-m-d');
                            var nomOuvrage = dataStore.items[i].data.nomOuvrage;
                            if(LongDate !== undefined)
                            {
                                if((date >= dateDebut)&&(date <= dateFin))
                               {

                                        var tabVisits = [idUser, date, idOuvrage, idCampagne];

                                        App.Visits.insert(tabVisits,function(response) {
                                            compteurAdd ++;
                                            if (compteurSelect === compteurAdd)
                                            {
                                                Ext.Msg.alert('GOPRRO',"Visite enregistrée");
                                            }
                                        })
                                }
                                else{
                                      
                                    App.Visits.delCampagne(idCampagne,function(response) {
                                        Ext.Msg.alert('GOPRRO',"La date de visite d'un ou plusieurs ouvrage(s) ne correspond pas à la période choisie");
                                    })
                                }
                            }
                            else{
                                App.Visits.delCampagne(idCampagne,function(response) {
                                    Ext.Msg.alert('GOPRRO',"Vous devez indiquer une date de visite pour le ou les ouvrage(s) visité(s)");
                                })
                            }
                        }
                    };
                    
                }
                else
                {
                    Ext.Msg.alert('GOPRRO',"Cette période existe déja ou empiète sur une période existante");
                }
                
             });
                    
        }
        else{
              Ext.Msg.alert('GOPRRO',"Merci d'indiquer une date de début et une date de fin");
        }
    
	},
    visit_select: function(me,store) {
        App.get('mainform panel#southpanel').collapse();
        var form=App.get("mainform panel#UpWork");
        form.idVisiteOuvrage=store.data.idVisiteOuvrage;
        form.show();
    },
    add_visit_select: function(me,store) {
        App.get('mainform panel#southpanel').collapse();
        var form=App.get("mainform panel#AddWork");
        form.idOuvrage=store.data.idOuvrage;
        form.show();
    },
    showMapAddV: function() {
                    TMap.map = new google.maps.Map(document.getElementById('TMapPanel2'),{
                        zoom: 8,
                        center: new google.maps.LatLng('43.299999','5.4'),
                        mapTypeId: google.maps.MapTypeId.MAP
        });
    },
    showMapV: function() {
                    TMap.map = new google.maps.Map(document.getElementById('TMapPanel3'),{
                        zoom: 8,
                        center: new google.maps.LatLng('43.299999','5.4'),
                        mapTypeId: google.maps.MapTypeId.MAP
        });
    },
    showMapIndex: function() {
                   TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
            zoom: 10,
            center: new google.maps.LatLng('43.299999','5.4'),
            mapTypeId: google.maps.MapTypeId.MAP
        });
    },
    add_visit_check: function(comp, rowIndex, checked, eOpts) {
        
        var idOuvrage = eOpts.data.idOuvrage;
        var mail = Auth.User.mail;
        App.get('VAddVisitWork').close();
        TMap.clearMarkers();
        var store=App.get('VAddVisit grid#gridVisitAdd').getStore();
                
        var dataAll=[];
        
        for (var i=0;i<store.data.items.length;i++) {
            if(store.data.items[i].data.select == true)
            {
                TMap.setMarker(store.data.items[i].data.oa_y,store.data.items[i].data.oa_x,store.data.items[i].data.nomOuvrage,store.data.items[i].data.idOuvrage,"colorMarker","addvisit");
            }
            else
            {
                TMap.setMarker(store.data.items[i].data.oa_y,store.data.items[i].data.oa_x,store.data.items[i].data.nomOuvrage,store.data.items[i].data.idOuvrage,"","addvisit");
            }
        };
    },
    VVisit_onShow: function(me) {
        /**/console.log("VSaisie_onShow");
        /**/console.log("me");
        /**/console.log(me);
        /**/console.log("me id visite ouvrage");
        /**/console.log(me.idVisiteOuvrage);
        /**/console.log("xtype on show");
        /**/console.log(me.xtype);
        var panel=App.get(me.up('panel'),"grid");
        
        var xtype = me.xtype;
        me.element={};
        App.reset(me);
        App.get(me,"treepanel").getRootNode().removeAll();
        App.get(me,"propertygrid").getStore().removeAll();
        if (me.idVisiteOuvrage) {
            function getElements(PARAM,PARAMX,PARAMZ,ndx,cb) {
                App.Elements.getSelect(PARAM[ndx],App.get(me,"combo#type").getValue(),function(r){
                    console.log(r);
                    if (!r[r.length-1].leaf) r[r.length-1].text="<b>"+r[r.length-1].text+"</b>";
                    if (PARAMX[ndx]) r[r.length-1].description=PARAMX[ndx];
                    if (PARAMZ[ndx]) r[r.length-1].id=PARAMZ[ndx];
                    for (var i=0;i<r.length;i++) {
                        var xnode=App.get(me,"treepanel").getRootNode().store.getNodeById('c'+r[i].parent);
                        if (!xnode) {
                            if (!App.get(me,"treepanel").getRootNode().store.getNodeById(r[i].id)) App.get(me,"treepanel").getRootNode().appendChild(r[i]);
                        } else {
                            if (!App.get(me,"treepanel").getRootNode().store.getNodeById(r[i].id)) xnode.appendChild(r[i]);
                        };
                        App.get(me,"treepanel").expandAll();
                    }
                    if (ndx+1<PARAM.length) getElements(PARAM,PARAMX,PARAMZ,ndx+1,cb); else cb();
                });
            };
            var store=App.store.create('goprro://types',{autoLoad:true});
            App.get(me,'combo#type').bindStore(store);
            App.get(me,'combo#type').getStore().load();
            App.get(me,'combo#famille').setDisabled(true);
            App.get(me,'combo#type').setDisabled(true);
            // On charge les premiers items
            App.DB.get('goprro://visite_ouvrages?idVisiteOuvrage='+me.idVisiteOuvrage,me,function(re){
                if (re.data[0]._BLOB) App.get(me,'uploadfilemanager#up').setFiles(JSON.parse(re.data[0]._BLOB));
                // On continue par les éléments
                
                App.DB.get('goprro://visite_oa_elements{idOAElement,idElement,nomOAElement,caracteristiques}?idVisiteOuvrage='+me.idVisiteOuvrage,function(r){

                    var id= App.get(xtype+' combo#dpt').getValue();
                    if (id) {
                        var record = App.get('VSaisie combo#dpt').findRecordByValue(id).get('codeDepartement');
                        console.log(record);
                        var store=App.store.create('goprro://villes{idVille,ville_nom+}?ville_departement='+record);
                        App.get(xtype+' combo#ville').bindStore(store);
                        store.load();
                    };

                    var PARAM=[];
                    var PARAMX=[];
                    var PARAMZ=[];
                    var CARACT=[];
                    if (r.data.length>0) {
                        for (var i=0;i<r.data.length;i++) {
                            PARAM.push(r.data[i].idElement);
                            PARAMX.push(r.data[i].nomOAElement);
                            PARAMZ.push(r.data[i].idOAElement);
                            if (r.data[i].caracteristiques) CARACT[r.data[i].idOAElement]=JSON.parse(r.data[i].caracteristiques); else CARACT[r.data[i].idOAElement]=[];
                        };
                        getElements(PARAM,PARAMX,PARAMZ,0,function(){
                            var store=App.get(me,"treepanel").getStore().data;
                            console.log('all done.');
                            for (var i=0;i<store.items.length;i++) {
                                if (CARACT[store.items[i].data.id]) store.items[i].properties=CARACT[store.items[i].data.id];
                            };
                            console.log(store);
                        });
                    }
                });
            });
        };
    },
    visit_work: function(me, store)
    {
        var longDate = App.get('VDate datefield#dateVisitWork').getValue();
        var date = Ext.Date.format(longDate, 'Y-m-d');
        var idOuvrage= App.get('VVisitWork textfield#idOuvrage').getValue();
        var idCampagne = App.get('VVisit combo#idCampagne').getValue();
        
        App.Visits.selectCampagne(idCampagne,function(response) {
            
            var LongDateDebut = Ext.Date.parse(response[0].dateDebut,"c");
            var dateDebut = Ext.Date.format(LongDateDebut, 'Y-m-d');
            var LongDateFin =  Ext.Date.parse(response[0].dateFin,"c");
            var dateFin = Ext.Date.format(LongDateFin, 'Y-m-d');

            App.get('VDate').close();
            App.get('VVisitWork').close();
            App.get('VDate datefield#dateVisitWork').reset();
            
             if((date >= dateDebut)&&(date <= dateFin))
            {

                var idUser = Auth.User.idUser;

                var tabVisits = [idUser, date, idOuvrage, idCampagne];

                App.Visits.insert(tabVisits,function(response) {
                    var tabDate = [idUser, idCampagne];
                    App.Visits.selectVisitDate(tabDate,function(response) {
                        var data=[];
                        for (var i=0;i<response.length;i++) {
                            data.push({
                                idOuvrage:response[i].idOuvrage,
                                idCampagne:response[i].idCampagne,
                                idVisiteOuvrage:response[i].idVisiteOuvrage,
                                idDepartement:response[i].idDepartement,
                                dateVisiteOuvrage:response[i].dateVisiteOuvrage,
                                nomOuvrage:response[i].nomOuvrage,
                                nomDepartement:response[i].nomDepartement,
                                oa_x:response[i].oa_x,
                                oa_y:response[i].oa_y
                            })

                            TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idVisiteOuvrage,"colorMarker","workvisit");
                        };
                        var store=App.store.create({
                            fields:["idOuvrage","idCampagne","idVisiteOuvrage","idDepartement","nomOuvrage","dateVisiteOuvrage","nomDepartement","oa_x","oa_y"],data:data
                        });
                        if(store)
                        {
                            App.get('VVisit grid#gridVisit').bindStore(store);
                            store.load();
                        }
                        App.get('VVisit grid').show();

                    });

                })
                Ext.Msg.alert('GOPRRO',"Visite enregistrée");
            }
            else{
                Ext.Msg.alert('GOPRRO',"La date de visite de l'ouvrage ne correspond pas à la période");
            }
        });
    },
    add_visit_work: function(me, store)
    {
        
        var idOuvrage=me.up('panel').idOuvrage;
        var mail = Auth.User.mail;
        App.get('VAddVisitWork').close();
        TMap.clearMarkers();
        var store=App.get('VAddVisit grid#gridVisitAdd').getStore();
                
        var dataAll=[];
        
        for (var i=0;i<store.data.items.length;i++) {
             if(store.data.items[i].data.select == true)
            {
                 dataAll.push({
                    idOuvrage:store.data.items[i].data.idOuvrage,
                    nomOuvrage:store.data.items[i].data.nomOuvrage,
                    nomDepartement:store.data.items[i].data.nomDepartement,
                    oa_x:store.data.items[i].data.oa_x,
                    oa_y:store.data.items[i].data.oa_y,
                    select:true
                })

                TMap.setMarker(store.data.items[i].data.oa_y,store.data.items[i].data.oa_x,store.data.items[i].data.nomOuvrage,store.data.items[i].data.idOuvrage,"colorMarker","addvisit");
            }
            else if (store.data.items[i].data.idOuvrage == idOuvrage)
            {    
                dataAll.push({
                    idOuvrage:store.data.items[i].data.idOuvrage,
                    nomOuvrage:store.data.items[i].data.nomOuvrage,
                    nomDepartement:store.data.items[i].data.nomDepartement,
                    oa_x:store.data.items[i].data.oa_x,
                    oa_y:store.data.items[i].data.oa_y,
                    select:true
                })

                TMap.setMarker(store.data.items[i].data.oa_y,store.data.items[i].data.oa_x,store.data.items[i].data.nomOuvrage,store.data.items[i].data.idOuvrage,"colorMarker","addvisit");                
            }
            else
            {  
                dataAll.push({
                    idOuvrage:store.data.items[i].data.idOuvrage,
                    nomOuvrage:store.data.items[i].data.nomOuvrage,
                    nomDepartement:store.data.items[i].data.nomDepartement,
                    oa_x:store.data.items[i].data.oa_x,
                    oa_y:store.data.items[i].data.oa_y,
                    select:false
                })
                TMap.setMarker(store.data.items[i].data.oa_y,store.data.items[i].data.oa_x,store.data.items[i].data.nomOuvrage,store.data.items[i].data.idOuvrage,"","addvisit");
            }
        };
        var storeAll=App.store.create({
            fields:["idOuvrage","nomOuvrage","nomDepartement","oa_x","oa_y","select"],data:dataAll
        });
        if(storeAll)
        {
            App.get('VAddVisit grid#gridVisitAdd').bindStore(storeAll);
            storeAll.load();
        };
        
    },
    new_visit_ouvrage_record: function(me, store, data) {
        
            console.log("me new visit ouvrage record");
            console.log(me);
            console.log("me up panel new visit ouvrage record");
            console.log(App.get(me.up('panel'),"treepanel"));
            console.log("store new visit ouvrage record");
            console.log(store);
            console.log("data new visit ouvrage record");
            console.log(data);
        
            var form = App.get("VUpVisitWork");
            console.log(form.idVisiteOuvrage);
            console.log(form.items.items[0].items.items[1].items.items[1].value);//         longitude
            console.log(form.items.items[0].items.items[1].items.items[2].value);//         latitude
            console.log(form.items.items[0].items.items[1].items.items[3].value);//         pr debut
            console.log(form.items.items[0].items.items[1].items.items[4].value);//         pr fin
            console.log(form.items.items[0].items.items[1].items.items[5].value);//         longueur
            console.log(form.items.items[0].items.items[1].items.items[6].value);//         hauteur
            console.log(form.items.items[0].items.items[1].items.items[7].value);//         surface
            console.log(form.items.items[2].items.items[0].items.items[0].value);////         Famille ----Grisé----
            console.log(form.items.items[2].items.items[0].items.items[1].value);////         Type ----Grisé----
            console.log(form.items.items[2].items.items[0].items.items[2].value);////         Departement
            console.log(form.items.items[2].items.items[0].items.items[3].value);////         Geologie
            console.log(form.items.items[2].items.items[1].items.items[0].value);//         Axe
            console.log(form.items.items[2].items.items[1].items.items[1].value);//         Ville
            console.log(form.items.items[2].items.items[1].items.items[2].value);//         Zone
            console.log(form.items.items[2].items.items[2].items.items[0].value);//         Nom ouvrage
            console.log(form.items.items[2].items.items[2].items.items[1].value);//         Etiquette
            console.log(form.items.items[3].items.items[0].items.items[0].value);//         id gestionnaire
            console.log(form.items.items[3].items.items[0].items.items[1].value);//         text gestionnaire
            console.log(form.items.items[3].items.items[0].items.items[2].value);//         id fournisseur
            console.log(form.items.items[3].items.items[0].items.items[3].value); //        text gestionnaire
            console.log(form.items.items[3].items.items[0].items.items[4].value);//         id poseur
            console.log(form.items.items[3].items.items[0].items.items[5].value);//         text gestionnaire
            console.log(form.items.items[3].items.items[1].items.items[0].items.items[0].value);//         Materiel necessaire
            console.log(form.items.items[3].items.items[1].items.items[0].items.items[1].value);//         coupure route
            console.log(form.items.items[3].items.items[1].items.items[0].items.items[2].value);//         acces
        
            var idVisiteOuvrage= form.idVisiteOuvrage;//   
            console.log("idVisiteOuvrage");      idVisiteOuvrage
            console.log(idVisiteOuvrage);      idVisiteOuvrage
            var longitude= form.items.items[0].items.items[1].items.items[1].value;//         longitude
            var latitude= form.items.items[0].items.items[1].items.items[2].value;//         latitude
            var debut= form.items.items[0].items.items[1].items.items[3].value;//         pr debut
            var fin= form.items.items[0].items.items[1].items.items[4].value;//         pr fin
            var longueur= form.items.items[0].items.items[1].items.items[5].value;//         longueur
            var hauteur= form.items.items[0].items.items[1].items.items[6].value;//         hauteur
            var surface= form.items.items[0].items.items[1].items.items[7].value;//         surface
        
            var famille= form.items.items[2].items.items[0].items.items[0].value;////         Famille ----Grisé----
            var type= form.items.items[2].items.items[0].items.items[1].value;////         Type ----Grisé----
            var departement= form.items.items[2].items.items[0].items.items[2].value;////         Departement
            var geologie= form.items.items[2].items.items[0].items.items[3].value;////         Geologie
            var axe= form.items.items[2].items.items[1].items.items[0].value;//         Axe
            var ville= form.items.items[2].items.items[1].items.items[1].value;//         Ville
            var zone= form.items.items[2].items.items[1].items.items[2].value;//         Zone
        
            var ouvrage= form.items.items[2].items.items[2].items.items[0].value;//         Nom ouvrage
            var etiquette= form.items.items[2].items.items[2].items.items[1].value;//         Etiquette
        
            var idGest= form.items.items[3].items.items[0].items.items[0].value;//         id gestionnaire
            var TxtGest= form.items.items[3].items.items[0].items.items[1].value;//         text gestionnaire
            var idFourn= form.items.items[3].items.items[0].items.items[2].value;//         id fournisseur
            var TxtFourn= form.items.items[3].items.items[0].items.items[3].value; //        text gestionnaire
            var idPos= form.items.items[3].items.items[0].items.items[4].value;//         id poseur
            var TxtPos= form.items.items[3].items.items[0].items.items[5].value;//         text gestionnaire
        
            var materiel= form.items.items[3].items.items[1].items.items[0].items.items[0].value;//         Materiel necessaire
            var coupure= form.items.items[3].items.items[1].items.items[0].items.items[1].value;//         coupure route
            var acces= form.items.items[3].items.items[1].items.items[0].items.items[2].value;//         acces
                
 
            var storePanel=App.get(me.up('panel'),"treepanel");
            console.log("storePanel");
            console.log(storePanel);
            var storePanelStore=App.get(me.up('panel'),"treepanel").getStore().data;
            console.log("storePanelStore");
            console.log(storePanelStore);
       /*             var blob = [];
            blob.push(JSON.stringify(App.get('VUpVisitWork uploadfilemanager#up').getFiles()));*/
                   
            //        var blob = App.get('VUpVisitWork uploadfilemanager#up').getFiles();
        
                        var blobJson = JSON.stringify(App.get('VUpVisitWork uploadfilemanager#up').getFiles());
            var blob = blobJson.replace(/\\/g,"\\\\\\");
            console.log("blob");
            console.log(blob);
            var paramUpdate = [idVisiteOuvrage, longitude, latitude, debut, fin, longueur, hauteur, surface, famille, type, departement, geologie, axe, ville, zone, ouvrage, etiquette, idGest, TxtGest, idFourn, TxtFourn, idPos, TxtPos, materiel, coupure, acces, blob];
        
        
        
        
        
        
       
        
        
        
        
        
        
        
        
        App.Visits.updateOuvrageVisit(paramUpdate,function(response) {
        
            //me.setDisabled(true);
            var store=App.get(me.up('panel'),"treepanel").getStore().data;
            console.log("store visit");
            console.log(store);
  //          App.DB.post('goprro://visite_ouvrages',me.up('panel'),function(r){
  /*              console.log("rrrrrrrr");
                console.log(r);*/
                //if (re.data[0]._BLOB) App.get(me,'uploadfilemanager#up').setFiles(JSON.parse(re.data[0]._BLOB));
        //        if (App.get('VUpVisitWork uploadfilemanager#up').getFiles()) App.get('VUpVisitWork uploadfilemanager#up').setFiles(App.get('VUpVisitWork uploadfilemanager#up').getFiles());
                // On post l'upload
                App.Docs.upload(App.get('VUpVisitWork uploadfilemanager#up').getFiles(),0,function() {
      /*                  var blob = JSON.stringify(App.get('VUpVisitWork uploadfilemanager#up').getFiles());
            console.log("blob visit");
            console.log(blob);
                    var tabUpBlob = [idVisiteOuvrage, blob];
                     App.Visits.updateBlobVisit(blob,function(response) {
        
                     });*/
                    //alert('posté!');
                });

                var Post=[];
                for (var i=0;i<store.items.length;i++) {
                    var descr="";
                    var parent=0;
                    if (store.items[i].data.description) descr=store.items[i].data.description;
                    if (store.items[i].data.parentId) {
                        if (store.items[i].data.parentId.split('c').length>1) parent=store.items[i].data.parentId.split('c')[1];
                    };
                    if (store.items[i].data.leaf) {
                        var dta={
                            nomOAElement: descr,
                            parentOAElement: parent,
                            idVisiteOuvrage: idVisiteOuvrage,
                            idElement: store.items[i].data.name.split('c')[1]//,
                      /*      idType: App.get(me.up('panel'),"combo#type").getValue(),
                            _BLOB: App.get('VUpVisitWork uploadfilemanager#up').getFiles()*/
                        };
                        if (store.items[i].properties) dta.caracteristiques=JSON.stringify(store.items[i].properties);
                        Post.push(dta);
                    };
                };
                App.Elements.delVisitOuvrage(idVisiteOuvrage,function(e) {
                    App.DB.post("goprro://visite_oa_elements",Post,function(r){

                        App.get('VUpVisitWork').close();
                    });
                });
 //           });
        });
        
        
        
        
        
        
    },
    VDate_onShow: function(me)
    {
        App.get("mainform window#Date").show();
        App.get("mainform window#Date").show();
    },
    comboVisitDate: function(me)
    {
        console.log("dans r comboVisitDate");
        var data=[];
        App.DB.get('goprro://campagne',function(r){
            console.log("r comboVisitDate");
            console.log(r);
            
            
            for (var i=0;i<r.result.data.length;i++) {
                if(store.data.items[i].data.select == true)
                {
                     data.push({
                        idCampagne:store.data.items[i].data.idOuvrage,
                        periode:store.data.items[i].data.nomOuvrage
                    })
                }
            }
            
            var store=App.store.create({
                fields:["idCampagne","periode"],data:dataAll
            });
            if(storeAll)
            {
                App.get('VAddVisit grid#gridVisitAdd').bindStore(storeAll);
                storeAll.load();
            };
        });
    },
    onLoad: function(p)
    {
        Auth.login(function(){
            console.log(Auth.User);
        });
        App.loadAPI("http://maps.google.com/maps/api/js?sensor=false&callback=GMap");
        // load wiki
        var html='<li><p class="timeline-date">%DATE%<br><span style="color:#6fc173; font-weight:bold">%TAG%</span></p><div class="timeline-content"><h3>%POSTER%</h3><p>%COMMENT%</p></div></li>';
        var tpl=[];
        App.Notes.getAll({},function(e,r) {
            
            var idDter = Auth.User.idDter;
            for (var i=0;i<r.result.data.length;i++) {
                if ((r.result.data[i].diffusion == 0) || (r.result.data[i].diffusion == idDter))
                    {
                        var results=html;
                        results=results.replace('%DATE%',r.result.data[i].dateNote.toDate().toString('dd/MM/yyyy hh:mm'));
                        results=results.replace('%POSTER%',r.result.data[i].nomprenom);
                        results=results.replace('%COMMENT%',r.result.data[i].texteNote);
                        results=results.replace('%TAG%',r.result.data[i].importance);
                        tpl.push(results);
                    }
            };
            results='<ul class="timeline">'+tpl.join('')+'</ul>';
            App.get('mainform panel#timeline').update(results);
        });
        var tab1=Ext.create("Ext.ux.ribbon.Tab", {
            title: 'Général',
            closable: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Ouvrages',
                    iconAlign: 'top',
                    layout: {
                        type: 'table',
                        columns: 4
                    },
                    items: [{
                        text: 'Nouveau',
                        iconCls: "new",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                        handler: p.showSaisie
                    },
                        {
                            text: 'Carte',
                            iconCls: "map_ico",
                            scale: 'large',
                            iconAlign: 'top',
                            rowspan: 3,
                            handler: p.showMap
                        },
                        {
                            text: 'Liste',
                            iconCls: "list_ico",
                            scale: 'large',
                            iconAlign: 'top',
                            rowspan: 3,
                            handler: p.showGrid
                        }
                    ]
                }
            ]
        });

        var tab2=Ext.create("Ext.ux.ribbon.Tab", {
            title: 'Visites',
            closable: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                title: 'Préparation',
                iconAlign: 'top',
                layout: {
                    type: 'table', 
                    columns: 4
                },
                items: [{
                        text: 'Ajouter',
                        iconCls: "new",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                    //    handler: p.showMapV
                        handler: p.showAddVisit
                    },
                    {
                        text: 'Visite',
                        iconCls: "pencil",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                        handler: p.showVisit
                    }/*,
                    {
                        text: 'Visite',
                        iconCls: "new",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                        handler: p.showVisit
                    }*/
                ]
            }
            
            ]
        });

        var tab3=Ext.create("Ext.ux.ribbon.Tab", {
            title: 'Synchronisation',
            closable: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [

            ]
        });

        var tab4=Ext.create("Ext.ux.ribbon.Tab", {
            title: 'Administration',
            closable: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Paramètres',
                    iconAlign: 'top',
                    layout: {
                        type: 'table',
                        columns: 4
                    },
                    items: [{
                        text: 'Caractéristiques',
                        iconCls: "characteristics",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                        handler: p.showSettingsCharacteristics
                    },{
                        text: 'Eléments',
                        iconCls: "items",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                        handler: p.showSettingsCharacteristics
                    },{
                        text: 'Référentiels',
                        iconCls: "pencil",
                        scale: 'large',
                        iconAlign: 'top',
                        rowspan: 3,
                        handler: p.showSettingsRefs
                    }]
                }
            ]
        });

        App.get('mainform ribbon').addTab(tab1, true);
        App.get('mainform ribbon').addTab(tab2, false);
        App.get('mainform ribbon').addTab(tab3, false);
        App.get('mainform ribbon').addTab(tab4, false);

    }


});
