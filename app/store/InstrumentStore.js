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
								'<p>This interview is designed to assist in the assessment of a feeding ',
								'or eating disorder or related conditions in adults according to the DSM-5 ', 
								'criteria. It is meant to be used by individuals with familiarity with and ', 
								'training in assessment of eating disorders.</p>',
								'<p>The questions in the checklist closely mirror the criteria, but are worded to ',
								'aid the assesment process. In answering all questions, clinical judgment must be ',
								'exercised. It is appropriate to utilize whatever clinical information is available, ',
								'including the individual\'s answers, the clinician\'s observations, ',
								'and ancillary sources of information (e.g., treatment providers, ',
								'family members). ',
								'Assessors are strongly advised to obtain objective information (i.e. clinician-',
								'measured height and weight).</p>',
								'<p>Clinicians are advised to begin by using the probes ',
								'provided. Follow-up questions should be based on clinical judgment ',
								'to clarify ambiguous responses.</p>',
								'<p></p> ',
								'<p></p> ',
								'<p><em>(Copyright(c) 2013. American Psychiatric Association. ',
								'All rights reserved.)</em></p>'].join(" ")
			}
		]
	}
});
