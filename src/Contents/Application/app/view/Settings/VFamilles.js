App.view.define('Settings.VFamilles', {

    extend: 'Ext.Panel',
	alias : 'widget.VFamilles',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                itemId: "ref_familles",			
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
                        itemId: "nomFamille",
                        valueField: "nomFamille",
                        fieldLabel: "Nom famille",
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



