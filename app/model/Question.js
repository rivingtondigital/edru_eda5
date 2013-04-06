Ext.define('ceda.model.Question', {
	extend: 'Ext.data.Model',
	config: {
		proxy: {
            type: 'localstorage',
            id  : 'question-proxy'
        },

		fields: [ 
			{name: 'id', type: 'float'}, 
			'instrument_id', 
			'initial', 
			'sectionlabel', 
			'shortname', 
			'interviewprobe', 
			'symptom',
			'rules'
		],
		
		/*
		associations:[ 
			{
				type: 'hasMany',
				model :'ceda.model.Answer',
				name: 'answers'
			},
			{
				type: 'belongsTo',
				model: 'ceda.modelInstrument',
				name: 'instrument'
			}
		
		],
		*/
		//hasMany: {model: 'ceda.model.Rule', name: 'rules'},
		//hasOne: {model : 'ceda.model.Instrument', name : 'instrument'}
	},
	getAnswers: function(){
		var astore = Ext.getStore('answerStore');
		astore.clearFilter();
		astore.filterBy(
			function(item){ 
				return item.get('question_id') == this.data['id'];
			},
			this
		);
		return astore;
	}
	
});
