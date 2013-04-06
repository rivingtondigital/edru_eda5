Ext.define('ceda.model.Answer', {
	extend: 'Ext.data.Model',
	config: {
		proxy: {
            type: 'localstorage',
            id  : 'answer-proxy'
        },
		fields: [
			'id', 
			'description', 
			'question_id',
			'triggers'
		],
		belongsTo: {
			model: 'ceda.model.Question',
			name: 'question'
			
		},
		associations: [
			{type: 'belongsTo', model: 'ceda.model.Question', getterName: "question", primaryKey: 'id', foreignKey: 'question_id' }
		]
	},
	getQuestion: function(){
		var qStore = Ext.getStore('questionStore');
		return qStore.findRecord('id', this.get('question_id'));
	}
});
