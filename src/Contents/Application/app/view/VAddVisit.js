App.view.define('VAddVisit', {

    extend: 'Ext.Panel',
	alias : 'widget.VAddVisit',
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
            fieldLabel: "Date visite",
            itemId: "date",
            xtype: "datefield",
            format: 'd m Y',
            dateFormat: 'c',
            width: 200
        }
        ],
       bbar: [
            '->', {

            text: '<b>Enregistrer</b>',
            itemId: "VisitRecord"
        }
        ],

        items: [
        {
            xtype: "grid",
            //hidden: true,
            itemId: "gridVisitAdd",
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
                text: "Ajouter",
                dataIndex: "select",
                editor: {
                    xtype: "checkbox",
                    itemId: "select",
                    cls: 'x-grid-checkheader-editor',singleSelect: true,
                    listeners: {
                        click: function(sm,index,record) {
                            var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                            console.log("modif id viste ouvrage");
                            console.log(idVisiteOuvrage);
                            /*ici, tu mets tous tes traitements lors d'un clic sur une ligne*/
                            /*je t ai mis une alerte ... */
                            /*pour utiliser un parametre de ta ligne, tu utilises record.data.[nom de la colonne]*/

                        },
                        check: function(sm,index,record) {
                            var idVisiteOuvrage = sm.store.data.items[record].data.idVisiteOuvrage;
                            console.log("modif id viste ouvrage");
                            console.log(idVisiteOuvrage);
                            /*ici, tu mets tous tes traitements lors d'un clic sur une ligne*/
                            /*je t ai mis une alerte ... */
                            /*pour utiliser un parametre de ta ligne, tu utilises record.data.[nom de la colonne]*/

                        }
                    }
                },
                
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
            id: "MyGMapPanel2",
            //id: "MyGMapPanel",
            itemId: "map",
            hidden: false,
            html: '<div id="TMapPanel2" style="width:100%;height:100%"></div>',
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
