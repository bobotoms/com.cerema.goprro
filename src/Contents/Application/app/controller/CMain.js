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
	TMap.setMarker=function(l,m,title,idOuvrage) {
		var marker=new google.maps.Marker({
			position: new google.maps.LatLng(l,m),
			animation: google.maps.Animation.DROP,
			title: title,
			itemId: idOuvrage
		});
		marker.setMap(TMap.map);
		marker.addListener('click', function(x) {
			hideForms();
			var form=App.get("mainform panel#Saisie");
			form.idOuvrage=this.itemId;
			form.show();	
  		});
		TMap.markers.push(marker);
		return marker;
	};
	TMap.clearMarkers=function() {
		for (var i = 0; i < TMap.markers.length; i++) {
    		TMap.markers[i].setMap(null);
  		}	
	};

	App.DB.get("goprro://ouvrages{idOuvrage,oa_x,oa_y,nomOuvrage,idOuvrage}",function(r) {
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
		"Settings.VRefs"
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
			"VSaisie treepanel": {
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
			"VAddItem button#AddItem": {
				click: "AddItem_click"
			},
			"VAddItem button#RemoveItem": {
				click: "RemoveItem_click"
			},
			"VAddItem button#validate": {
				click: "validate_catalog"
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
			}

		});
		
		App.init('VMain',function(){
			p.onLoad(p);
		});
		
	},
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
	zones_dpt_onselect: function(me,_store) {
		var store=App.store.create('goprro://villes{idVille,ville_nom+}?ville_departement='+_store.data.codeDepartement);
		App.get('VZones combo#idVille').bindStore(store);
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
		App.DB.post('goprro://ouvrages',me.up('panel'),function(r){
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
            console.log("sm");
            console.log(sm);

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
	add_item_click: function(me) {
		App.view.create('VAddItem',{modal: true,type_item: App.get(me.up('panel').up('panel').up('panel'),'combo#type').getValue()}).show().center();	
	},
	famille_select: function(me) {
		App.get('VSaisie combo#type').setValue('');
		var store=App.store.create('goprro://types{idType,nomType+}?idFamille='+me.getValue());
		App.get('VSaisie combo#type').bindStore(store);
		App.get('VSaisie combo#type').getStore().load();
	},
	showSaisie: function() {
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
		hideForms();

		TMap.clearMarkers();
		App.get("mainform panel#map").show();
		App.DB.get("goprro://ouvrages{idOuvrage,oa_x,oa_y,nomOuvrage,idOuvrage}",function(r) {
			for (var i=0;i<r.data.length;i++) {
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
	click_news: function() {
        
        App.view.create('VAddNews',{modal:true}).show().center();
	},
	add_news: function() {
        
        var mail = Auth.User.mail;
        var news = App.get('VAddNews textarea#texteNote').getValue();
        var tabNews = [mail, news]
        App.AddNews.insert(tabNews,function(response) {
            App.get('VAddNews').close();
            if (response === true)
            Ext.Msg.alert('GOPRRO',"Votre commentaire est enregistré.");
            else
            Ext.Msg.alert('GOPRRO',"Une erreur s'est produite, merci de réessayer.");
                
        })
	},
	onLoad: function(p)
	{
         Auth.login(function(){
           console.log(Auth.User); 
        });
		App.loadAPI("http://maps.google.com/maps/api/js?sensor=false&callback=GMap");
		// load wiki
		var html='<li><p class="timeline-date">%DATE%</p><div class="timeline-content"><h3>%POSTER%</h3><p>%COMMENT%</p></div></li>';
        var tpl=[];
		App.Notes.getAll({},function(e,r) {
			console.log(r);
			for (var i=0;i<r.result.data.length;i++) {
				var results=html;
				results=results.replace('%DATE%',r.result.data[i].dateNote.toDate().toString('dd/MM/yyyy hh:mm'));
				results=results.replace('%POSTER%',r.result.data[i].nomprenom);
				results=results.replace('%COMMENT%',r.result.data[i].texteNote);
				tpl.push(results);
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
