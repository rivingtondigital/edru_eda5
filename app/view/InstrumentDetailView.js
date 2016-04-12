Ext.define('ceda.view.InstrumentDetailView', {
	extend: 'Ext.Panel',
	xtype: 'idetail',
	config:{
		layout: 'auto',
		scrollable:{
		    direction: 'vertical',
		    directionLock: true
		},

		styleHtmlContent: true,

		style: {
			'margin': '10'
		},
		items:[
			{
				id: 'description',
				record: null,
				tpl: [
					'{description}'
				]
			},
			{
				id: 'previous',
				xtype: 'button',
				text: lang.VIEW_PREVIOUS,
				align: 'end',
				ui: 'action',
				margin: 20,
				padding: "5 20",
				docked: 'bottom'
			},
			{
				id: 'start',
				xtype: 'button',
				text: lang.BEGIN_NEW,
				align: 'end',
				ui: 'action',
				margin: 20,
				padding: "5 20",
				record: null,
				docked: 'bottom'
			}
		]
	},

	setRecord: function(instrument){
		this.getComponent('description').setRecord(instrument);
		this.getComponent('start').setRecord(instrument);
	}

});
