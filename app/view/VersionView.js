Ext.define('ceda.view.VersionView', {
	extend: 'Ext.DataView',
	xtype: 'versionview',
	config: {
		itemId: 'version',
		fullscreen: true,
		useComponents: true,
		defaultType: 'versionitem'
	}
});

Ext.define('VersionItem', {
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'versionitem',
	requires:['Ext.Button'],
	config:{
		version_id: {
			cls: 'version-id',
			flex: 1
		},
		version_description: {
			cls: 'version-desc',
			flex: 1
		},
		bttn_update:{
			text: 'update',
			data: '_id'
		},
		dataMap:{
			getVersion_id: {
				setHtml: '_id'
			},
			getVersion_description:{
				setHtml: 'description'
			},
			getBttn_update:{
				setText: 'description'
			}

		}
	},
	applyVersion_id: function(config){
		return Ext.factory(config, Ext.Component, this.getVersion_id());
	},
	updateVersion_id: function(newversion, oldversion){
		if (oldversion){
			this.remove(oldversion);
		}
		if(newversion){
			this.add(newversion);
		}
	},
	applyVersion_description: function(config){
		return Ext.factory(config, Ext.Component, this.getVersion_description());
	},
	updateVersion_description: function(newdescription, olddescription){
		if (olddescription){
			this.remove(olddescription);
		}
		if (newdescription){
			this.add(newdescription);
		}
	},

	applyBttn_update: function(config){
		return Ext.factory(config, Ext.Button, this.getBttn_update());
	},
	updateBttn_update: function(newbttn, oldbttn){
		if(oldbttn){
			this.remove(oldbttn);
		}
		if(newbttn){
			newbttn.setCls('left');
			newbttn.setUi('confirm');
			newbttn.enableBubble('itemtap');
			newbttn.on('tap', function(){
				this.fireEvent('itemtap', {sess_id: this.getData(), action: 'pick'});
			});

			this.add(newbttn);
		}
	}
});
