App.view.define('References.VAxes', {

    extend: 'Ext.Panel',
    alias : 'widget.VAxes',
    layout: "hbox",
    border: false,
    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            //cls: "referentiel",
            itemId: "ref_axes",
            split:true,
            width: 350,
            height: 350,
            items: [
                {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Axes",
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
                            dataIndex: "idAxe",
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
                            dataIndex: "nomAxe",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomAxe",
                                valueField: "nomAxe",
                            },
                        }
                        /*,
                         {
                         xtype: 'actioncolumn',
                         text: "Supprimer",
                         itemId: "delRef",
                         items: [
                         {
                         iconCls: "delgrid",
                         }]
                         }*/
                    ],

                    //store: App.store.create("App.Refs.select",{autoLoad: true}),
                    //store: App.store.create('goprro://axes',{autoLoad: true}),
                    store: App.store.create({fields:["value"],data:[]}),
                    itemId: "T1",
                    title: "Axes",
                    flex: 1,
                    height: "100%"
                }

            ]
        }
    ]


});



