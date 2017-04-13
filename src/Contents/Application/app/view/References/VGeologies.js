App.view.define('References.VGeologies', {

    extend: 'Ext.Panel',
    alias : 'widget.VGeologies',
    layout: "hbox",
    border: false,

    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            //cls: "referentiel",
            itemId: "ref_geologies",
            split:true,
            width: 350,
            height: 350,
            items: [
                {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Geologies",
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
                            dataIndex: "idGeologie",
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
                            dataIndex: "nomGeologie",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomGeologie",
                                valueField: "nomGeologie",
                            },
                        }
                    ],
                    //store: App.store.create('goprro://familles',{autoLoad: true}),
                    store: App.store.create({fields:["value"],data:[]}),
                    itemId: "T1",
                    title: "Geologies",
                    flex: 1,
                    height: "100%"
                }

            ]
        }
    ]
});