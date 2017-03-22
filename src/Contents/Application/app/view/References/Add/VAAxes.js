App.view.define('References.Add.VAAxes', {

    //extend: 'Ext.Panel',
	extend: "Ext.window.Window",
	alias : 'widget.VAAxes',
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
			itemId: "ref_axes",		
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



