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
            
            xtype: "combo",
            format: 'd m Y',
            dateFormat: 'c',
            itemId: "dateVisit",
            fieldLabel: "Date visite",
            padding: 5,
            displayField: "dateVisiteOuvrage",
            valueField: "dateVisiteOuvrage",
            editable: false,
        }
        ],
/*       bbar: [
            '->', {

            text: '<b>Enregistrer</b>',
            itemId: "VisitRecord"
        }
        ],*/

        items: [
        {
            xtype: "grid",
            hidden: true,
            itemId: "gridVisit",
            width: "60%",
            columns: 
            [
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
                        var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                        var idVisiteOuvrage2 = record.data.idVisiteOuvrage;
                        console.log("idVisiteOuvrage");
                        console.log(idVisiteOuvrage);
                        console.log("idVisiteOuvrage2");
                        console.log(idVisiteOuvrage2);
                        var data =sm.store.data.items[record].data;
                        var grid=this.up('grid');
                        App.Visits.delOuvrageVisit(idVisiteOuvrage,function(response) {
                            if (response === true)
                            {
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
                                    var choixDate = App.get('VVisit combo#dateVisit').getValue();
                                    var tabDate = [mail, choixDate];
                                    App.Visits.selectVisitDate(tabDate,function(response) {
                                        var data=[];
                                        for (var i=0;i<response.length;i++) {
                                            data.push({
                                                idOuvrage:response[i].idOuvrage,
                                                idVisiteOuvrage:response[i].idVisiteOuvrage,
                                                nomOuvrage:response[i].nomOuvrage,
                                                nomDepartement:response[i].nomDepartement,
                                                oa_x:response[i].oa_x,
                                                oa_y:response[i].oa_y
                                            })

                                            TMap.setMarker(response[i].oa_y,response[i].oa_x,response[i].nomOuvrage,response[i].idOuvrage,"jaune","visit");
                                        };
                                        var store=App.store.create({
                                            fields:["idOuvrage","idVisiteOuvrage","nomOuvrage","nomDepartement","oa_x","oa_y"],data:data
                                        });
                                        if(store)
                                        {
                                            App.get('VVisit grid#gridVisit').bindStore(store);
                                            store.load();
                                        }
                                        App.get('VVisit grid').show();

                                    });


                                });
                                Ext.Msg.alert('GOPRRO',"Ouvrage supprimé de la visite.");

                            }
                            else
                            {
                                Ext.Msg.alert('GOPRRO',"Une erreur s'est produite, merci de réessayer.");
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
                        var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                        console.log("modif id viste ouvrage");
                        console.log(idVisiteOuvrage);
                        /*ici, tu mets tous tes traitements lors d'un clic sur une ligne*/
                        /*je t ai mis une alerte ... */
                        /*pour utiliser un parametre de ta ligne, tu utilises record.data.[nom de la colonne]*/
                        
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