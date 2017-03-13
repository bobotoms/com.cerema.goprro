App.view.define('Settings.VAxes', {

    extend: 'Ext.Panel',
	alias : 'widget.VAxes',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
			padding: 5,
			border: false,
			itemId: "ref_axes",
            //cls: "referentiel",
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
                        itemId: "nomAxe",
                        valueField: "nomAxe",
                        fieldLabel: "Nom axe",
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



