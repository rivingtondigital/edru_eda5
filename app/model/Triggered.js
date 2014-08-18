Ext.define('ceda.model.Triggered', {
	extend: 'Ext.data.Model',
	config:{
		fields: [
			'_id',
			'value',
			{name:'trigger', model:'ceda.model.Trigger', associationKey:'trigger'}
		],
	}
});