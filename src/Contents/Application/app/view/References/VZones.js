App.view.define('References.VZones', {

    extend: 'Ext.Panel',
	alias : 'widget.VZones',
	layout: "hbox",
    border: false,
    items: [
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_zones",		
                split:true,
                width: 350,
                height: 350,
                items: [
                    {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Zones",
                    border: false,
                     tbar: [{
                             text: "Supprimer",
                            itemId: "clickDel"
                        },
                        '->',
                            {
                            text: "Ajouter",
                            //itemId: "clickUpdate"
                            itemId: "addRef"
                    }],
                    plugins: [
                    {
                        ptype: "cellediting",
                        clicksToEdit: 2
                    }
                    ],
                    columns: [
                        
                        {
                            text: "id",
                            dataIndex: "idZone",
                            hidden: true,
                            flex: 1,
                        },
                        {
                            text: "Ville",
                            dataIndex: "idVille",
                            editor: {
                                xtype: "combo",
                                width: 200,
                                itemId: "idVille",
                                valueField: "nomVille",
                                store: App.store.create("goprro://villes")
                            },
                        },
                        {
                            text: "Nom",
                            dataIndex: "nomZone",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomZone",
                                valueField: "nomZone",
                            },
                        }
                    ],
			             //store: App.store.create('goprro://familles',{autoLoad: true}),
                        store: App.store.create({fields:["value"],data:[]}),
                        itemId: "T1",
                        title: "Zones",
                        flex: 1,
                        height: "100%"
                }
                    
            ]
        }
	]	
});



