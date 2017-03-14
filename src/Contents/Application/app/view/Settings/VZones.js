App.view.define('Settings.VZones', {

    extend: 'Ext.Panel',
	alias : 'widget.VZones',
	layout: "hbox",
    border: false,
	items: [
		{
			region: "center",
                padding: 5,
                border: false,
                itemId: "ref_zones",			
                split:true,
                padding: {
                    top: 10,
                    left: 10
                },
                items: [
                    
                     {
                        xtype: "combo",
                        flex: 1,
                        margin: {
                            left: 5
                        },

						itemId: "dpt",
                        fieldLabel: "Département",
                        bindTo: "idDepartement",
                        store: App.store.create("goprro://departements", {
                            autoLoad: true
                        }),
                        editable: false,
                        displayField: "nomDepartement",
                        valueField: "idDepartement",
                        labelAlign: "top"
                    },{
                        xtype: "combo",
                        flex: 1,
                        margin: {
                            left: 5
                        },

						itemId: "idVille",
                        fieldLabel: "Ville", 
						bindTo: "idDepartement",
                        store: App.store.create({fields:[],data:[]}),
                        editable: false,
                        width: "80%",
						bindTo: "idVille",
                        displayField: "ville_nom",
                        valueField: "idVille",
                        labelAlign: "top",
						width: 200
                    },{
                        xtype: "textfield",
                        margin: {
                            left: 5
                        },
                        itemId: "nomZone",
                        valueField: "nomZone",
                        fieldLabel: "Nom zone",
                        labelAlign: "top",
                        width: 200
                    },
                    {
                        xtype: "button",
                        itemId: "clickUpdate",
                        text: "Valider",
                        margin: {
                            left: 5
                        }
                    }
                ]
        }
	]
	
});



