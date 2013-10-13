Ext.define('ceda.view.SavedView', {
	extend: 'Ext.DataView',
	xtype: 'savedview',
	config: {
		itemId: 'answers',
		useComponents: true,
		defaultType: 'mylistitem',
		scrollable: false,
		//store: 'assessmentStore',
		style: 'margin: 10px 20px'
	}
});


Ext.define('MyListItem', {
	extend: 'Ext.dataview.component.DataItem',
	requires: ['Ext.Button'],
	xtype: 'mylistitem',

	config: {
		printButton: true,
		baseCls: 'sess_button',
		dataMap: {
			getPrintButton: {
				setText: 'lastupdated',
				setValue: 'id',
				setBadgeText: 'user',
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
			newbutton.setUi('confirm');
			newbutton.enableBubble('itemtap');
			newbutton.on('tap', function(){
				this.fireEvent('itemtap', {sess_id: this.getData()});
			});

			this.add(newbutton);
		}
	}

});