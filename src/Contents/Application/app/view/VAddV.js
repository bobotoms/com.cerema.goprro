App.view.define('VAddV', {

    extend: 'Ext.Panel',
	alias : 'widget.VAddV',
	border: false,
	
	layout: "border",
    
	items: [
    {
        region: "center",
            split:true,
            layout:"fit",
            itemId: "CPanel",
            items: [
                {
                    id: "MyGMapPanel",
                    itemId: "map",
                    html: '<div id="TMapPanel" style="width:100%;height:100%"></div>',
                    padding: 0,
                    flex: 1,
                    border: false,
                    width: "100%",
                    border: false,
                    split: true
                },
                {
                    xtype: "grid",
                    hidden: true,
                    itemId: "gridO",
                    columns: [
                        {
                            text: "Ouvrage",
                            flex: 1,
                            dataIndex: "nomOuvrage"
                        },
                        {
                            text: "Dpt",
                            width: 150,
                            dataIndex: "nomDepartement"
                        },
                        {
                            text: "Longitude",
                            width: 150,
                            dataIndex: "oa_y"
                        },
                        {
                            text: "Latitude",
                            width: 150,
                            dataIndex: "oa_x"
                        }
                    ],
                    store: App.store.create("App.Ouvrages.getAll",{autoLoad: true})
                }
                ],
    }]
});
 



















