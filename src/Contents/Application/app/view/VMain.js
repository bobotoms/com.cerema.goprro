App.view.define('VMain', {

    extend: 'Ext.Panel',
    alias : 'widget.mainform',
    border: false,

    layout: "border",

    items: [
        {
            region: 'north',
            height: 25,
            minHeight: 25,
            border:false,
            baseCls: 'cls-header',
            xtype: "Menu",
            itemId: "MenuPanel",
            menu: [
                {
                    text: "Général",
                    menu: [
                        {
                            text: "Ouvrages",
                            menu: [
                                {
                                    text: "Nouveau"
                                },
                                {
                                    text: "Carte"
                                },
                                {
                                    text: "Liste"
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "Visites"
                }
            ]
        },
        {
            region: 'north',
            xtype: "ribbon"
        },
        {
            title: "Actualités"
            , region: 'south'
            , itemId: "southpanel"
            , border: false
            , collapsible: true
            , height: 195
            , layout: "vbox"
            , tbar: [
            {
                itemId: "ecrire"
                , text: "Ecrire"
                , iconCls: "pencil"
            }
        ]
            , items: [
            {
                width: "100%"
                , itemId: "timeline"
                , border: false
                , autoScroll: true
                , html: '<ul class="timeline"></ul>'
                , flex: 1
            }
        ]
        },
        {
            region: "center",
            split:true,
            layout:"fit",
            itemId: "CPanel",
            items: [
                {
                    id: "MyGMapPanel",
                    itemId: "map",
                    html: '<div id="TMapPanel" style="width:100%;height:100%"></div>',
                    padding: 0,
                    flex: 1,
                    border: false,
                    width: "100%",
                    border: false,
                    split: true
                },
                {
                    xtype: "grid",
                    hidden: true,
                    itemId: "gridO",
                    columns: [
                        {
                            text: "Ouvrage",
                            flex: 1,
                            dataIndex: "nomOuvrage"
                        },
                        {
                            text: "Dpt",
                            width: 150,
                            dataIndex: "nomDepartement"
                        },
                        {
                            text: "Longitude",
                            width: 150,
                            dataIndex: "oa_y"
                        },
                        {
                            text: "Latitude",
                            width: 150,
                            dataIndex: "oa_x"
                        }
                    ],
                    store: App.store.create("App.Ouvrages.getAll",{autoLoad: true})
                },
                {
                    xtype: "VCharacteristics",
                    itemId: "setup_characteristics",
                    hidden: true
                },
                {
                    xtype: "VSaisie",
                    itemId: "Saisie",
                    hidden: true
                },
                {
                    xtype: "VRefs",
                    itemId: "setup_refs",
                    hidden: true
                },
				{
					xtype: "VAddVisit",
					itemId: "addVisit",
					hidden: true
				},
				{
					xtype: "VVisit",
					itemId: "visit",
					hidden: true
				},
                {
                    xtype: "VVisitWork",
                    itemId: "Work",
                    hidden: true
                },
                {
                    xtype: "VAddVisitWork",
                    itemId: "AddWork",
                    hidden: true
                },
                {
                    xtype: "VUpVisitWork",
                    itemId: "UpWork",
                    hidden: true
                }
            ]
        }
    ]

});
