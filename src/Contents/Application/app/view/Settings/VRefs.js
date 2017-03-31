App.view.define('Settings.VCharacteristics',{
    extend: 'Ext.Panel',
    alias: "widget.VCharacteristics",

    initComponent: function()
    {
        this.title="Caractéristiques";
        this.layout="hbox";
        this.border=false;
        this.width = 820;
        this.height = 430;
        this.bodyStyle="background-color: white";
        this.tbar=[
            {
                xtype: "combo",
                fieldLabel: "Famille",
                padding: 5,
                labelAlign: "top",
                displayField: "nomFamille",
                valueField: "idFamille",
                editable: false,
                store: App.store.create('goprro://familles{nomFamille+,idFamille}',{autoLoad: true}),
                itemId: "cboFamille"
            },
            {
                xtype: "combo",
                fieldLabel: "Type",
                padding: 5,
                labelAlign: "top",
                displayField: "nomType",
                valueField: "idType",
                editable: false,
                store: App.store.create({fields:[],data:[]}),
                itemId: "cboType"
            }
        ];
        this.items = [
            {
                xtype: "treepanel",
                padding: 5,
                border: true,
                height: "100%",
                title: "Catalogue",
                flex: 1,
                rootVisible: false,
                useArrows: true,
                itemId: "T0",
                store: App.store.create("App.Elements.getAllByType",{autoLoad: false,type:"tree"})
            },
            {
                xtype: "grid",
                padding: 5,
                border: true,
                tbar: [
                    '->',
                    {
                        xtype: "button",
                        text: "Ajouter",
                        itemId: "add"
                    }
                ],
                plugins: [
                    {
                        ptype: "cellediting",
                        clicksToEdit: 1
                    }
                ],
                columns: [
                    {
                        text: "Nom",
                        dataIndex: "nomCaracteristique",
                        editor: {
                            xtype: "textfield"
                        }
                    },
                    {
                        text: "Type",
                        dataIndex: "typeCaracteristique",
                        editor: {
                            xtype: "combo",
                            displayField: "value",
                            valueField: "value",
                            editable: false,
                            store: App.store.create({fields:["value"],data:[
                                {
                                    value: "BOOL"
                                },
                                {
                                    value: "STRING"
                                },
                                {
                                    value: "NUMBER"
                                },
                                {
                                    value: "SELECT"
                                }
                            ]})
                        }
                    },
                    {
                        text: "Valeurs",
                        dataIndex: "valeursCaracteristique",
                        flex: 1,
                        editor: {
                            xtype: "textfield"
                        }
                    },
                    {
                        text: "Unité",
                        dataIndex: "uniteCaracteristique",
                        editor: {
                            xtype: "textfield"
                        }
                    }
                ],
                store: App.store.create({fields:[],data:[]}),
                itemId: "T1",
                title: "Caractéristiques",
                flex: 1,
                height: "100%"
            }
        ];
        this.callParent();
    }
});