App.view.define('VDate', {

    extend: "Ext.window.Window",
	alias : 'widget.VDate',
	border: false,
	width: 200,
	height: 100,
	closable: true,
    closeAction:'hide',
	layout: "border",
	//itemId : "VisiteWork", 
    bbar: [
            '->', {

            text: '<b>Ajouter</b>',
            itemId: "visitWorkDate"
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