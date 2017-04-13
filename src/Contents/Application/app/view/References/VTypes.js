App.store.familles=App.store.create("goprro://familles",{autoLoad:true});
App.view.define('References.VTypes', {

    extend: 'Ext.Panel',
    alias : 'widget.VTypes',
    layout: "hbox",
    border: false,
    familles:App.store.create("goprro://familles",{autoLoad:true}) ,
    items: [
        {
            region: "center",
            padding: 5,
            border: false,
            itemId: "ref_types",
            layout: "fit",
            split:true,
            width: 500,
            height: 350,
            items: [
                {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Types",
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
                            dataIndex: "idType",
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
                            text: "Famille",
                            dataIndex: "idFamille",
                            renderer: function(value,a,b,c){

                                var items=App.store.familles.data.items;
                                var Items={};
                                for (var i=0;i<items.length;i++) Items[items[i].data.idFamille]=items[i].data.nomFamille;
                                return Items[value];

                            },
                            editor: {
                                xtype: "combo",
                                width: 200,
                                itemId: "cboFamilles",
                                //itemId: "idFamille",
                                valueField: "idFamille",
                                displayField:"nomFamille",
                                store: App.store.familles
                            }
                        },
                        {
                            text: "Nom",
                            dataIndex: "nomType",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomType",
                                valueField: "nomType",
                            },
                        }
                    ],
                    // store: App.store.create('goprro://familles',{autoLoad: true}),
                    //store: App.store.create({fields:["value"],data:[]}),
                    itemId: "T1",
                    title: "Types",
                    flex: 1,
                    height: "100%"
                }

            ]
        }
    ]

});



