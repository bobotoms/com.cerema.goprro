App.view.define('References.VPoseurs', {

    extend: 'Ext.Panel',
    alias : 'widget.VPoseurs',
    layout: "hbox",
    border: false,
    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            //cls: "referentiel",
            itemId: "ref_poseurs",
            split:true,
            width: 350,
            height: 350,
            items: [
                {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Poseurs",
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
                            dataIndex: "idPoseur",
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
                            dataIndex: "poseur",
                            editor: {
                                xtype: "textfield",
                                itemId: "poseur",
                                valueField: "poseur",
                            },
                        }
                    ],
                    //store: App.store.create('goprro://familles',{autoLoad: true}),
                    store: App.store.create({fields:["value"],data:[]}),
                    itemId: "T1",
                    title: "Poseurs",
                    flex: 1,
                    height: "100%"
                }

            ]
        }
    ]
});



