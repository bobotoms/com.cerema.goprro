App.view.define('References.Add.VAPoseurs', {

    extend: "Ext.window.Window",
	width: 500,
	height: 200,
	closable: true,
	alias : 'widget.VAPoseurs',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                itemId: "ref_poseurs",			
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
                        itemId: "poseur",
                        valueField: "poseur",
                        fieldLabel: "Nom poseur",
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
