App.view.define('References.VFamilles', {


    extend: 'Ext.Panel',
    alias : 'widget.VFamilles',
    layout: "hbox",
    border: false,
    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            //cls: "referentiel",
            itemId: "ref_familles",
            split:true,
            width: 350,
            height: 350,
            items: [
                {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Familles",
                    border: false,
                    tbar: [{
                        text: "Supprimer",
                        itemId: "delRef"
                    },
                        '->',
                        {
                            text: "Ajouter",
                            //itemId: "clickUpdate"
                            itemId: "addRef"
                        }],
                    plugins: [
                        {
                            ptype: "cellediting",
                            clicksToEdit: 1
                        }
                    ],
                    columns: [

                        {
                            text: "id",
                            dataIndex: "idFamille",
                            hidden: true,
                            flex: 1,
                        },
                        {
                            xtype: 'checkcolumn',
                            text: "Sélectionner",
                            dataIndex: "select",
                            cls: 'x-grid-checkheader-editor'
                        },
                        {
                            text: "Nom",
                            dataIndex: "nomFamille",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomFamille",
                                valueField: "nomFamille",
                            },
                        }
                    ],
                    //store: App.store.create('goprro://familles',{autoLoad: true}),
                    //store: App.store.create("App.Refs.select",{autoLoad: true}),
                    store: App.store.create({fields:["value"],data:[]}),
                    itemId: "T1",
                    title: "Familles",
                    flex: 1,
                    height: "100%"
                }

            ]
        }
    ]

});

/*
 contextMenu = new Ext.menu.Menu({
 items: [{
 text: 'Edit',
 iconCls: 'edit',
 handler: edit
 }]
 });

 Ext.getCmp('your-button').getEl().on('contextmenu', function(e) {
 e.preventDefault();
 contextMenu.show(Ext.getCmp('your-button').getEl());
 });*/

