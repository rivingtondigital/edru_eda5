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
				description: 'Yes: there is a disturbance in eating',
				triggers:{
					eatingdisturbance: true
				}
			},
			{
				id:5,
				question_id: 2,
				description: 'No: there is NO disturbance in eating',
				triggers:{
					eatingdisturbance: false
				}
			},
			{
				id:6,
				question_id: 3,
				description: 'Eating is abnormal',
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
				id:7.1,
				question_id: 3.001,
				description: 'Yes: significant impairment or distress',
				triggers:{
					impairmentdistress: true
				}
			},
			{
				id:7.2,
				question_id: 3.001,
				description: 'No: NO significant impairment or distress',
				triggers:{
					impairmentdistress: false
				}
			},

			{
				id:8,
				question_id: 4,
				description: 'Yes',
				triggers:{
					lowweight: true
				}
			},
			{
				id:9,
				question_id: 4,
				description: 'No',
				triggers:{
					lowweight: false
				}
			},
			{
				id:10.01,
				question_id: 4.06,
				description: 'Was significantly underweight in last 3 months',
				triggers:{
					recentlowweight: true
				}
			},
			{
				id:10.02,
				question_id: 4.06,
				description: 'Was NOT significantly underweight in last 3 months',
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
				description: 'Yes: there is intense fear of weight gain',
				triggers:{
					fearofgain: true
				}
			},
			{
				id:12,
				question_id: 5.1,
				description: 'No: NOT afraid of gaining weight',
				triggers:{
					fearofgain: false
				}
			},
			{
				id:13,
				question_id: 5.2,
				description: 'Yes: there is persistent behavior to avoid weight gain',
				triggers:{
					interfering: true
				}
			},
			{
				id:14,
				question_id: 5.2,
				description: 'No: NO persistent behavior to avoid weight gain',
				triggers:{
					interfering: false
				}
			},
			{
				id:15,
				question_id: 6.1,
				description: 'Yes: there is distortion of body image',
				triggers:{
					distorted_body_image: true
				}
			},
			{
				id:16,
				question_id: 6.1,
				description: 'No: body image is NOT distorted',
				triggers:{
					distorted_body_image: false
				}
			},
			{
				id:17,
				question_id: 6.2,
				description: 'Yes: shape and weight exert undue influence',
				triggers:{
					distorted_bi_influence: true
				}
			},
			{
				id:18,
				question_id: 6.2,
				description: 'No: shape and weight do NOT exert undue influence',
				triggers:{
					distorted_bi_influence: false
				}
			},
			{
				id:19,
				question_id: 6.3,
				description: 'Individual recognizes seriousness of current weight',
				triggers:{
					understands_seriousness: true
				}
			},
			{
				id:20,
				question_id: 6.3,
				description: 'Individual does NOT recognize seriousness of current weight',
				triggers:{
					understands_seriousness: false
				}
			},
			{
				id:21,
				question_id: 7.01,
				description: 'Yes: experiences loss of control',
				triggers:{
					lacks_control: true
				}
			},
			{
				id:22,
				question_id: 7.01,
				description: 'No: does NOT experience loss of control',
				triggers:{
					lacks_control: false
				}
			},
			{
				id:23,
				question_id: 7.02,
				description: 'Yes: describes OBEs',
				triggers:{
					obe: true
				}
			},
			{
				id:24,
				question_id: 7.02,
				description: 'No: does NOT describe OBEs',
				triggers:{
					obe: false
				}
			},
			{
				id:251,
				question_id: 7.0201,
				description: 'Yes: at least 1 OBE/WEEK, on average',
				triggers:{
					OBE_1perWK: true,
					OBE_1perMON: true
				}
			},
			{
				id:252,
				question_id: 7.0201,
				description: 'No: less than 1 OBE/WEEK, on average',
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
			{
				id:256,
				question_id: 7.0204,
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
				description: 'Yes: describes SBEs',
				triggers:{
					sbe: true
				}
			},
			{
				id:261,
				question_id: 7.0210,
				description: 'No: does NOT describe SBEs',
				triggers:{
					sbe: false
				}
			},
			{
				id:262,
				question_id: 7.0211,
				description: 'Yes: at least 1 SBE/WEEK, on average',
				triggers:{
					sbe_frequency_weeks: true,
					sbe_frequency_months: true
				}
			},
			{
				id:263,
				question_id: 7.0211,
				description: 'No: less than 1 SBE/WEEK, on average',
				triggers:{
					sbe_frequency_weeks: false
				}
			},
			{
				id:264,
				question_id: 7.0212,
				description: 'Yes: at least 1 SBE/MONTH, on average',
				triggers:{
					sbe_frequency_months: true
				}
			},
			{
				id:265,
				question_id: 7.0212,
				description: 'No: less than 1 SBE/MONTH, on average',
				triggers:{
					sbe_frequency_months: false
				}
			},
			{
				id:266,
				question_id: 7.0213,
				description: 'Proceed',
				triggers:{
				}
			},	
			{
				id:267,
				question_id: 7.0214,
				description: 'Proceed',
				triggers:{
				}
			},

// old section follows
			{
				id:26,
				question_id: 7.03,
				description: '&#8805; 1 episode/WEEK',
				triggers:{
					binge_frequency_weeks: true,
					OBE_1perMON: true
				}
			},
			{
				id:28,
				question_id: 7.03,
				description: 'No',
				triggers:{
					binge_frequency_weeks: false
				}
			},
			{
				id:29,
				question_id: 7.04,
				description: '&#8805; 1 episode/MONTH',
				triggers:{
					OBE_1perMON: true
				}
			},
			{
				id:31,
				question_id: 7.04,
				description: 'No',
				triggers:{
					OBE_1perMON: false
				}
			},
// End of old binge eating section

			{
				id:32,
				question_id: 7.05,
				description: 'Yes: the individual engages in purging behaviors',
				triggers:{
					purging: true
				}
			},
			{
				id:33,
				question_id: 7.05,
				description: 'No: the individual does NOT engage in purging behaviors',
				triggers:{
					purging: false
				}
			},
			{
				id:33.1,
				question_id: 7.0501,
				description: 'Yes: purging episodes at least 1x/WEEK',
				triggers:{
					purging1xWK: true,
					purging1xMON: true
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
				description: 'Yes: purging episodes at least 1x/MONTH',
				triggers:{
					purging1xMON: true
				}
			},
			{
				id:33.4,
				question_id: 7.0502,
				description: 'No: purging episodes less than 1x/MONTH',
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
				id:33.6,
				question_id: 7.0506,
				description: 'Proceed',
				triggers:{
						
				}
			},
			{
				id:34,
				question_id: 7.06,
				description: 'Yes: exercises excessively',
				triggers:{
					in_exercise: true
				}
			},
			{
				id:35,
				question_id: 7.06,
				description: 'No: does NOT exercise excessively',
				triggers:{
					in_exercise: false
				}
			},
			{
				id:35.1,
				question_id: 7.0601,
				description: 'Yes: excessive exercise at least 1x/WEEK',
				triggers:{
					in_exercise1xWK: true,
					in_exercise1xMON: true
				}
			},
			{
				id:35.2,
				question_id: 7.0601,
				description: 'No: excessive exercise less than 1x/WEEK',
				triggers:{
					in_exercise1xWK: false
				}
			},
			{
				id:35.3,
				question_id: 7.0602,
				description: 'Yes: excessive exercise at least 1x/MONTH',
				triggers:{
					in_exercise1xMON: true
				}
			},
			{
				id:35.4,
				question_id: 7.0602,
				description: 'No: excessive exercise less than 1x/MONTH',
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
				id:35.6,
				question_id: 7.0606,
				description: 'Proceed',
				triggers:{
				}
			},
			{
				id:36,
				question_id: 7.07,
				description: 'Yes: to compensate for binge eating',
				triggers:{
					in_compensate: true
				}
			},
			{
				id:37,
				question_id: 7.07,
				description: 'No: NOT to compensate for binge eating',
				triggers:{
					in_compensate: false
				}
			},
			{
				id:38,
				question_id: 7.08,
				description: 'Yes: to control weight',
				triggers:{
					in_weightloss: true
				}
			},
			{
				id:39,
				question_id: 7.08,
				description: 'No: NOT to control weight',
				triggers:{
					in_weightloss: false
				}
			},
			{
				id:90,
				question_id: 7.09,
				description: 'Yes: at least once a WEEK',
				triggers:{
					in_frequency_weeks: true,
					in_frequency_months: true
				}
			},
			{
				id:91,
				question_id: 7.09,
				description: 'No: less than once a WEEK',
				triggers:{
					in_frequency_weeks: false
				}
			},
			{
				id:92,
				question_id:7.10,
				description: 'Yes: at least once a MONTH',
				triggers:{
					in_frequency_months: true
				}
			},
			{
				id:93,
				question_id:7.10,
				description: 'No: less than once a MONTH',
				triggers:{
					in_frequency_months: false
				}
			},
			{
				id:40,
				question_id: 8,
				description: 'Yes: shape and weight exert undue influence',
				triggers:{
					bodyweight_selfworth: true
				}
			},
			{
				id:41,
				question_id: 8,
				description: 'No: shape and weight do NOT exert undue influence',
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
				description: 'Yes: ate faster than usual',
				triggers:{
					binge_rapid: true
				}
			},
			{
				id:44,
				question_id: 9.1,
				description: 'No: did NOT eat faster than usual',
				triggers:{
					binge_rapid: false
				}
			},
			{
				id:45,
				question_id: 9.2,
				description: 'Yes: ate until uncomfortably full',
				triggers:{
					binge_full: true
				}
			},
			{
				id:46,
				question_id: 9.2,
				description: 'No: did NOT eat until uncomfortably full',
				triggers:{
					binge_full: false
				}
			},
			{
				id:47,
				question_id: 9.3,
				description: 'Yes: ate large amounts when not hungry',
				triggers:{
					binge_no_hunger: true
				}
			},
			{
				id:48,
				question_id: 9.3,
				description: 'No: did NOT eat large amounts when not hungry',
				triggers:{
					binge_no_hunger: false
				}
			},
			{
				id:49,
				question_id: 9.4,
				description: 'Yes: ate alone because ashamed',
				triggers:{
					binge_shame: true
				}
			},
			{
				id:50,
				question_id: 9.4,
				description: 'No: did NOT eat alone because ashamed',
				triggers:{
					binge_shame: false
				}
			},
			{
				id:51,
				question_id: 9.5,
				description: 'Yes: felt badly',
				triggers:{
					binge_sad: true
				}
			},
			{
				id:52,
				question_id: 9.5,
				description: 'No: did NOT feel badly',
				triggers:{
					binge_sad: false
				}
			},
			{
				id:53,
				question_id: 10,
				description: 'Yes: markedly distressed',
				triggers:{
					binge_distress: true
				}
			},
			{
				id:54,
				question_id: 10,
				description: 'No: NOT markedly distressed',
				triggers:{
					binge_distress: false
				}
			},
			{
				id:55,
				question_id: 11,
				description: 'Yes: serious nutritional problems from restricted eating',
				triggers:{
					avoidant_nutritional_problems: true
				}
			},
			{
				id:56,
				question_id: 11,
				description: 'No: NO serious nutritional problems',
				triggers:{
					avoidant_nutritional_problems: false
				}
			},
			{
				id:57,
				question_id: 11.1,
				description: 'Yes: has lost significant weight',
				triggers:{
					avoidant_weightloss: true
				}
			},
			{
				id:58,
				question_id: 11.1,
				description: 'No: has NOT lost significant weight',
				triggers:{
					avoidant_weightloss: false
				}
			},
			{
				id:59,
				question_id: 11.2,
				description: 'Yes: medical problems',
				triggers:{
					avoidant_nutri_def: true
				}
			},
			{
				id:60,
				question_id: 11.2,
				description: 'No: NO medical problems',
				triggers:{
					avoidant_nutri_def: false
				}
			},
			{
				id:61,
				question_id: 11.3,
				description: 'Yes: nutritional supplements needed',
				triggers:{
					avoidant_nutri_suppliment: true
				}
			},
			{
				id:62,
				question_id: 11.3,
				description: 'No: nutritional supplements NOT needed',
				triggers:{
					avoidant_nutri_suppliment: false
				}
			},
			{
				id:63,
				question_id: 11.4,
				description: 'Yes: marked interference with psychosocial functioning',
				triggers:{
					avoidant_psychosocial_interference: true
				}
			},
			{
				id:64,
				question_id: 11.4,
				description: 'No: NO interference with psychosocial functioning',
				triggers:{
					avoidant_psychosocial_interference: false
				}
			},
			{
				id:65,
				question_id: 12,
				description: 'Yes: good alternative explanation',
				triggers:{
					avoidant_alt_explanation: true
				}
			},
			{
				id:66,
				question_id: 12,
				description: 'No: NO alternative explanation',
				triggers:{
					avoidant_alt_explanation: false
				}
			},
			{
				id:67,
				question_id: 13,
				description: 'Yes: an associated problem accounts for eating disturbance',
				triggers:{
					avoidant_alt_condition: true
				}
			},
			{
				id:68,
				question_id: 13,
				description: 'No: NO associated problem',
				triggers:{
					avoidant_alt_condition: false
				}
			},
			{
				id:69,
				question_id: 14,
				description: 'Yes: independent attention needed',
				triggers:{
					avoidant_independent_clinical: true
				}
			},
			{
				id:70,
				question_id: 14,
				description: 'No: NO independent attention needed',
				triggers:{
					avoidant_independent_clinical: false
				}
			},
			{
				id:71,
				question_id: 15,
				description: 'Yes: repeatedly regurgitates food',
				triggers:{
					regurge_repeated: true
				}
			},
			{
				id:72,
				question_id: 15,
				description: 'No: does NOT repeatedly regurgitate food',
				triggers:{
					regurge_repeated: false
				}
			},
			{
				id:73,
				question_id: 16,
				description: 'Yes: an associated problem accounts for regurgitation',
				triggers:{
					regurge_alt_explanation: true
				}
			},
			{
				id:74,
				question_id: 16,
				description: 'No: NO associated problem',
				triggers:{
					regurge_alt_explanation: false
				}
			},
			{
				id:75,
				question_id: 17,
				description: 'Yes: independent attention needed',
				triggers:{
					regurge_independent_clinical: true
				}
			},
			{
				id:76,
				question_id: 17,
				description: 'No: NO independent attention needed',
				triggers:{
					regurge_independent_clinical: false
				}
			},
			{
				id:77,
				question_id: 18,
				description: 'Yes: regularly eats non-food items',
				triggers:{
					nonfood_age_inappropriate: true
				}
			},
			{
				id:78,
				question_id: 18,
				description: 'No: does NOT regulary eat non-food items',
				triggers:{
					nonfood_age_inappropriate: false
				}
			},
			{
				id:79,
				question_id: 19,
				description: 'Yes: eats non-food substances',
				triggers:{
					nonfood_persistent: true
				}
			},
			{
				id:80,
				question_id: 19,
				description: 'No: does NOT eat non-food substances',
				triggers:{
					nonfood_persistent: false
				}
			},
			{
				id:81,
				question_id: 20,
				description: 'Yes: behavior is culturally sanctioned',
				triggers:{
					nonfood_culturally_sanctioned: true
				}
			},
			{
				id:82,
				question_id: 20,
				description: 'No: behavior is NOT culturally sanctioned',
				triggers:{
					nonfood_culturally_sanctioned: false
				}
			},
//
// The section below has the answers for the other ED section
//
			{
				id: 99,
				question_id: 30,
				description: 'Proceed to see brief descriptions.',
				triggers: {
				}
			},
			{
				id: 100,
				question_id: 31,
				description: 'Proceed to choose most appropriate diagnosis.',
				triggers: {
				}
			},

			{
				id: 101,
				question_id: 32,
				description: 'Atypical Anorexia Nervosa',
				triggers: {
					atypicalAN: true
				}
			},
			{
				id: 102,
				question_id: 32,
				description: 'Subthreshold Bulimia Nervosa',
				triggers: {
					subthresholdBN: true
				}
			},
			{
				id: 103,
				question_id: 32,
				description: 'Subthreshold Binge Eating Disorder',
				triggers: {
					subthresholdBED: true
				}
			},
			{
				id: 104,
				question_id: 32,
				description: 'Purging Disorder',
				triggers: {
					purgingdisorder: true
				}
			},
			{
				id: 105,
				question_id: 32,
				description: 'Night Eating Syndrome',
				triggers: {
					NES: true
				}
			},
			{
				id: 106,
				question_id: 32,
				description: 'Other (unspecified) Feeding or Eating Disorder',
				triggers: {
					otherED: true
				}
			},
			{
				id: 200,
				question_id: 50,
				description: 'Proceed',
				triggers:{
//					Entered: true
				}
			},

//
// The section below contains the answers for the original other ED section
// No longer used as of 8/5/13
//
// 7/7/14: BUT, question 21 is still active....???
// 
			{
				id:83,
				question_id: 21,
				description: 'Yes: independent attention needed',
				triggers:{
					nonfood_needs_clinical: true
				}
			},
			{
				id:84,
				question_id: 21,
				description: 'No: NO independent attention needed',
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

});
