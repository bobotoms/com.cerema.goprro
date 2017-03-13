App.view.define('Settings.VRefs',{
	extend: 'Ext.Panel',
	alias: "widget.VRefs",

	initComponent: function()
	{
		this.title="Référentiels";
		this.layout="hbox";
		this.border=false;
		this.width = 820;
        this.height = 430;
		this.bodyStyle="background-color: white";
		this.tbar=[
		{
			xtype: "combo",
			itemId: "cboRefs",
			fieldLabel: "Refs",
			padding: 5,
			displayField: "type",
			valueField: "ref",
			editable: false,
            store: App.store.create({
							fields: ["ref","type"],
							data: [
                                {
								ref: "axes",
								type: "Axes"
							},{
								ref: "familles",
								type: "Familles"
							},{
								ref: "fournisseurs",
								type: "Fournisseurs"
							},{
								ref: "geologies",
								type: "Geologies"
							},{
								ref: "gestionnaires",
								type: "Gestionnaires"
							},{
								ref: "poseurs",
								type: "Poseurs"
							},{
								ref: "types",
								type: "Types"
							},{
								ref: "zones",
								type: "Zones"
							}]
						}),
			//store: App.store.create('goprro://familles{nomFamille+,idFamille}',{autoLoad: true}),	
		}	
		];
		this.items = [
            
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
            },
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_familles",
                hidden: true,			
                split:true,
                width: 350,
                height: 350,
                items: [
                    {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Zones",
                    border: false,
                    tbar: [
                    '->',
                    {
                        xtype: "button",
                        text: "Ajouter",
                        itemId: "clickUpdate"
                    }
                    ],
                    plugins: [
                    {
                        ptype: "cellediting",
                        clicksToEdit: 1
                    }
                    ],
                    columns: [
                        {
                            text: "Nom",
                            dataIndex: "nomFamilles",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomFamille",
                                valueField: "nomFamille",
                            }
                        }
                    ],
                        store: App.store.create({fields:[],data:[]}),
                        itemId: "T1",
                        title: "Zones",
                        flex: 1,
                        height: "100%"
                }]
            },/*
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_familles",
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
            },*/
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
            },
            {
			region: "center",
			padding: 5,
			border: false,
			itemId: "ref_geologies",
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
            },
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_gestionnaires",
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
            },
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
            },
            {
                
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_types",
                hidden: true,			
                split:true,
                padding: {
                    top: 10,
                    left: 10
                },
                items: [{
						xtype: "combo",
						width: 200,
						itemId: "idFamille",
						fieldLabel: "Famille",
						displayField: "nomFamille",
						valueField: "idFamille",
						editable: false,
						store: App.store.create("goprro://familles")
					},{
                    layout: "hbox",
                    border: false,
                    height: 50,
                    items: [{
                        xtype: "textfield",
                        itemId: "nomType",
                        valueField: "nomType",
                        fieldLabel: "Nom type",
                        width: 250
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
            },
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_zones",
                hidden: true,			
                split:true,
                width: 350,
                height: 350,
                items: [
                    {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Zones",
                    border: false,
                    tbar: [
                    '->',
                    {
                        xtype: "button",
                        text: "Ajouter",
                        itemId: "add"
                    }
                    ],
                    plugins: [
                    {
                        ptype: "cellediting",
                        clicksToEdit: 1
                    }
                    ],
                    columns: [
                        {
                            text: "Nom",
                            dataIndex: "nomVilles",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomVille",
                                valueField: "nomVille",
                            }
                        }
                    ],
                        store: App.store.create({fields:[],data:[]}),
                        itemId: "T1",
                        title: "Zones",
                        flex: 1,
                        height: "100%"
                }]
            }/*,
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_zones",
                hidden: true,			
                split:true,
                padding: {
                    top: 10,
                    left: 10
                },
            
                items: [{
						xtype: "combo",
						width: 200,
						itemId: "idVille",
						fieldLabel: "Ville",
						displayField: "nomVille",
						valueField: "idVille",
						editable: false,
						store: App.store.create("goprro://villes{nomVille}")
					},{
                    layout: "hbox",
                    border: false,
                    height: 50,
                    items: [{
                        xtype: "textfield",
                        itemId: "nomZone",
                        valueField: "nomZone",
                        fieldLabel: "Nom zone",
                        width: 250
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
            }*/],
		this.callParent();
	}
});




/*App.view.define('Settings.VRefs',{
	extend: 'Ext.Panel',
	alias: "widget.VRefs",

	initComponent: function()
	{
		this.title="Référentiels";
		this.layout="hbox";
		this.border=false;
		this.width = 820;
        this.height = 430;
		this.bodyStyle="background-color: white";
		this.tbar=[
		{
			xtype: "combo",
			itemId: "cboRefs",
			fieldLabel: "Refs",
			padding: 5,
			displayField: "type",
			valueField: "ref",
			editable: false,
            store: App.store.create({
							fields: ["ref","type"],
							data: [
                                {
								ref: "axes",
								type: "Axes"
							},{
								ref: "familles",
								type: "Familles"
							},{
								ref: "fournisseurs",
								type: "Fournisseurs"
							},{
								ref: "geologies",
								type: "Geologies"
							},{
								ref: "gestionnaires",
								type: "Gestionnaires"
							},{
								ref: "poseurs",
								type: "Poseurs"
							},{
								ref: "types",
								type: "Types"
							},{
								ref: "zones",
								type: "Zones"
							}]
						}),
			//store: App.store.create('goprro://familles{nomFamille+,idFamille}',{autoLoad: true}),	
		}	
		];
		this.items = [
            
            {
			region: "center",			
			split:true,
			items: [
                {
                    xtype: "VAxes",
                    hidden: true
                },
                {
                    xtype: "VFamilles",
                    hidden: true
                },
                {
                    xtype: "VFournisseurs",
                    hidden: true
                },
                {
                    xtype: "VGeologies",
                    hidden: true
                },
                {
                    xtype: "VGestionnaires",
                    hidden: true
                },
                {
                    xtype: "VPoseurs",
                    hidden: true
                },
                {
                    xtype: "VTypes",
                    hidden: true
                },
                {
                    xtype: "VZones",
                    hidden: true
                }
            ]
		}],
		this.callParent();
	}
});*/
























