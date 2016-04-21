Ext.define('ceda.model.Answer', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			'id',
			'description',
			'question_id'
		],
		belongsTo: {
			name: 'question',
			model: 'ceda.model.Question',
			associationKey: 'question'
		},
		hasMany:[{
			name: 'triggers',
			model: 'ceda.model.Trigger',
			associationKey: 'triggers',
			autoload: true

		}]
	}
});

		/*
		belongsTo: {
			model: 'ceda.model.Question',
			name: 'question'

		},
		associations: [
			{
				type: 'belongsTo',
				model: 'ceda.model.Question',
				getterName: "question",
				primaryKey: 'id',
				foreignKey: 'question_id'
			}
		]
	},
	getQuestion: function(){
		var qStore = Ext.getStore('questionStore');
		return qStore.findRecord('id', this.get('question_id'));
	}
	*/
