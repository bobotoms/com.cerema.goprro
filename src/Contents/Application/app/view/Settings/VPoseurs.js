App.view.define('Settings.VPoseurs', {

    extend: 'Ext.Panel',
	alias : 'widget.VPoseurs',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_poseurs",
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
                        itemId: "nomPoseur",
                        valueField: "nomPoseur",
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



