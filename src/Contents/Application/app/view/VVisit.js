App.view.define('VVisit', {

    extend: 'Ext.Panel',
	alias : 'widget.VVisit',
	border: false,
	
	layout: "border",
    
	items: [
    {
        region: "west",
        width: "60%",
        padding: 5,
        border: false,
        itemId: "add_visit",
        layout: "fit",
        split:true,
        //width: 820,
        height: 430,



        tbar: [
        {
            
            xtype: "combo",
            format: 'd m Y',
            dateFormat: 'c',
            itemId: "dateVisit",
            fieldLabel: "Date visite",
            padding: 5,
            displayField: "dateVisiteOuvrage",
            valueField: "dateVisiteOuvrage",
            editable: false,
        }
        ],
/*       bbar: [
            '->', {

            text: '<b>Enregistrer</b>',
            itemId: "VisitRecord"
        }
        ],*/

        items: [
        {
            xtype: "grid",
            hidden: true,
            itemId: "gridVisit",
            width: "60%",
            columns: 
            [
            {
                id: "idtest",
                itemId: "idVisiteOuvrage",
                hidden: true,
                flex: 1,
                dataIndex: "idVisiteOuvrage"
            },{
                text: "Ouvrage disponible",
                itemId: "nomOuvrage",
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
            },
            {
 /*               xtype: 'checkcolumn',
                text: "Sélectionner",
                dataIndex: "select",
                cls: 'x-grid-checkheader-editor',*/
/*                renderer: function(value,a,b,c){

                                var items=App.store.familles.data.items;
                                var Items={};
                                for (var i=0;i<items.length;i++) Items[items[i].data.idFamille]=items[i].data.nomFamille;
                                return iconCls: "delgrid";

                            },*/
                xtype: 'actioncolumn',
                itemId: "delOuvrageVisit", 
                iconCls: "delgrid",
     //           sm: new Ext.grid.RowSelectionModel({
                  singleSelect: true,
                  listeners: {
                     click: function(sm,index,record) {
                      console.log("sm");
                      console.log(sm);
                      console.log("index");
                      console.log(index);
                      console.log("record");
                      console.log(record);
                            /*ici, tu mets tous tes traitements lors d'un clic sur une ligne*/
                            /*je t ai mis une alerte ... */
                            /*pour utiliser un parametre de ta ligne, tu utilises record.data.[nom de la colonne]*/
                            Ext.Msg.alert('t as choisis');
                             }
                         }
       //               }),
    /*            listeners : {
                    click: function() {
                        var id0 = Ext.getCmp("idtest");
                      console.log("id0");
                      console.log(id0);*/
    /*                    var id1 = Ext.getCmp("idtest").value;
                      console.log("id1");
                      console.log(id1);
                        var id2 = Ext.getCmp("idtest").value();
                      console.log("id2");
                      console.log(id2);*/
  /*                      var id3 = Ext.getCmp("idtest").val;
                      console.log("id3");
                      console.log(id3);
                        var id4 = Ext.getCmp("idtest").val();
                      console.log("id4");
                      console.log(id4);*/
 /*                       var id5 = Ext.getCmp("idtest").getValue();
                      console.log("id5");
                      console.log(id5);*/
       /*                 var id1 = Ext.getCmp(idtest);
                      console.log("id1");
                      console.log(id1);
                        var id2 = Ext.getCmp("#idtest");
                      console.log("id2");
                      console.log(id2);
                        var id3 = Ext.getCmp("#idVisiteOuvrage");
                      console.log("id3");
                      console.log(id3);
                        var id4 = Ext.getCmp("idVisiteOuvrage");
                      console.log("id4");
                      console.log(id4);*/
  /*            
                        Ext.MessageBox.alert('Alert box', 'Button 1 is clicked');	
                    }
                }*/
                /*listeners: {
                  click: function() {
                     // var test  = Ext.getCmp('#idVisiteOuvrage').getValue();
                      //var test  = Ext.getCmp('VVisit grid#idVisiteOuvrage');
                      var test  = App.get('VVisit grid#idVisiteOuvrage').value();
                      console.log("test");
                      console.log(test);
                     Ext.MessageBox.alert('Alert box', 'Button 1 is clicked'+test);	
                  }
                }*/
               /* items: [
                {
                    iconCls: "delgrid",
                    listeners: {
                      click: function() {
                         Ext.MessageBox.alert('Alert box', 'Button 1 is clicked');	
                      }
               }
                }]*/
            },
            {
                xtype: 'actioncolumn',
                itemId: "addcom", 
                items: [
                {
                    iconCls: "pencil",
                }]
            }],
        }],
	},
    
    
    
    {
        region: "east",
        width: "40%",
        padding: 5,
        border: false,
        itemId: "Rref_zones",
        layout: "fit",
        split:true,

        items: [
        {
            id: "Test2MyGMapPanel",
            hidden: true,
            itemId: "map",
            html: '<div id="TMapPanel" style="width:50%;height:100%"></div>',
            padding: 0,
            flex: 1,
            border: false,
            width: "40%",
            border: false,
            split: true
        }
        ]
    }]
});