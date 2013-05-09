Ext.require('Ext.data.Store');

Ext.define('ceda.store.InstrumentStore', {
	extend: 'Ext.data.Store',
	requires: [
		'ceda.model.Instrument'
	],
	config: {
		storeId: 'instrumentStore',
		model: 'ceda.model.Instrument',
		data: [
			{
				id: 1, 
				name: 'EDA 5',
				description: [
								'<p>Test Me 7! This interview is designed to assist in the assessment of a feeding ',
								'or eating disorder or related conditions in adults according to the DSM-5 ', 
								'criteria. It is meant to be used by individuals with familiarity with and ', 
								'training in assessment of eating disorders.</p>',
								'<p>The questions in the checklist closely mirror the criteria, but are worded to ',
								'aid the assesment process. In answering all questions, clinical judgement must be ',
								'exercised. It is appropriate to utilize whatever clinical information is available, ',
								'including the individual\'s answers to questions, the clinician\'s observations ',
								'of the individual and ancillary sources of information such as other treatment ',
								'close family members, or relevant people within the individual\'s community ',
								'Assesors are strongly advised to obtain objective information (i.e. clinician-',
								'measured height and weight) wherever possible.</p>',
								'<p>The questions are posed to assess a current problem, not a problem that may ',
								'have existed in the past. Clinicians are advised to begin by using the probes ',
								'provided. Follow-up questions should be used on the basis of clinical judgment ',
								'to clarify ambiguous responses.</p>'].join(" ")
			}
		]
	}
});
