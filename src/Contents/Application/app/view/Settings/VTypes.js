App.view.define('Settings.VTypes', {

    extend: 'Ext.Panel',
	alias : 'widget.VTypes',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                itemId: "ref_types",		
                split:true,
                padding: {
                    top: 10,
                    left: 10
                },
                items: [{
						xtype: "combo",
						width: 200,
						itemId: "idFamille",
						fieldLabel: "Famille",
						displayField: "nomFamille",
						valueField: "idFamille",
						editable: false,
						store: App.store.create("goprro://familles")
					},{
                    layout: "hbox",
                    border: false,
                    height: 50,
                    items: [{
                        xtype: "textfield",
                        itemId: "nomType",
                        valueField: "nomType",
                        fieldLabel: "Nom type",
                        width: 250
                    },
                    {
                        xtype: "button",
                        itemId: "clickUpdate",
                        text: "Valider",
                        margin: {
                            left: 5
                        }
                    }]
                }]
        }
	]
	
});



