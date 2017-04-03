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
            //store: App.store.create("goprro://departements",{autoLoad:true}),
        }
        ],
/*       bbar: [
            '->', {

            text: '<b>Enregistrer</b>',
            itemId: "VisitRecord"
        }
        ],*/

        items: [
            /*{
            id: "TestMyGMapPanel",
                //id: "MyGMapPanel",
            itemId: "map",
            html: '<div id="TMapPanel" style="width:50%;height:100%"></div>',
            padding: 0,
            flex: 1,
            border: false,
            width: "40%",
            border: false,
            split: true
        },*/
        {
            xtype: "grid",
            hidden: true,
            itemId: "gridVisit",
            width: "60%",
            columns: 
            [{
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
                //xtype: 'column',
                text: "Supprimer",
                dataIndex: "del",
                iconCls: "pencil",
            },
            {
                //xtype: 'column',
                text: "Ajouter Commmentaire",
                dataIndex: "addcom",
                iconCls: "pencil",
            }],
            //store: App.store.create("App.Ouvrages.select",{autoLoad: true})
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
        //width: 820,
        height: 430,

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