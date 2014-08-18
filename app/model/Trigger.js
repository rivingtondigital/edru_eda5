Ext.define('ceda.model.Trigger', {
	extend: 'Ext.data.Model',
	config:{
		fields: [
			'_id',
			'answer_id',
			'identifier',
			'value'
		],
		belongsTo:{
			name: 'answer',
			model: 'ceda.models.Answer',
			associationKey: 'answer'
		}
	}
});
