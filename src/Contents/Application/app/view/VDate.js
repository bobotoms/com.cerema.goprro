App.view.define('VDate', {

    extend: "Ext.window.Window",
	alias : 'widget.VDate',
	border: false,
	width: 1200,
	height: 600,
	closable: true,
    closeAction:'hide',
	layout: "border",
	//itemId : "VisiteWork", 
    bbar: [
            '->', {

            text: '<b>Ajouter</b>',
            itemId: "visitWork"
        }
        ],
	
	items: [{
        fieldLabel: "Date visite",
        itemId: "dateDebut",
        xtype: "datefield",
        format: 'd m Y',
        dateFormat: 'c',
        width: 200
    }]
	
});