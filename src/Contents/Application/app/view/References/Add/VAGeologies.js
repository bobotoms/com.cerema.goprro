App.view.define('References.Add.VAGeologies', {

    
    extend: "Ext.window.Window",
	width: 500,
	height: 200,
	closable: true,
	alias : 'widget.VAGeologies',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
			padding: 5,
			border: false,
			itemId: "ref_geologies",			
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
                        itemId: "nomGeologie",
                        valueField: "nomGeologie",
                        fieldLabel: "Nom geologie",
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



