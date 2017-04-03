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
            //altFormats: 'd,m,Y|d-m-Y',
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
            //hidden: true,
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
                xtype: 'checkcolumn',
                text: "Ajouter",
                dataIndex: "select",
                editor: {
                    xtype: "checkbox",
                    cls: 'x-grid-checkheader-editor'
                }
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
        }
        ]
    }]
});
