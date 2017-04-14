App.view.define('VVisit', {

    extend: 'Ext.Panel',
	alias : 'widget.VVisit',
	border: false,
	
	layout: "border",
    
	items: [
    {
        region: "west",
        width: "60%",
        padding: 5,
        border: false,
        itemId: "add_visit",
        layout: "fit",
        split:true,
        //width: 820,
        height: 430,



        tbar: [
        {
            
   /*         xtype: "combo",
            format: 'd m Y',
            dateFormat: 'c',
            itemId: "periode",
            fieldLabel: "Période de visite",
            padding: 5,
            //displayField: "{dateDebut} {dateFin}",
            displayField: "periode",
            valueField: "periode",
            editable: false,
            //store: App.store.create("goprro://campagne",{autoLoad:true}),*/
            xtype: "combo",
            /*format: 'd m Y',
            dateFormat: 'c',*/
            itemId: "idCampagne",
            fieldLabel: "Période de visite",
            padding: 5,
            displayField: "dateDebut"+"dateFin",
            //displayField: "idCampagne",
            valueField: "idCampagne",
            editable: false,
     //       renderer: Ext.util.Format.dateRenderer('mm/dd/yy'),
            store: App.store.create("goprro://campagne{dateDebut,dateFin}",{autoLoad:true}),
     /*       renderer: function(value,a,b,c){
                Ext.Msg.alert('GOPRRO',"test renderer");
                console.log("value");
                console.log(value);
                console.log("a");
                console.log(a);
                console.log("b");
                console.log(b);
                console.log("c");
                console.log(c);
/*
                var items=App.store.familles.data.items;
                var Items={};
                for (var i=0;i<items.length;i++) Items[items[i].data.idFamille]=items[i].data.nomFamille;
                return Items[value];*/

//            },
        }
        ],
        items: [
        {
            xtype: "grid",
            hidden: true,
            itemId: "gridVisit",
            width: "60%",
            columns: 
            [
            {
                itemId: "idCampagne",
                hidden: true,
                flex: 1,
                dataIndex: "idCampagne"
            },
            {
                itemId: "idOuvrage",
                hidden: true,
                flex: 1,
                dataIndex: "idOuvrage"
            },
            {
                itemId: "idVisiteOuvrage",
                hidden: true,
                flex: 1,
                dataIndex: "idVisiteOuvrage"
            },{
                text: "Ouvrage disponible",
                itemId: "nomOuvrage",
                flex: 1,
                dataIndex: "nomOuvrage"
            },{
                text: "Date visite",
                itemId: "dateVisiteOuvrage",
                flex: 1,
                format: 'd m Y',
                dateFormat: 'c',
                dataIndex: "dateVisiteOuvrage"
            },
            {
                text: "Dpt",
                width: 150,
                dataIndex: "nomDepartement"
            },
            {
                text: "Longitude",
                width: 150,
                dataIndex: "oa_y"
            },
            {
                text: "Latitude",
                width: 150,
                dataIndex: "oa_x"
            },
            {
                text: "Supprimer",
                xtype: 'actioncolumn',
                itemId: "delOuvrageVisit", 
                iconCls: "delgrid",
                singleSelect: true,
                listeners: {
                    click: function(sm,index,record) {
                           var grid=this.up('grid');
                           Ext.Msg.confirm('Delete', 'Supprimer ouvrage de la visite pour cette période', function(btn){
                               console.log("btn");
                               console.log(btn);
                           if(btn === 'yes'){
                               var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                                App.Visits.delOuvrageVisit(idVisiteOuvrage,function(response) {
                                var idCampagne = App.get('VVisit #idCampagne').getValue();
                                    if (response === true)
                                    {
                                         App.Visits.delCampagneVisite(idCampagne,function(response) {
                                            var mail = Auth.User.mail;
                                            TMap.clearMarkers();

                                            App.Visits.select(mail,function(response) {

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
                                                var tabDate = [mail, idCampagne];
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

                                                        TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idOuvrage,"colorMarker","visit");
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
                                        });

                                    }
                                    else
                                    {
                                        Ext.Msg.alert('GOPRRO',"Une erreur s'est produite, merci de réessayer.");
                                    }

                                });
                           }
                           else{
                              //some code
                           }
                         });
                        
                        
                    }
                }

            },
            {
                text: "Modifier",
                xtype: 'actioncolumn',
                itemId: "addcom", 
                iconCls: "pencil",
                singleSelect: true,
                listeners: {
                    click: function(sm,index,record) {
                    
        console.log("Modifier");
        console.log(sm.store.data);
        var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
     /*   console.log("idOuvrage");
        console.log(idOuvrage);*/
        console.log("idVisiteOuvrage");
        console.log(idVisiteOuvrage);
        //App.get('mainform panel#southpanel').collapse();
        var form=App.get("mainform panel#UpWork");
        form.idVisiteOuvrage=idVisiteOuvrage;
        form.show();
                      /*  var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                        console.log("modif id viste ouvrage");
                        console.log(idVisiteOuvrage);*/
                        
                    }
                }
            }],
        }],
	},
    {
        region: "west",
        width: "40%",
        itemId: "addVisitMap",
        layout: "fit",
        split:true,
        items: [
        {
            id: "MyGMapPanel3",
            itemId: "map",
            hidden: false,
            html: '<div id="TMapPanel3" style="width:100%;height:100%"></div>',
            padding: 0,
            flex: 1,
            border: false,
            width: "100%",
            border: false,
            split: true,
            
        }
        ]
    }]
});