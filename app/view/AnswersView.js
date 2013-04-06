Ext.define('ceda.view.AnswersView', {
		extend: 'Ext.DataView',
		xtype: 'aview',
		config: {
			itemId: 'answers',
			useComponents: true,
			defaultType: 'aitem',
			scrollable: false,
			store: null,
			style: 'margin: 10px 20px'
		}
});
