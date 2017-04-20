App.view.define('VAddNews', {

    //extend: 'Ext.Panel',
    extend: "Ext.window.Window",
    alias : 'widget.VAddNews',
    width: 400,
    height: 230,
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
                    fieldLabel: "Portée du message",
                    displayField: "diffusion",
                    valueField: "diffusion",
                    editable: false,
                    value: 'DTer',
                    store: App.store.create({fields:["diffusion"],data:[
                        {
                            diffusion: "DTer"
                        },
                        {
                            diffusion: "National"
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
                    displayField: "tag",
                    editable: false,
                    value: 'Important',
                    store: App.store.create({fields:["tag"],data:[
                        {
                            tag: "Urgent"
                        },
                        {
                            tag: "Important"
                        },
                        {
                            tag: "Normal"
                        },
                        {
                            tag: "Information"
                        }
                    ]})
                }]
            }]
        }
    ]

});