App.view.define('References.VFournisseurs', {

    extend: 'Ext.Panel',
	alias : 'widget.VFournisseurs',
	layout: "hbox",
    border: false,
    items: [
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_fournisseurs",		
                split:true,
                width: 350,
                height: 350,
                items: [
                    {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Fournisseur",
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
                            dataIndex: "idFournisseur",
                            hidden: true,
                            flex: 1,
                        },
                        {
                            text: "Nom",
                            dataIndex: "fournisseur",
                            editor: {
                                xtype: "textfield",
                                itemId: "fournisseur",
                                valueField: "fournisseur",
                            },
                        }
                    ],
			             //store: App.store.create('goprro://familles',{autoLoad: true}),
                        store: App.store.create({fields:["value"],data:[]}),
                        itemId: "T1",
                        title: "Fournisseur",
                        flex: 1,
                        height: "100%"
                }
                    
            ]
        }
	]	
});



