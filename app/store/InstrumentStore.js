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
				name: 'EDA-5',
				description: [
								'<p>This interview is designed to assist in the assessment of a feeding ',
								'or eating disorder, or a related condition, in an adult according to DSM-5 ', 
								'criteria. It is meant to be used by clinicians who are familiar with the ', 
								'diagnostic assessment of feeding and eating disorders.</p>',
								'<p>In each of the following screens, the Symptom captures a part of a DSM-5 criterion, ',
								'and the Probe provides questions for the clinician to employ to assess the ',
								'presence of the Symptom. Clinicians are advised to begin by using the Probes provided. ',
								'Follow-up questions  to clarify ambiguous responses can be based on clinical judgment. ',
								'<p>Comments may be added by pressing the Notes button at the top right of each screen. ',
								'Additional comments will be added to those previously entered, ',
								'and all comments will be printed in the final report at the conclusion of the interview.',
								'<p>It is appropriate to utilize whatever clinical information is available, ',
								'including the individual\'s answers, the clinician\'s observations, ',
								'and ancillary sources of information (e.g., treatment providers, ',
								'family members). ',
								'Assessors are strongly advised to obtain objective information (i.e., clinician-measured',
								'height and weight) whenever possible.</p>',
								'<p></p> ',
								'<p></p> ',
								'<p style="font-size:15px"><em>(v2.006. Copyright &#169 2013. American Psychiatric Association. ',
								'All rights reserved.)</em></p>'].join(" ")
			}
		]
	}
});
