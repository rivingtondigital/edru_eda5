Ext.define('ceda.model.Question', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			/*
			{name: 'id', type: 'float'},
			'instrument_id',
			'initial',
			'sectionlabel',
			'short_name',
			'interviewprobe',
			'symptom',
			'rules'
			*/
			'_id',
			'question_id',
			'initial',
			'identity',
			'section_label',
			'short_name',
			'probe_text',
			'symptom_text',
			'instrument_id'
		],
		hasMany:[
			{
				name: 'answers',
				model: 'ceda.model.Answer',
				associationKey: 'answers',
				autoload: true
			},
			{
				name: 'rules',
				model: 'ceda.model.Rule',
				associationKey: 'rules',
				autoload: true
			}
		]
	}

});

/*
		self._id = None
		self.question_id = None
		self.initial = False
		self.identity = None
		self.section_label = None
		self.short_name = None
		self.probe_text = None
		self.symptom_text = None
		self.instrument_id = None
*/