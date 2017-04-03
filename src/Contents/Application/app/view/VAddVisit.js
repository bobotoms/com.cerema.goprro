App.view.define('VAddVisit', {

    extend: 'Ext.Panel',
	alias : 'widget.VAddVisit',
	border: false,
	
	layout: "border",
    
	items: [
        {
            region: "center",
            padding: 5,
            border: false,
            itemId: "ref_zones",
            layout: "fit",
            split:true,
            width: 820,
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
            },*//*
            {
            region: "center",			
			split:true,
            width:"100%",
			layout:"fit",
			itemId: "CPanel",
			items: [*/
				
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
                }/*,                                 
                {


                    id: "MyGMapPanel-Visit",
                    itemId: "map",
                    html: '<div id="TMapPanel" style="width:100%;height:100%"></div>',
                    padding: 0,
                    flex: 1,
                    border: false,
                    width: "100%",
                    border: false,
                    split: true
                   
                }*//*,
				{
					xtype: "grid",
					hidden: true,
					itemId: "gridO",
					columns: [
						{
							text: "Ouvrage",
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
						}
					],
					store: App.store.create("App.Ouvrages.getAll",{autoLoad: true})
				}*/
                
 /*           
            ]
            
            
            }       */
            
            
        ],
	}]
});
