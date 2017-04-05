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
            itemId: "CPanel2",
            items: [
                {
                    id: "MyGMapPanel2",
                    itemId: "mapV",
                    html: '<div id="TMapPanel2" style="width:100%;height:100%"></div>',
                    padding: 0,
                    flex: 1,
                    border: false,
                    width: "100%",
                    border: false,
                    split: true
                }
            ]
        }
    ]
});
 



















