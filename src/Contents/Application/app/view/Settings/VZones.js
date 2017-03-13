App.view.define('Settings.VZones', {

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
                hidden: true,			
                split:true,
                padding: {
                    top: 10,
                    left: 10
                },
                items: [{
						xtype: "combo",
						width: 200,
						itemId: "idVille",
						fieldLabel: "Ville",
						displayField: "nomVille",
						valueField: "idVille",
						editable: false,
						store: App.store.create("goprro://villes")
					},{
                    layout: "hbox",
                    border: false,
                    height: 50,
                    items: [{
                        xtype: "textfield",
                        itemId: "nomZone",
                        valueField: "nomZone",
                        fieldLabel: "Nom zone",
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



