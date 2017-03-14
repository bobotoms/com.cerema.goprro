App.view.define('Settings.VGestionnaires', {

    extend: 'Ext.Panel',
	alias : 'widget.VGestionnaires',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                itemId: "ref_gestionnaires",			
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
                        itemId: "nomGestionnaire",
                        valueField: "nomGestionnaire",
                        fieldLabel: "Nom gestionnaire",
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



