App.view.define('References.VGestionnaires', {

    extend: 'Ext.Panel',
    alias : 'widget.VGestionnaires',
    layout: "hbox",
    border: false,
    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            //cls: "referentiel",
            itemId: "ref_gestionnaires",
            split:true,
            width: 350,
            height: 350,
            items: [
                {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Gestionnaires",
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
                            clicksToEdit: 2
                        }
                    ],
                    columns: [

                        {
                            text: "id",
                            dataIndex: "idGestionnaire",
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
                            dataIndex: "gest",
                            editor: {
                                xtype: "textfield",
                                itemId: "gest",
                                valueField: "gest",
                            },
                        }
                    ],
                    //store: App.store.create('goprro://familles',{autoLoad: true}),
                    store: App.store.create({fields:["value"],data:[]}),
                    itemId: "T1",
                    title: "Gestionnaires",
                    flex: 1,
                    height: "100%"
                }

            ]
        }
    ]

});



