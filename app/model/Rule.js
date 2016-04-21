Ext.define('ceda.model.Rule', {
	extend: 'Ext.data.Model',
	config:{
		fields:[
			'_id',
			'name',
			'expression',
			'target',
			'question_id',
			'diagnosis',
			'diagnosisname'
		],
		belongsTo:{
			name: 'question',
			model: 'ceda.model.Question',
			associationKey: 'question'
		}
	}
});
