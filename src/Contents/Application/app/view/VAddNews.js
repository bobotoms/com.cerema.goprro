App.view.define('VAddNews', {

    //extend: 'Ext.Panel',
    extend: "Ext.window.Window",
    alias : 'widget.VAddNews',
    width: 500,
    height: 200,
    closable: true,
    layout: "hbox",
    border: false,
    bbar: [
            '->', {
            xtype: "button",
            itemId: "addNews",
            text: "Valider",
            margin: {
                left: 5
            }
        }
    ],
    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            itemId: "add_news",
            split:true,
            items: [{
                layout: "vbox",
                border: false,
                height: 200,
                padding: {
                    top: 10,
                    left: 10
                },
                items: [{
                    xtype: "combo",
                    itemId: "diffusion",
                    fieldLabel: "Diffusion",
                    displayField: "diffusion",
                    valueField: "diffusion",
                    editable: false,
                    store: App.store.create({fields:["diffusion"],data:[
                        {
                            value: "DTer"
                        },
                        {
                            value: "National"
                        }
                    ]})
                },{
                    xtype: "textarea",
                    itemId: "texteNote",
                    valueField: "texteNote",
                    fieldLabel: "Note",
                    width: 350
                },{
                    xtype: "combobox",
                    itemId: "importance",
                    fieldLabel: "Niveau d'importance",
                    valueField: "tag",
                    editable: false,
                    store: App.store.create({fields:["tag"],data:[
                        {
                            value: "Urgent"
                        },
                        {
                            value: "Non-urgent"
                        },
                        {
                            value: "Important"
                        },
                        {
                            value: "Non-important"
                        }
                    ]})
                }]
            }]
        }
    ]

});