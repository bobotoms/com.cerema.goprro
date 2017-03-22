App.view.define('References.Add.VAFournisseurs', {
    extend: "Ext.window.Window",
	alias : 'widget.VAFournisseurs',
	width: 500,
	height: 200,
	closable: true,
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                itemId: "ref_fournisseurs",		
                split:true,
                items: [{
                    layout: "hbox",
                    border: false,
                    height: 50,
                    padding: {
                        top: 10,
                        left: 10
                    },
                    items: [{
                        xtype: "textfield",
                        itemId: "fournisseur",
                        valueField: "fournisseur",
                        fieldLabel: "Nom fournisseur",
                        width: 350
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



