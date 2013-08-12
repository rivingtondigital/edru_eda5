Ext.define('ceda.store.AnswerStore', {
	extend: 'Ext.data.Store',
	config: {
		storeId: 'answerStore',
		model: 'ceda.model.Answer',
		data: [
			{
				id: 1.01,
				question_id: 1,
				description: 'Proceed',
				triggers:{
					Entered: true
				}
			},
			{
				id: 3.011,
				question_id: 3.01,
				description: 'Underweight',
				triggers:{
					underweight: true,
					overweight: false,
					normalweight: false
				}
			},
			{
				id: 3.012,
				question_id: 3.01,
				description: 'Normal Weight',
				triggers:{
					underweight: false,
					overweight: false,
					normalweight: true
				}
				
			},
			{
				id: 3.013,
				question_id: 3.01,
				description: 'Overweight or Obese',
				triggers:{
					underweight: false,
					overweight: true,
					normalweight: false
				}
			},
			{
				id:4,
				question_id: 2,
				description: 'yes',
				triggers:{
					eatingdisturbance: true
				}
			},
			{
				id:5,
				question_id: 2,
				description: 'no',
				triggers:{
					eatingdisturbance: false
				}
			},
						{
				id:6,
				question_id: 3,
				description: 'Eating is aberrant',
				triggers:{
					aberranteating: true
				}
			},
						{
				id:7,
				question_id: 3,
				description: 'Eating is normal',
				triggers:{
					aberranteating: false
				}
			},
			{
				id:8,
				question_id: 4,
				description: 'yes',
				triggers:{
					lowweight: true
				}
			},
			{
				id:9,
				question_id: 4,
				description: 'no',
				triggers:{
					lowweight: false
				}
			},
			{
				id:10.01,
				question_id: 4.06,
				description: 'Was significantly underweight in last 3 mons',
				triggers:{
					recentlowweight: true
				}
			},
			{
				id:10.02,
				question_id: 4.06,
				description: 'Was NOT significantly underweight in last 3 mons',
				triggers:{
					recentlowweight: false
				}
			},
			{
				id:10.03,
				question_id: 4.07,
				description: 'Proceed',
				triggers: {
				}
			},
			{
				id:11,
				question_id: 5.1,
				description: 'yes',
				triggers:{
					fearofgain: true
				}
			},
			{
				id:12,
				question_id: 5.1,
				description: 'no',
				triggers:{
					fearofgain: false
				}
			},
			{
				id:13,
				question_id: 5.2,
				description: 'yes',
				triggers:{
					interfering: true
				}
			},
			{
				id:14,
				question_id: 5.2,
				description: 'no',
				triggers:{
					interfering: false
				}
			},
			{
				id:15,
				question_id: 6.1,
				description: 'yes',
				triggers:{
					distorted_body_image: true
				}
			},
			{
				id:16,
				question_id: 6.1,
				description: 'no',
				triggers:{
					distorted_body_image: false
				}
			},
			{
				id:17,
				question_id: 6.2,
				description: 'yes',
				triggers:{
					distorted_bi_influence: true
				}
			},
			{
				id:18,
				question_id: 6.2,
				description: 'no',
				triggers:{
					distorted_bi_influence: false
				}
			},
			{
				id:19,
				question_id: 6.3,
				description: 'yes',
				triggers:{
					understands_seriousness: true
				}
			},
			{
				id:20,
				question_id: 6.3,
				description: 'no',
				triggers:{
					understands_seriousness: false
				}
			},
			{
				id:21,
				question_id: 7.01,
				description: 'yes',
				triggers:{
					lacks_control: true
				}
			},
			{
				id:22,
				question_id: 7.01,
				description: 'no',
				triggers:{
					lacks_control: false
				}
			},
			{
				id:23,
				question_id: 7.02,
				description: 'Yes',
				triggers:{
					obe: true
				}
			},
			{
				id:24,
				question_id: 7.02,
				description: 'No',
				triggers:{
					obe: false
				}
			},
			{
				id:251,
				question_id: 7.0201,
				description: 'Yes: at least 1 OBE/week, on average',
				triggers:{
					OBE_1perWK: true,
					OBE_1perMON: true
				}
			},	
			{
				id:252,
				question_id: 7.0201,
				description: 'No: less than 1 OBE/week, on average',
				triggers:{
					OBE_1perWK: false
				}
			},	
			{
				id:253,
				question_id: 7.0202,
				description: 'Yes: at least 1 OBE/MONTH, on average',
				triggers:{
					OBE_1perMON: true
				}
			},	
			{
				id:254,
				question_id: 7.0202,
				description: 'No: less than 1 OBE/MONTH, on average',
				triggers:{
					OBE_1perMON: false
				}
			},	
			{
				id:255,
				question_id: 7.0203,
				description: 'Proceed',
				triggers:{

				}
			},	
//
// Next section contains answers to questions re SBEs
//
			{
				id:260,
				question_id: 7.0210,
				description: 'Yes',
				triggers:{
					sbe: true
				}
			},
			{
				id:261,
				question_id: 7.0210,
				description: 'No',
				triggers:{
					sbe: false
				}
			},
			{
				id:262,
				question_id: 7.0211,
				description: 'Yes: at least 1 SBE/week, on average',
				triggers:{
					sbe_frequency_weeks: true
				}
			},	
			{
				id:263,
				question_id: 7.0211,
				description: 'No: less than 1 SBE/week, on average',
				triggers:{
					sbe_frequency_weeks: false
				}
			},	
			{
				id:264,
				question_id: 7.0212,
				description: 'Yes',
				triggers:{
					sbe_frequency_months: true
				}
			},	
			{
				id:265,
				question_id: 7.0212,
				description: 'No',
				triggers:{
					sbe_frequency_months: false
				}
			},	
			{
				id:266,
				question_id: 7.0213,
				description: 'Done',
				triggers:{

				}
			},	

// old section follows
			{
				id:26,
				question_id: 7.03,
				description: '&#8805; 1 episode/week',
				triggers:{
					binge_frequency_weeks: true,
					OBE_1perMON: true
				}
			},			
			{
				id:28,
				question_id: 7.03,
				description: 'no',
				triggers:{
					binge_frequency_weeks: false
				}
			},
			{
				id:29,
				question_id: 7.04,
				description: '&#8805; 1 episode/month',
				triggers:{
					OBE_1perMON: true
				}
			},
			{
				id:31,
				question_id: 7.04,
				description: 'no',
				triggers:{
					OBE_1perMON: false
				}
			},
// End of old binge eating section

			{
				id:32,
				question_id: 7.05,
				description: 'yes',
				triggers:{
					purging: true
				}
			},
			{
				id:33,
				question_id: 7.05,
				description: 'no',
				triggers:{
					purging: false
				}
			},
			{
				id:33.1,
				question_id: 7.0501,
				description: 'Yes: purging episodes at least 1x/WEEK',
				triggers:{
					purging1xWK: true
				}
			},
			{
				id:33.2,
				question_id: 7.0501,
				description: 'No: purging episodes less than 1x/WEEK',
				triggers:{
					purging1xWK: false
				}
			},
			{
				id:33.3,
				question_id: 7.0502,
				description: 'Yes: purging episodes at least 1x/MON',
				triggers:{
					purging1xMON: true
				}
			},
			{
				id:33.4,
				question_id: 7.0502,
				description: 'No: purging episodes less than 1x/MON',
				triggers:{
					purging1xMON: false
				}
			},
			{
				id:33.5,
				question_id: 7.0505,
				description: 'Proceed',
				triggers:{
				}
			},
			{
				id:34,
				question_id: 7.06,
				description: 'yes',
				triggers:{
					in_exercise: true
				}
			},
			{
				id:35,
				question_id: 7.06,
				description: 'no',
				triggers:{
					in_exercise: false
				}
			},
			{
				id:35.1,
				question_id: 7.0601,
				description: 'Yes: exercise episodes at least 1x/WEEK',
				triggers:{
					in_exercise1xWK: true
				}
			},
			{
				id:35.2,
				question_id: 7.0601,
				description: 'No: exercise episodes less than 1x/WEEK',
				triggers:{
					in_exercise1xWK: false
				}
			},
			{
				id:35.3,
				question_id: 7.0602,
				description: 'Yes: exercise episodes at least 1x/MON',
				triggers:{
					in_exercise1xMON: true
				}
			},
			{
				id:35.4,
				question_id: 7.0602,
				description: 'No: exercise episodes less than 1x/MON',
				triggers:{
					in_exercise1xMON: false
				}
			},
			{
				id:35.5,
				question_id: 7.0605,
				description: 'Proceed',
				triggers:{
				}
			},
			{
				id:36,
				question_id: 7.07,
				description: 'yes',
				triggers:{
					in_compensate: true
				}
			},
			{
				id:37,
				question_id: 7.07,
				description: 'no',
				triggers:{
					in_compensate: false
				}
			},
			{
				id:38,
				question_id: 7.08,
				description: 'yes',
				triggers:{
					in_weightloss: true
				}
			},
			{
				id:39,
				question_id: 7.08,
				description: 'no',
				triggers:{
					in_weightloss: false
				}
			},
			{
				id:90,
				question_id: 7.09,
				description: 'Yes: at least once a week',
				triggers:{
					in_frequency_weeks: true,
					in_frequency_months: true
				}
			},
			{
				id:91,
				question_id: 7.09,
				description: 'No: less than once a week',
				triggers:{
					in_frequency_weeks: false
				}
			},
			{
				id:92,
				question_id:7.10,
				description: 'yes',
				triggers:{
					in_frequency_months: true
				}
			},
			{
				id:93,
				question_id:7.10,
				description: 'no',
				triggers:{
					in_frequency_months: false
				}
			},
			{
				id:40,
				question_id: 8,
				description: 'yes',
				triggers:{
					bodyweight_selfworth: true
				}
			},
			{
				id:41,
				question_id: 8,
				description: 'no',
				triggers:{
					bodyweight_selfworth: false
				}
			},
			{
				id:42,
				question_id: 9,
				description: 'Next',
				triggers:{
					next: true
				}
			},
			{
				id:43,
				question_id: 9.1,
				description: 'yes',
				triggers:{
					binge_rapid: true
				}
			},
			{
				id:44,
				question_id: 9.1,
				description: 'no',
				triggers:{
					binge_rapid: false
				}
			},
			{
				id:45,
				question_id: 9.2,
				description: 'yes',
				triggers:{
					binge_full: true
				}
			},
			{
				id:46,
				question_id: 9.2,
				description: 'no',
				triggers:{
					binge_full: false
				}
			},
			{
				id:47,
				question_id: 9.3,
				description: 'yes',
				triggers:{
					binge_no_hunger: true
				}
			},
			{
				id:48,
				question_id: 9.3,
				description: 'no',
				triggers:{
					binge_no_hunger: false
				}
			},
			{
				id:49,
				question_id: 9.4,
				description: 'yes',
				triggers:{
					binge_shame: true
				}
			},
			{
				id:50,
				question_id: 9.4,
				description: 'no',
				triggers:{
					binge_shame: false
				}
			},
			{
				id:51,
				question_id: 9.5,
				description: 'yes',
				triggers:{
					binge_sad: true
				}
			},
			{
				id:52,
				question_id: 9.5,
				description: 'no',
				triggers:{
					binge_sad: false
				}
			},
			{
				id:53,
				question_id: 10,
				description: 'yes',
				triggers:{
					binge_distress: true
				}
			},
			{
				id:54,
				question_id: 10,
				description: 'no',
				triggers:{
					binge_distress: false
				}
			},
			{
				id:55,
				question_id: 11,
				description: 'yes',
				triggers:{
					avoidant_nutritional_problems: true
				}
			},
			{
				id:56,
				question_id: 11,
				description: 'no',
				triggers:{
					avoidant_nutritional_problems: false
				}
			},
			{
				id:57,
				question_id: 11.1,
				description: 'yes',
				triggers:{
					avoidant_weightloss: true
				}
			},
			{
				id:58,
				question_id: 11.1,
				description: 'no',
				triggers:{
					avoidant_weightloss: false
				}
			},
			{
				id:59,
				question_id: 11.2,
				description: 'yes',
				triggers:{
					avoidant_nutri_def: true
				}
			},
			{
				id:60,
				question_id: 11.2,
				description: 'no',
				triggers:{
					avoidant_nutri_def: false
				}
			},
			{
				id:61,
				question_id: 11.3,
				description: 'yes',
				triggers:{
					avoidant_nutri_suppliment: true
				}
			},
			{
				id:62,
				question_id: 11.3,
				description: 'no',
				triggers:{
					avoidant_nutri_suppliment: false
				}
			},
			{
				id:63,
				question_id: 11.4,
				description: 'yes',
				triggers:{
					avoidant_psychosocial_interference: true
				}
			},
			{
				id:64,
				question_id: 11.4,
				description: 'no',
				triggers:{
					avoidant_psychosocial_interference: false
				}
			},
			{
				id:65,
				question_id: 12,
				description: 'yes',
				triggers:{
					avoidant_alt_explanation: true
				}
			},
			{
				id:66,
				question_id: 12,
				description: 'no',
				triggers:{
					avoidant_alt_explanation: false
				}
			},
			{
				id:67,
				question_id: 13,
				description: 'yes',
				triggers:{
					avoidant_alt_condition: true
				}
			},
			{
				id:68,
				question_id: 13,
				description: 'no',
				triggers:{
					avoidant_alt_condition: false
				}
			},
			{
				id:69,
				question_id: 14,
				description: 'yes',
				triggers:{
					avoidant_independent_clinical: true
				}
			},
			{
				id:70,
				question_id: 14,
				description: 'no',
				triggers:{
					avoidant_independent_clinical: false
				}
			},
			{
				id:71,
				question_id: 15,
				description: 'yes',
				triggers:{
					regurge_repeated: true
				}
			},
			{
				id:72,
				question_id: 15,
				description: 'no',
				triggers:{
					regurge_repeated: false
				}
			},
			{
				id:73,
				question_id: 16,
				description: 'yes',
				triggers:{
					regurge_alt_explanation: true
				}
			},
			{
				id:74,
				question_id: 16,
				description: 'no',
				triggers:{
					regurge_alt_explanation: false
				}
			},
			{
				id:75,
				question_id: 17,
				description: 'yes',
				triggers:{
					regurge_independent_clinical: true
				}
			},
			{
				id:76,
				question_id: 17,
				description: 'no',
				triggers:{
					regurge_independent_clinical: false
				}
			},
			{
				id:77,
				question_id: 18,
				description: 'yes',
				triggers:{
					nonfood_age_appropriate: true
				}
			},
			{
				id:78,
				question_id: 18,
				description: 'no',
				triggers:{
					nonfood_age_appropriate: false
				}
			},
			{
				id:79,
				question_id: 19,
				description: 'yes',
				triggers:{
					nonfood_persistent: true
				}
			},
			{
				id:80,
				question_id: 19,
				description: 'no',
				triggers:{
					nonfood_persistent: false
				}
			},
			{
				id:81,
				question_id: 20,
				description: 'yes',
				triggers:{
					nonfood_culturally_sanctioned: true
				}
			},
			{
				id:82,
				question_id: 20,
				description: 'no',
				triggers:{
					nonfood_culturally_sanctioned: false
				}
			},
// 
// The section below has the answers for the othe ED section
//

			{
				id: 100,
				question_id: 30,
				description: 'Proceed to choose most appropriate diagnosis.',
				triggers: {
				}
			},

			{
				id: 101,
				question_id: 31,
				description: 'Atypical Anorexia Nervosa',
				triggers: {
					atypicalAN: true
				}
			},
			{
				id: 102,
				question_id: 31,
				description: 'Subthreshold Bulimia Nervosa',
				triggers: {
					subthresholdBN: true
				}
			},
			{
				id: 103,
				question_id: 31,
				description: 'Subthreshold Binge Eating Disorder',
				triggers: {
					subthresholdBED: true
				}
			},
			{
				id: 104,
				question_id: 31,
				description: 'Purging Disorder',
				triggers: {
					purgingdisorder: true
				}
			},
			{
				id: 105,
				question_id: 31,
				description: 'Night Eating Syndrome',
				triggers: {
					NES: true
				}
			},
			{
				id: 106,
				question_id: 31,
				description: 'Other (unspecified) Eating Disorder',
				triggers: {
					otherED: true
				}
			},

//
// The section below contains the answers for the original other ED section
// No longer used as of 8/5/13
// 
			{
				id:83,
				question_id: 21,
				description: 'yes',
				triggers:{
					nonfood_needs_clinical: true
				}
			},
			{
				id:84,
				question_id: 21,
				description: 'no',
				triggers:{
					nonfood_needs_clinical: false
				}
			},
			{
				id:85,
				question_id: 22,
				description: 'view next'
			},
			{
				id:86,
				question_id: 23,
				description: 'view next'
			},
			{
				id:87,
				question_id: 24,
				description: 'view next'
			},
			{
				id:88,
				question_id: 25,
				description: 'view next'
			},
			{
				id:89,
				question_id: 26,
				description: 'view next'
			}
		]
	}
	
})
