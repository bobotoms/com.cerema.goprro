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
			split:true,
			items: [
               
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
});
























