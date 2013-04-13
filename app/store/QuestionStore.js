Ext.require('Ext.data.Store');

Ext.define('ceda.store.QuestionStore', {
	extend: 'Ext.data.Store', 
	require: ['ceda.model.Question'],
	config:{
		storeId: 'questionStore',
		model: 'ceda.model.Question',
		data: [
			{	id: 1,
				initial: true,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'BMI',
				interviewprobe: [
							[
								'1. What are your current height and weight? (Measure if possible)',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Weight in lbs: <span></td>',
								'<td><input type="text" size=2 id="saveWeight" name="BMI:Weight" onChange="calculateBmi()"></input></td>',
								'</tr><tr>',
								'<td><span>Height in inches: <span></td>',
								'<td><input type="text" size=2 id="saveHeight" name="BMI:Height" onChange="calculateBmi()"></input></td>',
								'</tr><tr>',
								'<td><span>BMI</span></td>',
								'<td><input type="text" size=2 disabled="true" name="BMI:BMI" id="saveBmi"></input></td>',
								'</tr>',
								'</table>'
							].join('')
				
				],
				symptom: [
							[
							"BMI",
							"In what range is individual’s",
								"",                       
								"•	Underweight = <18.5",
								"•	Normal weight = 18.5–24.9",
								"•	Overweight = 25–29.9",
								"•	Obesity = ≥ 30 ",
								"",
							].join('<br>'),
				].join('<br>'),
				rules: [
					{
						target: 2,
						expression: 'true'
					}
				]
			},
			{	id: 2,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'Eating Disturbance',
				interviewprobe: '2. Are you having any problems with your eating? For example, is it hard for you to maintain your weight or alter your diet (e.g., eat certain types of food, eat at particular times of day)? Do other people feel you have a problem in these areas?',
				symptom: 'Is there a disturbance in eating or eating related behavior?',
				rules: [
					{
						target: 3,
						expression: 'true'
					}
				]
			},
			{
				id:3,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'Typical Day',
				interviewprobe: '3. Can you describe a typical day of eating? When and what do you eat?',
				symptom: 'Is an aberrant eating pattern present (e.g., fasting, severely restricted intake, avoidance of certain foods, textures, binge eating episodes, purging)?',
				rules: [ 
					{
						target: 4,
						expression: 'global.eatingdisturbance || global.aberranteating'
					},
					{
						diagnosis: true,
						expression: '!global.eatingdisturbance && !global.aberranteating',
						diagnosisname: 'None',
						endifdiagnosis: true,
						target: 'finish'
					}
				]
			},
			{
				id:4,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'low weight',
				interviewprobe: [
						'4. In the past three months, have you or others recently been concerned that your weight is significantly low?',
						'',
						'If no: Have you lost a significant amount of weight recently?',
						'<table>',
						'<tr><td>When:</td> <td><input id="saveLostWhen" name="Severe_Lose:When" type="text"></input></td></tr>', 
						'<tr><td>Weight:</td> <td><input id="saveLostWeight" name="Severe_Lose:Weight_Lost" type="text"></input></td></tr>',
						'<tr><td>BMI:</td> <td><input id="saveBMI" name="Severe_Lose:BMI" type="text"></input></td></tr>',
						'</table>'
						].join("<br>"),

				symptom: 'Is individual at a significantly low body weight (ie, individual’s weight is significantly less than that of otherwise comparable normal individuals)? For adults, a BMI of 18.5 kg/m2 has been employed by the CDC as the lower limit of normal body weight.',
				rules: [
					{
						target: 5.1,
						expression: 'global.lowweight || global.weightloss_normalweight'
					},
					{
						target: 7.01,
						expression: 'global.noweightloss_normalweight'
					}
					
				]
			},
			{
				id:5.1,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'fear of weight gain',
				interviewprobe: [
						'5a. Are you afraid of', 
      					'gaining weight?', 
						'',
						'If no: Are you worried that if you start to gain weight, you will continue to gain weight and will become fat?',
						].join("<br>"),

				symptom: 'Is there an intense, irrational fear of weight gain or of becoming fat?',
				rules: [
					{
						target: 5.2,
						expression: 'true'
					}
				]
			},
			{
				id:5.2,
				initial:false,
				instrument_id:1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'interfering with weight gain',
				interviewprobe: [
					'5b. Do you try to cut back on calories or amounts or types of food? What do you try to do?',
					'',
					'Do you exercise? What do you do and how often?',
					'',
					'Do you vomit or use any types of pills (diuretics, laxatives)?',
					'',
					'Do you do anything else that might make it hard for you to gain or maintain weight?',
					'',
					'[Once any interfering behavior is endorsed, mark YES and proceed.]',
				].join("<br>"),
				symptom:[
					'Are persistent behaviors [e.g., dietary restriction, excessive exercise, purging, fasting] interfering with weight gain?',
					'',
					'',
					'Other clinically significant behavior that interferes with weight gain might include, for example, spitting out food or inappropriate stimulant use.'
				].join("<br>"),
				rules:[
					{
						target: 6.1,
						expression: 'global.fearofgain || global.interfering'
					},
					{
						target: 7.01,
						expression: 'true'
					}
				]
			},
			{
				id:6.1,
				initial:false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'body image distortion',
				interviewprobe:[
					'6a. In terms of your body weight and shape, how do you think you look? Does what you see/feel/experience differ from how you think others might perceive you?',
					'', 
					'If unable to describe distortion of body image: Have you recently thought that you are fat or that a part of your body is too big? Have you recently had a distorted view of your body? How so?'
				].join("<br>"),
				symptom:[
					'Is the individual’s body image distorted ',
					'[e.g., description of feeling he/she appears fat despite being at a markedly low weight]?'
				].join("<br>"),
				rules:[
					{
						target: 6.2,
						expression: 'true'
					}
				]
			},
			{
				id:6.2,
				initial:false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'body image influence',
				interviewprobe:[
					'6b. Does your weight or your body shape impact how you feel about yourself?', 
					'',
					'For example, if you were to have a day where you did not like the number on the scale, or you did not like the way your clothes fit, or you were uncomfortable with how your body shape felt in general, how much would that impact you? Would it make you feel very badly about yourself? Please describe this for me.'
				].join("<br>"),
				symptom: 'Does body shape or weight exert undue influence on sense of self-worth or on self-evaluation?',
				rules:[
					{
						target: 6.3,
						expression: 'true'
					}
				]
			},
			{
				id:6.3,
				initial:false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'acknowledges seriousness',
				interviewprobe:[
					'6c. Do you think that your current or recent low weight presents a significant problem for you and your overall health? Why or why not?',
					'',
					'If yes, what efforts have you made in the past 3 months to deal with this problem? Have your feelings about the significance of the problem fluctuated? How so?'
				].join("<br>"),
				symptom:[
						'Does the individual fail to recognize or refuse to acknowledge the seriousness of low body weight?',
						'',
						'If individual initially acknowledges seriousness of problem, are the efforts taken commensurate or consistent with this recognition?'
				].join("<br>"),
				rules:[
					{
						diagnosis: true,
						expression: 'global.distorted_body_image || global.distorted_bi_influence || !global.understands_seriousness',
						trigger: 'an',
						diagnosisname: 'Anorexia Nervosa',
						target: 7.01
					},
					{
						target: 7.01,
						expression: 'true'
					}
				]
			},
			{
				id:7.01,
				initial:false,
				instrument_id:1,
				sectionlabel: 'Binge Eating & Compensatory Behaviors',
				shortname: 'lack of control',
				interviewprobe:[
					'7a. In the past few months, have you had times when you felt a sense of loss of control over eating…or times when you felt that you could not stop eating or control what or how much you were eating?',
					'<br/>',
					'If no: Have there been any instances in the past few months when you felt you could not have prevented an episode of eating from occurring? Or, that you could not have stopped eating once you had started? '
				].join("<br>"),
				symptom:[
					'Has the individual experienced a lack of control while eating?'
				].join("<br/>"),
				rules:[
					{
						target:	7.02,
						expression: 'global.lack_control'
					},
					{
						target: 7.05,
						expression: '!global.lack_control'
					}
				]
			},
			{
				id:7.02,
				initial:false,
				instrument_id:1,
				sectionlabel: 'Binge Eating & Compensatory Behaviors',
				shortname: 'Example of loss of control',
				interviewprobe:[
					'7b. Can you give me an example of what you typically ate when you felt this sense of loss of control? And the context?',
					'<br/>',
					'If first episode described is only subjectively large, inquire about larger episodes: Have you had any episodes in which you have eaten a larger amount of food, an amount of food that is definitely larger than most people would eat in a similar period of time or circumstance, and felt a loss of control?',
					'<br/>',
					'If first episode described is clearly large, inquire about smaller episodes: Have you had any episodes in which you have eaten smaller amounts of food, similar to (or less than) what most people would eat in a similar period of time or under similar circumstances, and felt a loss of control?'
				].join("<br/>"),
				symptom:[
					'Objective Binge Episode (OBE): Has the individual eaten an objectively large amount of food in a discrete period of time, while experiencing a loss of control?',
					'<br>',
					'Subjective Binge Episode (SBE): Has the individual experienced a loss of control over eating, while eating a normal, typical, or small amount of food?',
					'<br/>',
					'NOTE: It may be useful to ask about the most recent episode of loss of control eating, determine episode size, and then inquire about typicality.'
				].join("<br/>"),
				rules:[
					{
						target: 7.03,
						expression: 'global.obe || global.sbe'
					},
					{
						target: 7.05,
						expression: '!global.obe && !global.sbe'
					}
				]
			},
			{
				id:7.03,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7c. If OBE described in 7b: In the past week, how many times have you had an eating episode like what you have just described, when you ate a large amount of food and felt a lack of control? [If denied in past week, ask about past month.]',
						'<br/>',
						'Is this consistent with how frequently the behaviors have occurred for the past 3 months? If no, how was frequency of episodes different?',
						'<br/>',
						'If SBE described in 7b: In the past week, how many times have you had an eating episode like what you have just described, when you ate a smaller or more common amount of food and felt a lack of control? [If denied in past week, ask about past month.]',
						'<br/>',
						'Is this consistent with how frequently the behaviors have occurred for the past 3 months? If no, how was frequency of episodes different?',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td>Average # of OBE\'s per week for the last 3 months</td></tr>',
						'<tr><td><input id="saveOBEWeek" name="Binge_Behavior:Average_OBEs_per_week_in_the_past_3_months" type="text" size="3"></td></tr>',
						'<tr><td>Average # of SBE\'s per week for the last 3 months</label></td></tr>',
						'<tr><td><input id="saveOBEWeek" name="Binge_Behavior:Average_SBEs_per_week_in_the_past_3_months" type="text" size="3"/></td></tr>',
						'</table>'
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Has binge eating recurred, at least once a week, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.05,
						expression: 'global.frequency_weeks'
					},
					{
						target: 7.04,
						expression: '!global.frequency_weeks'
					}
				]
			},
			{
				id:7.04,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7d. [Use information from 7c. Ask additional questions to assess frequency as needed.]'
				].join("<br/>"),
				symptom:[
					'Has binge eating recurred, at least once a month, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.05,
						expression: 'true'
					}
				]
			},
			{
				id:7.05,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7e. Do you make yourself vomit, use laxatives, diuretics or other medications?',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td>Name of Laxative</td></tr>',
						'<tr><td><input id="saveLaxativeName" name="Laxatives:Name"></td></tr>',
						'<tr><td>Quantity</td></tr>',
						'<tr><td><input id="saveLaxativeName" name="Laxatives:Quantity" size="3"></td></tr>',
						'</table>',
						'<br/>',
						'<table>',
						'<tr><td>Name of Diuretics</td></tr>',
						'<tr><td><input id="saveDiureticsName" name="Diuretics:Name"></td></tr>',
						'<tr><td>Quantity</td></tr>',
						'<tr><td><input id="saveDiureticsName" name="Diuretics:Quantity" size="3"></td></tr>',
						'</table>',
					].join("")
				].join("<br/>"),
				symptom:[
					'Does the individual use inappropriate behaviors?',
					'<br/>',
					'Indicators of misuse include taking laxatives, diuretics, or other medications (e.g., diet pills) for weight control without a prescription, using more pills than suggested, or at a higher frequency.'
				].join("<br/>"),
				rules:[
					{
						target: 7.06,
						expression: 'true'
					}
				]
			},
			{
				id:7.06,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7f. Do you exercise? What type and how frequently?',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td>Type of Exercise</td></tr>',
						'<tr><td><input id="saveExerciseType" name="Exercise:Type"></td></tr>',
						'<tr><td>Duration</td></tr>',
						'<tr><td><input id="saveExerciseDuration" name="Exercise:Duration" size="3"></td></tr>',
						'</table>',
						
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Does the individual use exercise inappropriately (ie, exercise excessively)?',
					'<br/>',
					'Indicators of excessive exercise include exercising despite illness or injury, exercising to an extent that it interferes with daily responsibilities (e.g., being late for work or school), or feeling highly distressed when unable to exercise.'
				].join("<br/>"),
				rules:[
					{
						target: 7.07,
						expression: 'global.in_behaviors || global.in_exercise'
					},
					{
						diagnosis: true,
						expression: '(global.an) && (!global.lacks_control && !global.in_behaviors)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
					},
					{
						diagnosis: true,
						expression: '(global.an) && (!global.obe && !global.in_behaviors)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
					},
					{
						diagnosis: true,
						expression: '(global.an) && (global.lacks_control && global.obe) && (global.binge_frequency_weeks || global.binge_frequency_months)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
					},
					{
						diagnosis: true,
						expression: '(global.an) && (global.in_behaviors) && (global.in_frequency_weeks || global.in_frequency_months)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
					},
					{
						target: 11,
						expression: '(!global.an) && (!global.lacks_control)',
						trigger: 'arfid'
					},
					{
						target: 11,
						expression: '(!global.an) && (!global.obe) && (!global.binge_frequency_weeks || !global.binge_frequency_months)',
						trigger: 'arfid'
					},
					{
						target: 8, 
						expression: '(!global.an) && (global.lacks_control) && (global.binge_frequency_weeks && global.obe) && (global.in_behaviors || global.in_exercise) && (global.in_compensate && global.in_frequency_weeks)',
						trigger: 'bn',
					},
					{
						target: 9, 
						expression: '(!global.an) && (global.lacks_control) && (global.binge_frequency_weeks && global.obe) && (!global.in_behaviors && !global.in_exercise)',
						trigger: 'binge'
					}
				]
			},
			{
				id:7.07,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7g. Do you engage in purging or exercise behaviors to compensate for binge eating episodes?'
				].join("<br/>"),
				symptom:[
					'Is the motivation for inappropriate behaviors to compensate for binge eating episodes?'
				].join("<br/>"),
				rules:[
					{
						target: 7.08,
						expression: 'true'
					}
				]
			},
			{
				id:7.08,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7h. Do you engage in purging or exercise behaviors to help you control your weight or prevent weight gain?'
				].join("<br/>"),
				symptom:[
					'Is the motivation for inappropriate behaviors to control weight or prevent weight gain?'
				].join("<br/>"),
				rules:[
					{
						target: 7.09,
						expression: 'true'
					}
				]
			},
			{
				id:7.09,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7i. In the past week, how many times have you [made yourself vomit, used laxatives, diuretics or other medications, or exercised] to influence your body shape or weight to compensate for binge eating episodes? [If denied in past week, ask about past month.]',
						'<br/>',
						'Is this consistent with how frequently the behaviors have occurred for the past 3 months? If no, how was frequency of episodes different?',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td colspan="2">Average weekly frequency over past 3 months</td></tr>',
						'<tr><td>Vomiting:</td><td><input id="saveVomitFrequency" name="Vomitting:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Laxatives:</td><td><input id="saveLaxativesFrequency" name="Laxatives:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Diuretics:</td><td><input id="saveDiureticsFrequency" name="Diuretics:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Exercise:</td><td><input id="saveExerciseFrequency" name="Exercise:Average_number_per_week" size="3"></td></tr>',
						'</table>',
	
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Has inappropriate behavior occurred at least once a week, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.10,
						expression: 'true'
					}
				]
			},
			{
				id:7.10,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7j. [Use information from 7i Ask additional questions to assess frequency as needed.]'
				].join("<br/>"),
				symptom:[
					'Has inappropriate behavior recurred, at least once a month, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
				{
						diagnosis: true,
						expression: '(global.an) && (!global.lacks_control && !global.in_behaviors)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
				},
				{
						diagnosis: true,
						expression: '(global.an) && (!global.obe && !global.in_behaviors)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
				},
				{
						diagnosis: true,
						expression: '(global.an) && (global.lacks_control && global.obe) && (global.binge_frequency_weeks || global.binge_frequency_months)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
				},
				{
						diagnosis: true,
						expression: '(global.an) && (global.in_behaviors) && (global.in_frequency_weeks || global.in_frequency_months)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
				},
				{
						target: 11,
						expression: '(!global.an) && (!global.lacks_control)',
						trigger: 'arfid'
				},
				{
						target: 11,
						expression: '(!global.an) && (!global.obe) && (!global.binge_frequency_weeks || !global.binge_frequency_months)',
						trigger: 'arfid'
				},
				{
						target: 8, 
						expression: '(!global.an) && (global.lacks_control) && (global.binge_frequency_weeks && global.obe) && (global.in_behaviors || global.in_exercise) && (global.in_compensate && global.in_frequency_weeks)',
						trigger: 'bn'
				},
				{
						target: 9, 
						expression: '(!global.an) && (global.lacks_control) && (global.binge_frequency_weeks && global.obe) && (!global.in_behaviors && !global.in_exercise)',
						trigger: 'binge'
				}
				]
			},
			{
				id:8,
				initial:false,
				instrument_id:1,
				sectionlabel:'Bulimia Nervosa',
				shortname:'none',
				interviewprobe:[
					'8. Does your weight or your body shape impact how you feel about yourself?', 
					'<br/>',
					'For example, if you were to have a day where you did not like the number on the scale, or you did not like the way your clothes fit, or you were uncomfortable with how your body shape felt in general, how much would that impact you? Would it make you feel very badly about yourself? Please describe this for me.'
				].join("<br/>"),
				symptom:[
					'Does body shape or weight exert undue influence on sense of self-worth or on self-evaluation?'
				].join("<br/>"),
				rules:[
					{
							target: 18,
							diagnosis: true,
							diagnosisname: 'Bulimia Nervosa',
							expression: 'global.bodyweight_selfworth'
					},
					{
							target: 18,
							expression: '! global.bodyweight_selfworth',
							trigger:'pica'
					}
						
				]
			},
			{
				id:9,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9. Keeping in mind the type of episode you just described, when you ate a large amount of food and feel that loss of control….'
				].join("<br/>"),
				symptom:[

				].join("<br/>"),
				rules:[
					{
						target: 9.1,
						expression: 'true'
					}
				]
			},
			{
				id:9.1,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9a. …did you eat faster than usual?'
				].join("<br/>"),
				symptom:[
					'Eating more rapidly than usual?'
				].join("<br/>"),
				rules:[
					{
						target: 9.2,
						expression: 'true'
					}
				
				]
			},
			{
				id:9.2,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9b. … did you eat until you feel uncomfortably full?'
				].join("<br/>"),
				symptom:[
					'Eating until uncomfortably full?'
				].join("<br/>"),
				rules:[
					{
						target: 9.3,
						expression: 'true'
					}
				]
			},
			{
				id:9.3,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9c. … did you eat large amounts of food when you are not hungry?'
				].join("<br/>"),
				symptom:[
					'Eating in the absence of hunger?'
				].join("<br/>"),
				rules:[
					{
						target: 9.4,
						expression: 'true'
					}
				
				]
			},
			{
				id:9.4,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9d. … did you eat alone because you feel embarrassed by how much you are eating? Or because you do not want to be seen eating in this way?'
				].join("<br/>"),
				symptom:[
					'Avoiding eating near others due to shame or embarrassment?'
				].join("<br/>"),
				rules:[
					{
						target: 9.5,
						expression: 'true'
					}
				
				]
			},
			{
				id:9.5,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9e. … did you feel sad, down, guilty, or disgusted afterwards?'
				].join("<br/>"),
				symptom:[
					'Negative affect associated with eating episode?'
				].join("<br/>"),
				rules:[
					{	
						target:10,
						expression: '(global.binge_rapid + global.binge_full + global.binge_no_hunger + global.binge_shame + global.binge_sad) >= 3'
					},
					{
						target: 11.1,
						expression: '(global.binge_rapid + global.binge_full + global.binge_no_hunger + global.binge_shame + global.binge_sad) < 3'
					}
				]
			},
			{
				id:10,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'10. How upset have you been about these episodes?'
				].join("<br/>"),
				symptom:[
					'Marked distress regarding binge eating?'
				].join("<br/>"),
				rules:[
					{	
						target: 11,
						diagnosis: true,
						diagnosisname: 'Binge Eating Disorder',
						expression: 'binge_distress',
						trigger: 'bn'
							
					},
					{
						target: 11,
						expression: '! binge_distress'
					}
				]
			},
			{
				id:11,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'11. In the last 3 months, have you had a serious nutritional problem because you severely restricted or avoided eating some foods?'
				].join("<br/>"),
				symptom:[
					'Has severe food restriction or avoidance resulted in serious nutritional problems?',
					'<br/>',
					'Restriction that occurs only in the context of a binge eating episode does not satisfy this criterion.' 
				].join("<br/>"),
				rules:[
					{
						target: 11.1,
						expression: 'global.avoidant_nutritional_problems'
					},
					{
						target: 15,
						expression: '! global.avoidant_nutritional_problems'
					}
				]
			},
			{
				id:11.1,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'11a. Have you had difficulty consistently eating enough food and as a result you have lost a significant amount of weight? How much weight?'
				].join("<br/>"),
				symptom:[
					'Has the individual experienced significant weight loss?'
				].join("<br/>"),
				rules:[
					{
						target: 11.2,
						expression: true
					}	
				
				]
			},
			{
				id:11.2,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'11b. Has difficulty eating enough food caused medical problems or nutritional deficiencies, such as anemia?'
				].join("<br/>"),
				symptom:[
					'Has the individual experienced significant nutritional deficiencies?'
				].join("<br/>"),
				rules:[
					{
						target: 11.3,
						expression: true
					}	
				
				]
			},
			{
				id:11.3,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'11c. Have you needed nutritional supplements to maintain your weight or general health?'
				].join("<br/>"),
				symptom:[
					'Have nutritional supplements or enteral feeding (via IV, nasogastric tube, etc.) been relied upon?'
				].join("<br/>"),
				rules:[
					{
						target: 11.4,
						expression: true
					}	
				
				]
			},
			{
				id:11.4,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'11d. Can you describe any eating restrictions you have? Has trouble eating enough or these particular eating restrictions made it difficult for you socially? How so? Eating out at restaurants with others? Eating with family? ',
					'<br/>',
					'If no: Have you avoided any social situations because of difficulty with eating?',
					'<br/>',
					'If no: Has significant weight loss or restrictions on eating impacted your ability to function well at work or in school?'
				].join("<br/>"),
				symptom:[
					'Have eating restrictions [e.g., avoidance of foods of particular colors or textures] resulted in marked interference with psychosocial functioning?'
				].join("<br/>"),
				rules:[
					{
						target: 12,
						expression: '(global.avoidant_weightloss || global.avoidant_nutri_def || global.avoidant_nutri_suppliment || global.avoidant_psychosocial_interference)'
					},
					{
						target: 15,
						expression: ' !(global.avoidant_weightloss || global.avoidant_nutri_def || global.avoidant_nutri_suppliment || global.avoidant_psychosocial_interference)'
					}
				]
			},
			{
				id:12,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'12. Are these problems because you have not been able to obtain or pay for enough food?',
					'<br/>',
					'If no: Are they related to a particular cultural or religious practice? How so? How do your restrictions compare to others within your identified group?'
				].join("<br/>"),
				symptom:[
					'Is there an alternate explanation to account for eating or feeding disturbance (e.g., lack or resources, culturally sanctioned practice, general medical condition)?'
				].join("<br/>"),
				rules:[
					{
						target: 13,
						expression: 'true'	
					}
				]
			},
			{
				id:13,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'13. Have you been diagnosed with a medical condition or another mental disorder that may be associated with your difficulty eating enough or dietary restriction? Or, are the dietary restrictions related to a medical condition or as prescribed by a clinician as treatment for a medical condition?'
				].join("<br/>"),
				symptom:[
					'Is an associated medical condition or mental disorder (e.g., Crohn’s disease, mental retardation, pervasive developmental disorder) present that might better account for eating restrictions or weight loss?'
				].join("<br/>"),
				rules:[
					{
						target: 14,
						expression: 'global.avoidant_alt_explaination || global.avoidant_alt_condition'	
					},
					{
						target: 15,
						expression: '!global.avoidant_alt_explaination || !global.avoidant_alt_condition'
					}
				]
			},
			{
				id:14,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant-Restrictive Food Intake Disorder(ARFID)',
				shortname:'none',
				interviewprobe:[
					'14. Have you been to see a specialist (e.g., nutritionist) for help with this problem?',
					'<br/>',
					'If no: How significantly does this problem with eating impact you? In what ways?'
				].join("<br/>"),
				symptom:[
					'Has the disturbance in eating behavior been sufficiently severe to warrant independent clinical attention?'
				].join("<br/>"),
				rules:[
					{
						target: 18,
						diagnosis: true,
						diagnosisname: 'Avoidant/Restrictive Food Intake Disorder(ARFID)',
						trigger: 'arfid',
						expression: '(global.avoidant_independent_clinical) && !(global.distorted_body_image || global.distorted_bi_influences || global.bodyweight_selfworth) '
					},
					{
						target: 15,
						diagnosis: true,
						diagnosisname: 'Avoidant/Restrictive Food Intake Disorder(ARFID)',
						trigger: 'arfid',
						expression: '!global.avoidant_independent_clinical'
					},
					{
						target: 18,
						expression: 'global.avoidant_inependent_clinical'
					}

				]
			},
			{
				id:15,
				initial:false,
				instrument_id:1,
				sectionlabel:'Rumination Disorder',
				shortname:'none',
				interviewprobe:[
					'15. In the past month, have you re-chewed, re-swallowed, or spit out your food? How often has this happened? '
				].join("<br/>"),
				symptom:[
					'Does the individual repeatedly regurgitate food?'
				].join("<br/>"),
				rules:[
					{
						target: 16,
						expression: 'global.regurge_repeated'
					},
					{
						target: 18,
						expression: '! global.regurge_repeated'
					}
				]
			},				
			{
				id:16,
				initial:false,
				instrument_id:1,
				sectionlabel:'Rumination Disorder',
				shortname:'none',
				interviewprobe:[
					'16. Have you been diagnosed with a medical condition (e.g., gastrointestinal problem such as esophageal reflux) that may account for this behavior?'
				].join("<br/>"),
				symptom:[
					'Is an associated medical condition present that might better account for the repeated regurgitation of food?'
				].join("<br/>"),
				rules:[
					{
						target: 18,
						expression: 'global.regurge_alt_explaination'
					},
					{
						target: 17,
						expression: '! global.regurge_alt_explaination'
					}
				]
			},
			{
				id:17,
				initial:false,
				instrument_id:1,
				sectionlabel:'Rumination Disorder',
				shortname:'none',
				interviewprobe:[
					'17. Have you been diagnosed with another mental disorder? If yes, have you been to see a specialist (e.g., nutritionist, psychotherapist) specifically for help with this regurgitation problem?',
					'<br/>',
					'If no: How severely do you feel this problem impact you? In what ways?'
				].join("<br/>"),
				symptom:[
					'Has the disturbance in eating behavior been sufficiently severe to warrant independent clinical attention?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						diagnosisname: 'Rumination Disorder',
						target: 18,
						trigger: 'rd',
						expression: 'global.regurge_independent_clinical'
					},
					{
						target: 18,
						expression: 'true'
					}
				]
			},					
			{
				id:18,
				initial:false,
				instrument_id:1,
				sectionlabel:'PICA',
				shortname:'none',
				interviewprobe:[
					'18. Note individual’s age:'
				].join("<br/>"),
				symptom:[
					'Is the eating of non-nutritive substance (e.g, dirt) inappropriate for developmental stage/age?'
				].join("<br/>"),
				rules:[
					{
						target: 19,
						expression: 'global.nonfood_age_appropriate'
					},
					{
						diagnosis:true,
						expression: '! global.nonfood_age_appropriate',
						endifdiagnosis: true,
						target: 22
					}
				]
			},
			{
				id:19,
				initial:false,
				instrument_id:1,
				sectionlabel:'PICA',
				shortname:'none',
				interviewprobe:[
					'19. Have you eaten any non-food materials (e.g., dirt, paint) in the past few months? What have you eaten?' 
				].join("<br/>"),
				symptom:[
					'Has there been persistent ingestion of non-nutritive, non-food substances?'
				].join("<br/>"),
				rules:[
					{
						target: 20,
						expression: 'global.nonfood_persistent'
					},
					{
						target: 22,
						expression: '! global.nonfood_persistent'
					}

				]
			},														
			{
				id:20,
				initial:false,
				instrument_id:1,
				sectionlabel:'PICA',
				shortname:'none',
				interviewprobe:[
					'20. Is the eating behavior you’ve described related to a particular cultural or religious practice? How so? Is this similar or different to others within your identified group?'
				].join("<br/>"),
				symptom:[
					'Is eating behavior a culturally sanctioned practice?'
				].join("<br/>"),
				rules:[
					{
						target: 21,
						expression: 'global.nonfood_culturally_sanctioned'
					},
					{
						diagnosis:true,
						expression: '! global.nonfood_culturally_sanctioned',
						endifdiagnosis: true,
						target: 22
					}
				
				]
			},														
			{
				id:21,
				initial:false,
				instrument_id:1,
				sectionlabel:'PICA',
				shortname:'none',
				interviewprobe:[
					'21. Have you been diagnosed with another mental disorder? If yes, have you been to see a specialist (e.g., nutritionist, psychotherapist) specifically for help with this eating behavior?',
					'<br/>',
					'If no: How severely do you feel this behavior impacts you? In what ways?' 
				].join("<br/>"),
				symptom:[
					'Is the disturbance in eating behavior sufficiently severe to warrant independent clinical attention?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						diagnosisname: 'PICA',
						expression: 'global.nonfood_culturally_sanctioned',
						endifdiagnosis: true
					},
					{
						target: 22,
						expression: '! global.nonfood_culturally_sanctioned',
					}
			
				]
			},																	
			{
				id:22,
				initial:false,
				instrument_id:1,
				sectionlabel:'Atypical Anorexia Nervosa',
				shortname:'none',
				interviewprobe:[
					'22. This condition may be assigned to an individual who exhibits ALL of the behavioral and cognitive disturbances characteristic of anorexia nervosa, but whose body weight is not below minimally normal. Such presentations have been described among individuals who have been obese and lost substantial weight, for example, after bariatric surgery, but whose weight remains within or above a normal range.',
					'<br/>',
					'Note: This condition can occur with or without compensatory behaviors.'
 				].join("<br/>"),
				symptom:[
					'',
				].join("<br/>"),
				rules:[
				{
					target: 23,
					expression: 'true'	
				}
				]
			},
			{
				id:23,
				initial:false,
				instrument_id:1,
				sectionlabel:'Subthreshold Bulimia Nervosa',
				shortname:'none',
				interviewprobe:[
					'23. The criteria for this condition are identical to those for bulimia nervosa, except that the frequency of binge eating and inappropriate compensatory behavior is less than once a week and/or the duration of the behavior is less than 3 months.'
 				].join("<br/>"),
				symptom:[
					'',
				].join("<br/>"),
				rules:[
				{
					target: 24,
					expression: 'true'	
				}
				]
			},																				
			{
				id:24,
				initial:false,
				instrument_id:1,
				sectionlabel:'Purging Disorder',
				shortname:'none',
				interviewprobe:[
					'24. The criteria for this condition are very similar to those for bulimia nervosa, except that the individual does not engage in the recurrent binge eating. Individuals with purging disorder consume an amount of food that is not objectively large, but engage in inappropriate behavior after eating.'
 				].join("<br/>"),
				symptom:[
					'',
				].join("<br/>"),
				rules:[
				{
					target: 25,
					expression: 'true'	
				}
				]
			},			
			{
				id:25,
				initial:false,
				instrument_id:1,
				sectionlabel:'Subthreshold Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'25. The criteria for this condition are identical to those for binge eating disorder, except that the frequency of binge eating is less than once a week and/or the duration of the behavior is less than 3 months.'
 				].join("<br/>"),
				symptom:[
					'',
				].join("<br/>"),
				rules:[
				{
					target: 26,
					expression: 'true'	
				}
				]
			},			
			{
				id:26,
				initial:false,
				instrument_id:1,
				sectionlabel:'Night Eating Syndrome',
				shortname:'none',
				interviewprobe:[
					'26. This condition may be assigned to an individual who exhibits a daily pattern of eating with significantly increased intake in the evening and/or nighttime. Eating episodes must not be better accounted for by existing social norms (e.g., college dorm) or occur solely in the context of disturbances in sleep necessitated by responsibilities (e.g., during night-shift work, nursing a baby).', 
					'<br/>',
					'For more information, see criteria published in Int J Eat Disord 2010;43:241-7.'
 				].join("<br/>"),
				symptom:[
					'',
				].join("<br/>"),
				rules:[
				{
					target: 'finish'
				}
				]
			},			
			
		]
	}
});


//Utility stuff


var calculateBmi  = new Function(
				['var weight = parseFloat(document.getElementById("saveWeight").value);',
				'var height = parseFloat(document.getElementById("saveHeight").value); ',
				'console.debug("this is called");',
				'document.getElementById("saveBmi").value = (weight/(height*height)) * 703; '].join("\n")
			);

