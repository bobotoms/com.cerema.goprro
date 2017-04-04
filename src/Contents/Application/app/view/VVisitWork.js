App.view.define('VVisitWork', {

    extend: "Ext.window.Window",
	alias : 'widget.VVisitWork',
	border: false,
	width: 1200,
	height: 800,
	closable: true,
	
	layout: "border",
	
	items: [{
                region: "west",
                layout: "vbox",
                width: "25%",
                split: true,
                items: [{
                    xtype: "textfield",
                    bindTo: "idOuvrage",
                    hidden: true
                }, {
                    border: true,
                    layout: "vbox",
                    border: false,
                    width: "100%",
                    items: [{
                        border: true,
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        },
                        height: 200,
                        width: "100%",
                        baseCls: "bridge"
                    }, {
                        xtype: "textfield",
                        fieldLabel: "Longitude",
                        bindTo: "oa_y",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }, {
                        xtype: "textfield",
                        fieldLabel: "Latitude",
                        bindTo: "oa_x",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }, {
                        xtype: "textfield",
                        fieldLabel: "PR Début",
                        bindTo: "PRDebut",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }, {
                        xtype: "textfield",
                        fieldLabel: "PR Fin",
                        bindTo: "PRFin",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }, {
                        xtype: "textfield",

                        fieldLabel: "Longueur (en m)", 
						bindTo: "longueur",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }, {
                        xtype: "textfield",

                        fieldLabel: "Hauteur (en m)", 
						bindTo: "hauteur",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }, {
                        xtype: "textfield",

                        fieldLabel: "Surface (en m<sup>2</sup>)", 
						bindTo: "surface",
                        width: "100%",
                        margin: {
                            left: 10,
                            top: 10,
                            right: 10
                        }
                    }]

                }]
            }, {
                region: "center",
                layout: "vbox",
                split: "center",
                width: "50%",
                items: [{
                    layout: "hbox",
                    width: "100%",
                    border: false,
                    padding: 10,
                    items: [{
                        xtype: "combo",
                        fieldLabel: "Famille",
                        bindTo: "idFamille",
                        itemId: "famille",
                        editable: false,
                        store: App.store.create('goprro://familles{nomFamille+,idFamille}', {
                            autoLoad: true
                        }),
                        displayField: "nomFamille",
                        valueField: "idFamille",
                        labelAlign: "top"
                    }, {
                        xtype: "combo",
                        fieldLabel: "Type",
                        bindTo: "idType",
                        itemId: "type",
                        editable: false,
                        width: 150,
                        margin: {
                            left: 5
                        },
                        store: App.store.create({
                            fields: [],
                            data: []
                        }),
                        displayField: "nomType",
                        valueField: "idType",
                        labelAlign: "top"
                    }, {
                        xtype: "combo",
                        flex: 1,
                        margin: {
                            left: 5
                        },

						itemId: "dpt",
                        fieldLabel: "Département",
                        bindTo: "idDepartement",
                        store: App.store.create("goprro://departements", {
                            autoLoad: true
                        }),
                        editable: false,
                        displayField: "nomDepartement",
                        valueField: "idDepartement",
                        labelAlign: "top"
                    }, {
                        xtype: "combo",
                        flex: 1,
                        margin: {
                            left: 5
                        },
                        fieldLabel: "Géologie",
                        bindTo: "idGeologie",
                        store: App.store.create("goprro://geologies", {
                            autoLoad: true
                        }),
                        editable: false,
                        displayField: "nomGeologie",
                        valueField: "idGeologie",
                        labelAlign: "top"
                    }]
                }, {
                    layout: "hbox",
                    border: false,
                    width: "100%",
                    padding: 10,
                    items: [{
                        xtype: "combo",
                        fieldLabel: "Axe",

                        width: "20%", 
						bindTo: "idAxe",
                        store: App.store.create("goprro://axes",{autoLoad:true}),
                        editable: false,
                        displayField: "nomAxe",
                        valueField: "idAxe",
                        labelAlign: "top"
                    }, {
                        xtype: "combo",
                        flex: 1,
                        margin: {
                            left: 5
                        },

						itemId: "ville",
                        fieldLabel: "Ville", 
						bindTo: "idGeologie",
                        store: App.store.create({fields:[],data:[]}),
                        editable: false,
                        width: "80%",
						bindTo: "idVille",
                        displayField: "ville_nom",
                        valueField: "idVille",
                        labelAlign: "top"
                    }, {
                        xtype: "combo",
                        fieldLabel: "Zone",
						itemId: "zone",
						editable: false,
						displayField: "nomZone",
						valueField: "idZone",
						bindTo: "idZone",
						store: App.store.create({fields:[],data:[]}),
                        margin: {
                            left: 5
                        },
                        labelAlign: "top",
                        width: "100%",
                        flex: 1
                    }]

                }, 
				{
					layout: "hbox",
					width: "100%",
					border: false,
					items: [
						{
							xtype: "textfield",
							padding: 10,
							flex: 1,
							border: false,
							fieldLabel: "Nom de l'ouvrage",
							bindTo: "nomOuvrage",
							labelAlign: "top"
						}, {
							xtype: "textfield",
							flex: 1,
							padding: 10,
							border: false,
							fieldLabel: "Etiquette",
							bindTo: "etiquetteOuvrage",
							labelAlign: "top"
						}						
					]
				}, 
				{
                    layout: "hbox",
                    padding: 10,
                    width: "100%",
                    height: 200,
                    items: [{
                        xtype: "treepanel",
                        flex: 2,
                        height: "100%",
                        border: false,
                        rootVisible: false,
                        tbar: [
                            '->', {
                                text: "Ajouter/Modifier",
                                iconCls: "update",
                                itemId: "add_item"
                            }
                        ],
                        columns: [{
                            xtype: 'treecolumn',
                            text: 'Eléments',
                            dataIndex: 'text',
                            width: 250,
                            sortable: true
                        }, {
                            text: 'Description',
                            dataIndex: 'description',
                            flex: 1,
                            sortable: true,
                            editor: {
                                xtype: "textfield"
                            }
                        }],
                        plugins: {
                            ptype: 'cellediting'
                        },
                        store: App.store.create({
                            fields: ["text", "description", "values"],
                            data: [],
                            type: "tree"
                        })
                    }, {
                        border: true,
                        width: 2,
                        height: "100%"
                    }, {
                        border: false,
                        flex: 1,
                        height: "100%",
                        layout: "fit",
                        items: [{
                            xtype: 'propertygrid',
                            flex: 1,
                            border: false,
                            height: "100%",
                            source: {},
                            sourceConfig: {}
                        }]
                    }]
                }, {

                    xtype: "uploadfilemanager",
					itemId: "up",
                    flex: 1,
                    width: "100%",
                    padding: 10,
					bindTo: "_BLOB"
                }]
            },




            {
                title: 'Informations complémentaires',
                itemId: "clientpanel",
                region: 'east',
                itemId: "eastpanel",
                margins: '5 0 0 0',
                cmargins: '5 5 0 0',
                width: 350,
                minSize: 350,
                maxSize: 350,
                layout: "accordion",
                collapsible: true,
                items: [{
                    layout: "vbox",
                    width: "100%",
                    title: "Général",
                    items: [{
                            xtype: "combo",
                            fieldLabel: "Gestionnaire",
                            editable: false,
                            itemId: "cboclient",

                            store: App.store.create("goprro://gestionnaires",{autoLoad:true}),
                            displayField: "gest",
                            valueField: "idGestionnaires",
                            bindTo: "id_gestionnaire",
                            labelAlign: "top",
                            padding: 4,
                            width: "100%"
                        }, 
						{
							xtype: "textarea",
							width: "100%",

							bindTo: "txt_gestionnaire",
							padding: 4,
							flex: 1
						},
						{
                            xtype: "combo",
                            fieldLabel: "Fournisseur",
                            itemId: "cboservice",
                            editable: false,

                            store: App.store.create("goprro://fournisseurs",{autoLoad:true}),
                            displayField: "fournisseur",
                            valueField: "idFournisseurs",
                            bindTo: "id_fournisseur",
                            labelAlign: "top",
                            padding: 4,
                            width: "100%"
                        }, {
							xtype: "textarea",
							padding: 4,
							width: "100%",

							bindTo: "txt_fournisseur",
							flex: 1
						},
						{
                            xtype: "combo",
                            fieldLabel: "Poseur",
                            itemId: "cboposeur",
                            editable: false,

                            store: App.store.create("goprro://poseurs",{autoLoad:true}),
                            displayField: "poseur",
                            valueField: "idPoseurs",
                            bindTo: "id_poseur",
                            labelAlign: "top",
                            padding: 4,
                            width: "100%"
                        },
						{
							xtype: "textarea",
							width: "100%",

							bindTo: "txt_poseur",
							padding: 4,
							flex: 1
						}

                    ]
                }, {

                    layout: "fit",
                    title: "Compléments",
                    items: [{
                            layout: "vbox",
                            border: false,
							height: "100%",
                            items: [{
                                    xtype: "htmleditor",
                                    fieldLabel: "Matériel(s) nécessaire(s)",
                                    labelAlign: "top",
                                    labelWidth: 150,
                                    padding: 10,
									bindTo: "materiels",
									flex: 1,
                                    width: "100%"
                                }, {
                                    xtype: "textfield",
                                    fieldLabel: "Nécessité coupure route",
                                    labelAlign: "top",

                                    bindTo: "coupure_route",
									padding: 10,
                                    labelWidth: 150,
                                    width: "100%"
                                }, {
									fieldLabel: "Accès",
									bindTo: "acces",
									labelAlign: "top",
									xtype: "htmleditor",
									width: "100%",
									padding: 10,
									flex: 1
                				}
						]
                    }]
                }, {
                    xtype: "grid",
                    itemId: "gridContacts",

					hidden: true,
                    title: "Contact(s) Chantier",
                    border: false,
                    tbar: [{
                        text: "Ajouter",
                        itemId: "addContact"
                    }, {
                        text: "Supprimer",
                        itemId: "delContact"
                    }],
                    columns: [{
                        text: "Contact",
                        dataIndex: "NomPrenom_contact_client",
                        flex: 1
                    }, {
                        text: "Téléphone",
                        dataIndex: "Tel_contact_client"
                    }, {
                        hidden: true,
                        text: "Mobile",
                        dataIndex: "Mobile_contact_client"
                    }],
                    store: App.store.create({
                        fields: [],
                        data: [],
                        autoLoad: true
                    }),
                    width: "100%",
                    height: 250
                }]
            }]
	
});