Ext.define('ceda.view.DebugView', {
		extend: 'Ext.DataView',
		xtype: 'debugview',
		itemId: 'debugview',
			config: {
				itemId: 'dview',
				scrollable: false,
				triggers: null,
				style: 'margin: 10px 20px',
				html: true
			},
			setTriggers: function(triggers){
				console.info(triggers);
				ret = '';
				for(key in triggers){
					ret += key + ' : '+ triggers[key] +'<br>';
					console.info(key);
				}
				this.setHtml(ret);
			}
});
