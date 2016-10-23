Ext.define('ceda.view.SavedView', {
	extend: 'Ext.DataView',
	xtype: 'savedview',
	config: {
		itemId: 'answers',
		useComponents: true,
		defaultType: 'mylistitem',
		scrollable: true,
		//store: 'assessmentStore',
		//style: 'margin: 10px 20px'
	}
});


Ext.define('MyListItem', {
	extend: 'Ext.dataview.component.DataItem',
	requires: ['Ext.Button'],
	xtype: 'mylistitem',

	config: {
		printButton: true,
		deleteButton: true,

		baseCls: 'sess_button',
		dataMap: {
			getPrintButton: {
				setText: 'text',
				setBadgeText: 'user',
				setData: 'id'
			},
			getDeleteButton:{
				setData: 'id'
			}
		}
	},

	applyPrintButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getPrintButton());
  },

	updatePrintButton: function(newbutton, oldbutton){
		if(oldbutton){
			this.remove(oldbutton);
		}

		if(newbutton){
			newbutton.setCls('left');
			newbutton.setUi('confirm');
			newbutton.enableBubble('itemtap');
			newbutton.on('tap', function(){
				this.fireEvent('itemtap', {sess_id: this.getData(), action: 'pick'});
			});

			this.add(newbutton);
		}
	},

	applyDeleteButton: function(config){
		return Ext.factory(config, Ext.Button, this.getDeleteButton());

	},
	updateDeleteButton: function(newbutton, oldbutton){
		if(oldbutton){
			this.remove(oldbutton);
		}

		if(newbutton){
			newbutton.setCls('right');
			newbutton.setText(lang.DELETE);
			newbutton.setUi('decline');
			newbutton.enableBubble('itemtap');
			newbutton.on('tap', function(){
				this.fireEvent('itemtap', {sess_id: this.getData(), action: 'delete'});
			});
			this.add(newbutton);
		}
	}

});