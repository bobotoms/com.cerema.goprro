App.view.define('Settings.VFournisseurs', {

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
                hidden: true,			
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
                        itemId: "nomFournisseur",
                        valueField: "nomFournisseur",
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



