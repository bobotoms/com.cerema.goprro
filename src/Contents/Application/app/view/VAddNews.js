App.view.define('VAddNews', {

    //extend: 'Ext.Panel',
	extend: "Ext.window.Window",
	alias : 'widget.VAddNews',
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
			itemId: "add_news",		
			split:true,
			items: [{
                    layout: "hbox",
                    border: false,
                    height: 200,
                    padding: {
                        top: 10,
                        left: 10
                    },
                    items: [{
                        xtype: "textarea",
                        itemId: "texteNote",
                        valueField: "texteNote",
                        fieldLabel: "Note",
                        width: 350
                    },
                    {
                        xtype: "button",
                        itemId: "addNews",
                        text: "Valider",
                        margin: {
                            left: 5
                        }
                    }]
                }]
        }
	]
	
});