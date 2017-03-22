App.view.define('References.VFamilles', {
    
                 
    extend: 'Ext.Panel',
	alias : 'widget.VFamilles',
	layout: "hbox",
    border: false,	
	items: [
            {
                region: "center",
                padding: 5,
                border: false,
                //cls: "referentiel",
                itemId: "ref_familles",		
                split:true,
                width: 350,
                height: 350,
                items: [
                    {
                    xtype: "grid",
                    //itemId: "nomFamille",
                    title: "Familles",
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
                    listeners : { 
                        /*itemclick: function(dv, record, item, index, e) {
                        console.log(record.get('name'));
                        console.log(record.get('idFamille'));
                        }*/
                        /*dblclick: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function() {
                                console.log('DblClic');
                                console.log(arguments);
                            }
                        },*/
                            /*text: "supprimer",
                            fn: function(oEvent) {s
                                console.log('RightClic');
                                console.log(arguments);
                                oEvent.stopEvent();
                            }*/
                        
                         /*render : function(c) {
                            c.getEl().on('contextmenu',
                               function(event, target, eOpts){ 
                                  this.fireEvent('contextmenu', eOpts); 
                               }, this
                            );
                        }*/
                        /*onActionColumnItemClick : function(view, rowIndex, colIndex, item, e, record, row, action) {
                        alert(action + " user " + record.get('firstname'));*/
                        //alert(action + " user " + record.get('nomFamille'));
                        //itemclick : 'onItemClick'
                        //itemclick : function(cc,ix,isChecked){alert(isChecked);}
                        /*itemclick : {                    
                        contextmenu : {                     
                            fn: function(node, evtObj) {
                                alert('here');
                            }
                        },}*/
                        //checkchange:function(cc,ix,isChecked){alert(isChecked);}
                        //itemrightclick:function(cc,ix,isChecked){alert(isChecked);}
                        /*itemclick: function(dv, record, item, index, e) {
                         var selectedRec = dv.getSelectionModel().getSelected();          
                         //alert(selectedRec.get('name')); //Will display text of name column of selected record
                        // alert(selectedRec.get('nomFamille'));
                                                                    console.log(record.get('name'));
                                                                    console.log(record.get('idFamille'));
                                                                    console.log('item');
                                                                    console.log(item);
                                                                    console.log('index');
                                                                    console.log(index);
                                                                    console.log('e');
                                                                    console.log(e);
                        }*/
                        /*itemmousedown: function(item, e){
                        console.log("e");
                        console.log(e);
                        console.log("item");
                        console.log(item);*/
                            /*var click = {0: 'left', 1:'middle', 2: 'right'};
                            alert(click[e.grid] + ' click on ' + item.value);*/
                        //}
                    },
                    columns: [
                        
                        {
                            text: "id",
                            dataIndex: "idFamille",
                            hidden: true,
                            flex: 1,
                        },
                        {
                            text: "Nom",
                            dataIndex: "nomFamille",
                            editor: {
                                xtype: "textfield",
                                itemId: "nomFamille",
                                valueField: "nomFamille",
                            },
                        }
                    ],
			             //store: App.store.create('goprro://familles',{autoLoad: true}),
                        store: App.store.create({fields:["value"],data:[]}),
                        itemId: "T1",
                        title: "Familles",
                        flex: 1,
                        height: "100%"
                }
                    
            ]
        }
	]
	
});

/*
contextMenu = new Ext.menu.Menu({
  items: [{
    text: 'Edit',
    iconCls: 'edit',
    handler: edit
  }]
});

Ext.getCmp('your-button').getEl().on('contextmenu', function(e) {
     e.preventDefault();
     contextMenu.show(Ext.getCmp('your-button').getEl());
});*/

