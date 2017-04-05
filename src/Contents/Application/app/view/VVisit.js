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
                id: "idtest",
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
                xtype: 'actioncolumn',
                itemId: "delOuvrageVisit", 
                iconCls: "delgrid",
                singleSelect: true,
                listeners: {
                    click: function(sm,index,record) {
                        var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                        
                        var grid=this.up('grid');
                        console.log("del id viste ouvrage");
                        console.log(idVisiteOuvrage);
                        App.Visits.delOuvrageVisit(idVisiteOuvrage,function(response) {
                            if (response === true)
                            {
                                
                                grid.store.load();
                                //this.grid.store.load();
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
        region: "east",
        width: "40%",
        padding: 5,
        border: false,
        itemId: "Rref_zones",
        layout: "fit",
        split:true,

        items: [
        {
            id: "Test2MyGMapPanel",
            hidden: true,
            itemId: "map",
            html: '<div id="TMapPanel" style="width:50%;height:100%"></div>',
            padding: 0,
            flex: 1,
            border: false,
            width: "40%",
            border: false,
            split: true
        }
        ]
    }]
});