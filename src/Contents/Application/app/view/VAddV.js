App.view.define('VAddVisit', {

    extend: 'Ext.Panel',
	alias : 'widget.VAddVisit',
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
                    //id: "MyGMapPanel",
                    itemId: "map",
                    html: '<div id="TMapPanel" style="width:100%;height:100%"></div>',
                    padding: 0,
                    flex: 1,
                    border: false,
                    width: "100%",
                    border: false,
                    split: true
                }
                ],
    }]
});
 



















