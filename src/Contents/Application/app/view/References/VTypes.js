App.view.define('References.VTypes', {

    extend: 'Ext.Panel',
	alias : 'widget.VTypes',
	layout: "hbox",
    border: false,
     items: [
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_types",		
                split:true,
                width: 350,
                height: 350,
                items: [
                    {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Types",
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
                        clicksToEdit: 1
                    }
                    ],
                    columns: [
                        
                        {
                            text: "id",
                            dataIndex: "idType",
                            hidden: true,
                            flex: 1,
                        },
                        {
                            text: "Famille",
                            dataIndex: "idFamille",
                            /*editor: {
                            xtype: "combo",
                            width: 200,
                            itemId: "idFamille",
                            valueField: "nomFamille",
                            store: App.store.create("goprro://familles")
                            },*/
                        },
                        {
                            text: "Nom",
                            dataIndex: "nomType",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomType",
                                valueField: "nomType",
                            },
                        }
                    ],
			             //store: App.store.create('goprro://familles',{autoLoad: true}),
                        store: App.store.create({fields:["value"],data:[]}),
                        itemId: "T1",
                        title: "Types",
                        flex: 1,
                        height: "100%"
                }
                    
            ]
        }
	]
	
});



