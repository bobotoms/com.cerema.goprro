App.view.define('References.VZones', {

    extend: 'Ext.Panel',
    alias : 'widget.VZones',
    layout: "hbox",
    border: false,

    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            itemId: "ref_zones",
            layout: "fit",
            split:true,
            width: 350,
            height: 350,



            tbar: [
                {
                    xtype: "combo",
                    itemId: "cboDepartements",
                    fieldLabel: "Départements",
                    padding: 5,
                    displayField: "nomDepartement",
                    valueField: "codeDepartement",
                    editable: false,
                    store: App.store.create("goprro://departements",{autoLoad:true}),

                }
            ],

            items: [
                {
                    region: "center",
                    split:true,
                    items: [
                        {
                            xtype: "grid",
                            hidden: true,
                            border: false,
                            tbar: [
                                {
                                    text: "Supprimer",
                                    itemId: "delRef"
                                },
                                '->',
                                {
                                    text: "Ajouter",
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
                                    dataIndex: "idZone",
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
                                    dataIndex: "idVille",
                                    hidden: true,
                                },
                                {

                                    text: "Ville",
                                    dataIndex: "nomVille",
                                    itemId: "cboVilles",
                                    editor: {
                                        xtype: "combo",
                                        displayField: "nomVille",
                                        //valueField: "nomVille",
                                        store: App.store.create('goprro://villes{nomVille+}?ville_departement=-1', {
                                            autoLoad: false
                                        }),
                                    }
                                },
                                {
                                    text: "Nom",
                                    dataIndex: "nomZone",
                                    itemId: "nomZone",
                                    editor: {
                                        xtype: "textfield",
                                        valueField: "nomZone",
                                    },
                                }
                            ],
                            itemId: "T1",
                            title: "Zones",
                            flex: 1,
                            height: "100%"
                        }
                    ]
                }],

        }]
});


