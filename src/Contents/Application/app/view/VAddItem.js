App.view.define('VAddItem',{
	extend: 'Ext.window.Window',
	alias: "widget.VAddItem",

	initComponent: function()
	{
		this.title="Catalogue";
		this.layout="hbox";
		this.border=false;
		this.width = 700;
        this.height = 430;
		this.bodyStyle="background-color: white";
        this.bbar = [
			'->',
            {
				text: "Valider",
				itemId: "validate"
			}
        ];	
		this.items = [
		{
			xtype: "treepanel",
			height: "100%",
			border: false,
			flex: 1,
			rootVisible: false,
			useArrows: true,
			itemId: "T0",
			viewConfig: {
                plugins: {
                   ptype: 'treeviewdragdrop',
                   enableDrag: true,
                   enableDrop: false
                }
            },			
			store: App.store.create("App.Elements.getAllByType",{autoLoad: false,type:"tree"})
		},
		{
			width: 70,
			height: "100%",
			bodyStyle: "background-color:#EEEEEE",
			border: false,
			layout: "vbox",
			items: [
			{
				flex: 1,
				border: false
			},
			{
				xtype: "button",
				text: ">>",
				itemId: "AddItem",
				width: "100%",
				height: 24,
				margin: {
					left:10,
					right: 10,
					bottom: 10
				}
			},
			{
				xtype: "button",
				text: "<<",
				itemId: "RemoveItem",
				width: "100%",
				height: 24,
				margin: {
					left:10,
					right: 10
				}
			},
			{
				flex: 1,
				border: false
			}
			]
		},
		{
			xtype: "treepanel",
			height: "100%",
			border: false,
			itemId: "T1",
			flex: 1,
			rootVisible: false,
			useArrows: true,
			height: "100%",
			border: false,
			viewConfig: {
                plugins: {
                   ptype: 'treeviewdragdrop',
                   enableDrag: false,
                   enableDrop: true,
				   appendOnly: false
                }
            },			
			store: App.store.create({fields:"",data:[],type:"tree"})
		}
		];
		this.callParent();
	}
});