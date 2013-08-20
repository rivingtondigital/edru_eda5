Ext.require('Ext.data.Store');

Ext.define('ceda.store.QuestionStore', {
	extend: 'Ext.data.Store', 
	require: ['ceda.model.Question'],
	config:{
		storeId: 'questionStore',
		model: 'ceda.model.Question',
		data: [
//	*************************************
//	First section acquires date, ID, Age
//	*************************************
			{	id: 1,
				initial: true,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'ID',
				interviewprobe: [
							[
								'1. Enter date and codes for interviewee and interviewer. ',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Date of interview: <span></td>',
								'<td><input id="saveInterviewDate" name="Interview:Date:date" type="text"></input></td>',
								'</tr><tr>',
								'<td><span>ID of person interviewed: <span></td>',
								'<td><input id="saveSubjectID" name="Interview:SubjectID:number" type="text"></input></td>',
								'</tr><tr>',
								'<td><span>Subject&#39s Age: <span></td>',
								'<td><input id="saveSubjectAge" name="Interview:SubjectAge:number" type="text"></input></td>',
								'</tr><tr>',
								'<td><span>ID of interviewer:</span></td>',
								'<td><input id="saveInterviewerID" name="Interview:InterviewerID:number" type="text"></input></td>',
								'</tr>',
								'</table>',
								'<br/>'
							].join('')
				
				],
				symptom: 'To begin, please enter information.',
				rules: [
					{
						target: 2,
						expression: 'true'
					}
				]
			},
//	****************************************************************************
//	Section to assess whether there is an eating disturbance
//	****************************************************************************
			{	id: 2,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'Eating Disturbance',
				interviewprobe: '2. Are you having any problems with your eating? For example, is it hard for you to maintain your weight or alter your diet (e.g., eat certain types of food, eat at particular times of day)?<br><br>Do other people feel you have a problem in these areas?',
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
						target: 3.01,
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
//	****************************************************************************
//	Calculation of BMI, and assessment of current weight status.
//	****************************************************************************
			{	id: 3.01,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'BMI calculation',
				shortname: 'BMI',
				interviewprobe: [
							[
								'3.01 What are your current height and weight? (Measure if possible)',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Weight in lbs: <span></td>',
								'<td><input type="text" size=2 id="saveWeight" name="BMI:Weight" onChange="calculateBmi()"></input></td>',
								'</tr><tr>',
								'<td><span>Height in inches: <span></td>',
								'<td><input type="text" size=2 id="saveHeight" name="BMI:Height" onChange="calculateBmi()"></input></td>',
								'</tr><tr>',
								'<td><span>BMI (kg/m2)</span></td>',
								'<td><input type="text" size=2 disabled="true" name="BMI:BMI" id="saveBmi"></input></td>',
								'</tr>',
								'</table>'
							].join('')
				
				],
				symptom: [
							[
							"BMI range (adults):",
								"",                       
								"•	Underweight ≤ 18.5",
								"•	Normal weight = 18.5–24.9",
								"•	Overweight = 25–29.9",
								"•	Obesity ≥ 30 ",
								""
							].join('<br>')
				].join('<br>'),
				rules: [
					{
						target: 5.1,	// check for other sx of AN
						expression: 'global.underweight'
					},
					{
						target: 4.06,	// if normal or over now, check last 3m
						expression: 'global.normalweight || global.overweight'
					}
				]
			},
//	****************************************************************************	 
// Next 2 questions deal with RECENT low weight
//	****************************************************************************
			{
				id:4.06,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'recent low weight',
				interviewprobe: [
						'4.06 What was your lowest weight in the last three months?'
					].join("<br>"),

				symptom: 'In the last 3 months, was individual at a significantly low body weight (ie, individual’s weight is significantly less than that of otherwise comparable normal individuals)? For adults, a BMI of 18.5 kg/m2 has been employed by the CDC as the lower limit of normal body weight.',
				rules: [
					{
						target: 4.07,	// get low weight
						expression: 'global.recentlowweight'
					},
					{
						target: 7.01,	// not low now or recently: not AN
						expression: '!global.recentlowweight'
					}
					
				]
			},
			{
				id:4.07,
				initial:false,
				instrument_id:1,
				sectionlabel:'Recent Low Weight',
				shortname:'none',
				interviewprobe:[
						[	
							'4.07. Enter height and lowest weight in the last 3 months.',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Weight in lbs: <span></td>',
								'<td><input type="text" size=2 id="saveRecentWeight" name="BMI:RecentWeight" onChange="calculateRecentLowBMI()"></input></td>',
								'</tr><tr>',
								'<td><span>Height in inches: <span></td>',
								'<td><input type="text" size=2 id="saveHeight" name="BMI:RecentHeight" onChange="calculateRecentLowBMI()"></input></td>',
								'</tr><tr>',
								'<td><span>Lowest BMI (kg/m2): </span></td>',
								'<td><input type="text" size=2 disabled="true" name="BMI:RecentLowBMI" id="saveRecentLowBMI"></input></td>',
								'</tr>',
								'</table>'
					].join('')
				],
				symptom:[
					'Enter height and lowest weight in the last 3 months.'
				].join("<br/>"),
				rules:[
					{
						target: 5.1,	// assess other sx of AN
						expression: true
					}
				]
			},
// ****************************************************************************
// End of 2 questions dealing with recent low weight
// ****************************************************************************
//
//	****************************************************************************
//	Assess fear of weight gain
//	****************************************************************************
			{
				id:5.1,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'fear of weight gain',
				interviewprobe: [
						'5a. Are you afraid of gaining weight?', 
						'',
						'If no: Are you worried that if you start to gain weight, you will continue to gain weight and will become fat?'
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
					'5b. [Once any of the interfering behaviors below is endorsed, press YES and proceed.]',
					'',
					'Do you try to cut back on calories or amounts or types of food? What do you try to do?',
					'',
					'Do you exercise? What do you do and how often?',
					'',
					'Do you vomit or use any types of pills (diet pills, diuretics, laxatives)?',
					'',
					'Do you do anything else that might make it hard for you to gain or maintain weight?',
					'',
				].join("<br>"),
				symptom:[
					'Are persistent behaviors [e.g., dietary restriction, excessive exercise, purging, fasting] interfering with weight gain?',
					'',
					'',
					'Other clinically significant behavior that interferes with weight gain might include spitting out food or inappropriate stimulant use.'
				].join("<br>"),
				rules:[
					{
						target: 6.1,
						expression: 'global.fearofgain || global.interfering'
					},
					{
						target: 7.01,	//	If no fear of weight gain, skip out of AN section
						expression: 'true'
					}
				]
			},
//	****************************************************************************
//	Assess body image disturbance and concern about being low in weight
//	At end of this section, assess criteria for AN
//	****************************************************************************
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
					'[e.g., description of feeling he/she appears fat despite being at a low weight]?'
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
					'For example, if you were to have a day when you did not like the number on the scale, or the way your clothes fit, or how your body shape felt in general, how much would that impact you? Would it make you feel very badly about yourself? Please tell me a little about this.'
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
						diagnosis: true,	// Has AN. Note that only got here after determining weight is or has been recently low
						expression: 'global.distorted_body_image || global.distorted_bi_influence || !global.understands_seriousness',
						trigger: 'an',	// Definition of an: low weight + distortedImage + bodyImageInfluence + noUnderstandingOfSeriousness
						diagnosisname: 'Anorexia Nervosa',
						target: 7.01
					},
					{
						target: 7.01,
						expression: 'true'
					}
				]
			},
//	****************************************************************************
//	Assessment of Binge Eating
//	****************************************************************************
//
//
//	****************************************************************************
//	Assessment of loss of control
//	****************************************************************************
			{
				id:7.01,
				initial:false,
				instrument_id:1,
				sectionlabel: 'Binge Eating & Compensatory Behaviors',
				shortname: 'lack of control',
				interviewprobe:[
					'7a. In the past few months, were there times when you felt a sense of loss of control over eating…or times when you felt that you could not stop eating or control what or how much you were eating?',
					'<br/>',
					'If no: Have there been times when you felt you could not prevent yourself from eating? '
				].join("<br>"),
				symptom:[
					'Has the individual experienced a lack of control while eating?'
				].join("<br/>"),
				rules:[
					{
						target:	7.02,
						expression: 'global.lacks_control'
					},
					{
						target: 7.05,
						expression: '!global.lacks_control'
					}
				]
			},
//	****************************************************************************
//	OBE assessment
//	****************************************************************************
			{
				id:7.02,
				initial:false,
				instrument_id:1,
				sectionlabel: 'Binge Eating & Compensatory Behaviors',
				shortname: 'Example of loss of control',
				interviewprobe:[
					'7b. Were there times in the last three months when you felt out of control and consumed what was clearly a large amount of food?',
					'<br/>',
					'Can you give me an example of what you typically ate? And the context?',
					'<br/>'
				].join("<br/>"),
				symptom:[
					'Objective Binge Episode (OBE): Has the individual eaten an objectively large amount of food in a discrete period of time, while experiencing a loss of control?',
					'<br>'
				].join("<br/>"),
				rules:[
					{
						target: 7.0201,
						expression: 'global.obe'
					},
					{
						target: 7.0210,
						expression: '!global.obe'
					}
				]
			},
			{
				id:7.0201,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7b.11. How many times in the last WEEK have you had an eating episode like what you have just described, when you ate a large amount of food and felt a lack of control?',
					'<br/>',
					'Is this consistent with how frequently this behavior has occurred for the past 3 months? If no, how was frequency of episodes different?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Has objective binge eating occurred at least once a week, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0203,
						expression: 'global.OBE_1perWK'
					},
					{
						target: 7.0202,
						expression: '!global.OBE_1perWK'
					}
				]
			},
			{
				id:7.0202,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7b.12. How many times in the last MONTH have you had an eating episode when you ate a large amount of food and felt a lack of control?',
					'Is this consistent with how frequently this behavior has occurred for the past 3 months? If no, how was frequency of episodes different?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Has objective binge eating occurred at least once a month, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0203,
						expression: 'global.OBE_1perMON'
					},
					{
						target: 7.0210,
						expression: '!global.OBE_1perMON'
					}
				]
			},
			{
				id:7.0203,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
						[	
							'7b.21. Enter average number of objective binge episodes per WEEK over the last 3 months.',
							'(If frequency is less than once a week, divide monthly frequency by 4. For example, 2 binge episodes/month = 0.5 episodes/week.)',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span># of OBEs per week: <span></td>',
								'<td><input id="saveOBEfreq" name="BingeEating:OBEs" type="text"></input></td>',
								'</tr>',
								'</table>'
					].join('')
				],
				symptom:[
					'Enter weekly frequency of objective binge episodes (OBEs).'
				].join("<br/>"),
				rules:[
					{
						target: 7.0210,
						expression: true
					}
				]
			},
//	****************************************************************************
//	SBE assessment
//	****************************************************************************
			{
				id:7.0210,
				initial:false,
				instrument_id:1,
				sectionlabel: 'Binge Eating & Compensatory Behaviors',
				shortname: 'Example of loss of control: SBE',
				interviewprobe:[
					'7b.31 Were there times in the last three months when you felt out of control but consumed no more than what others would judge to be a small or normal amount of food?',
					'<br/>',
					'Can you give me an example of what you typically ate? And the context?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Subjective Binge Episode (SBE): Has the individual eaten a subjectively large amount of food in a discrete period of time, while experiencing a loss of control?',
					'<br>',
				].join("<br/>"),
				rules:[
					{
						target: 7.0211,
						expression: 'global.sbe'
					},
					{
						target: 7.05,
						expression: '!global.sbe'
					}
				]
			},
			{
				id:7.0211,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7b.32. How many times in the last WEEK have you had an eating episode like what you have just described, when you ate a small or normal amount of food and felt a lack of control?',
					'<br/>',
					'Is this consistent with how frequently this behavior have occurred for the past 3 months? If no, how was frequency of episodes different?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Has subjective binge eating occurred at least once a week, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0213,
						expression: 'global.sbe_frequency_weeks'
					},
					{
						target: 7.0212,
						expression: '!global.sbe_frequency_weeks'
					}
				]
			},
			{
				id:7.0212,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7b.33. How many times in the last month have you had an eating episode when you ate a small or normal amount of food but felt a lack of control?',
					'<br/>',
					'Is this consistent with how frequently this behavior has occurred for the past 3 months? If no, how was frequency of episodes different?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Has subjective binge eating occurred at least once a month, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0213,
						expression: 'global.sbe_frequency_months'
					},
					{
						target: 7.05,
						expression: '!global.sbe_frequency_months'
					}
				]
			},
			{
				id:7.0213,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					'7b.34. Enter average number of subjective binge episodes per week over the last 3 months.',
					'<br/>',
					'(If frequency is less than once a week, divide monthly frequency by 4. For example, 2 binge episodes/month = 0.5 episodes/week.)',
					'<br/><br/>',
					'<table border=1 spacing=1 padding=2>',
					'<tr>',
					'<td><span># of SBEs per week: <span></td>',
					'<td><input id="saveSBEfreq" name="BingeEating:SBEs" type="text"></input></td>',
					'</tr>',
					'</table>'
				].join("<br/>"),
				symptom:[
					'Enter weekly frequency of subjective binge episodes (SBEs).'
				].join("<br/>"),
				rules:[
					{
						target: 7.05,
						expression: true
					}
				]
			},
// End of section evaluating SBEs
//
//	****************************************************************************
//	Next section evaulates purging
//	****************************************************************************
			{
				id:7.05,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7e. Do you make yourself vomit, or overuse (misuse) laxatives, diuretics or other medications?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Does the individual use inappropriate (purging) behaviors?',
					'<br/>',
					'Indicators of misuse include taking laxatives, diuretics, or other medications (e.g., diet pills) for weight control without a prescription, using more pills than suggested, or at a higher frequency.'
				].join("<br/>"),
				rules:[
					{
						target: 7.0501,
						expression: 'global.purging'
					},
					{
						target: 7.06,
						expression: '!global.purging'	// to exercise
					}
				]
			},
			{
				id:7.0501,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7e.1. In the last week, how many times have you engaged in this type of behavior?',
						'<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Does  the individual engage in inappropriate (purging) behaviors, on average, at least once a WEEK over the last 3 months?',
					'<br/>',
				].join("<br/>"),
				rules:[
					{
						target: 7.0505,						// document frequency
						expression: 'global.purging1xWK'
					},
					{
						target: 7.0502,
						expression: '!global.purging1xWK'
					}
				]
			},
			{
				id:7.0502,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7e.2. In the last month, how many times have you engaged in this type of behavior?',
						'<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Has  the individual engaged in inappropriate (purging) behaviors, on average, at least once a MONTH over the last 3 months?',
					'<br/>',
				].join("<br/>"),
				rules:[	
					{
						target: 7.0505,						// document frequency
						expression: 'global.purging1xMON'
					},
					{
						target: 7.06,
						expression: '!global.purging1xMON'	// to exercise
					}
				]
			},
			{
				id:7.0505,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7e.5. Can you estimate how many times per week over the last 3 months, on average, you have made yourself vomit, or misused laxatives, diuretics or other medications?',
						'<br/>',
					].join("<br/>"),
					[
						'<table>',
						'<tr><td colspan="2">Average weekly frequency over past 3 months</td></tr>',
						'<tr><td>Vomiting:</td> <td><input id="saveVomitFrequency" name="Vomitting:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Laxatives:</td> <td><input id="saveLaxativesFrequency" name="Laxatives:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Diuretics:</td> <td><input id="saveDiureticsFrequency" name="Diuretics:Average_number_per_week" size="3"></td></tr>',
						'<tr>',
						'<td>If other method used, describe below and enter frequency per week</td><td>&nbsp;</td>',
						'<tr>',
						'<td><input id="optionalOtherMethodName" name="OtherMethod:Name" size="35" placeholder="Description"></input></td>',
						'<td><input id="optionalOtherMethodFrequency" name="OtherMethod:Average_number_per_week" size="3"></input></td>',
						'</tr>',
//						'<tr><td><input id="optionalExerciseDuration" name="Exercise:Duration" size="3"></td></tr>',
						'</table>',
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Average number of episodes per WEEK over last 3 months. Has inappropriate behavior occurred at least once a week, on average, for the last 3 months?',
					'(If frequency is less than once a week, divide monthly frequency by 4. For example, 2 episodes/month = 0.5 episodes/week.)'
				].join("<br/>"),
				rules:[
					{
						target: 7.06,	// to exercise
						expression: true
					}
				]	
			},	
//	****************************************************************************
//	Next section evaluates exercise
//	****************************************************************************
			{
				id:7.06,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7f. Do you exercise? What type of exercise do you do and for how long?',
						'<br/>',
						'Does the amount of exercise interfere with health or with fulfilling daily responsibilities?'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Does the individual use exercise inappropriately (ie, exercise excessively)?',
					'<br/>',
					'Indicators of excessive exercise include exercising despite illness or injury, exercising to an extent that it interferes with daily responsibilities (e.g., being late for work or school), or feeling highly distressed when unable to exercise.'
				].join("<br/>"),
				rules:[
					{
						target: 7.0601,	//  assess frequency of exercise
						expression: 'global.in_exercise'
					},
					{
						target: 7.07,	// not exercising, but purging; determine reasons why
						expression: 'global.purging'
					},
					// next branches needed to deal with NO purging, +/-AN
					// should never get to these if purging, but included !purging below for clarity
					{
						diagnosis: true,
						expression: 'global.an && !global.purging && !global.OBE_1perMON && !global.OBE_1perWK',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
					},	
					{
						diagnosis: true,
						expression: 'global.an && !global.purging && (global.OBE_1perMON || global.OBE_1perWK)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
					},
					// 8/13: Cannot make other dx assessments until assess reasons for purging or exercise
				]
			},
			{
				id:7.0601,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7f.1. In the last week, how many times have you engaged in this type of exercise?',
						'<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Has the individual exercised inappropriately (ie, exercise excessively) at least once a week over the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0605,						// document frequency
						expression: 'global.in_exercise1xWK'
					},
					{
						target: 7.0602,
						expression: '!global.in_exercise1xWK'
					}
				]
			},
			{
				id:7.0602,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7f.2. In the last month, how many times have you engaged in this type of behavior?',
						'<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Has the individual exercised inappropriately, on average, at least once a MONTH over the last 3 months?',
					'<br/>',
				].join("<br/>"),
				rules:[	
					{
						target: 7.0605,						// document frequency
						expression: 'global.in_exercise1xMON'
					},
					{
						target: 7.07,						// reasons why
						expression: '!global.in_exercise1xMON'
					}
				]
			},
			{
				id:7.0605,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'7f.5. In the past week, how many times have you exercised inappropriately?',
						'<br/>',
						'Is this consistent with how frequently the behaviors have occurred for the past 3 months? If no, how was frequency of episodes different?',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td>Type of Exercise</td></tr>',
						'<tr><td><input id="optionalExerciseType" name="Exercise:Type"></td></tr>',
						'<tr><td>Duration (hours per week)</td></tr>',
						'<tr><td><input id="optionalExerciseDuration" name="Exercise:Duration" size="3"></td></tr>',
						'</table>'
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Average number of episodes per WEEK over last 3 months.',
					'(If frequency is less than once a week, divide monthly frequency by 4. For example, 2 binge episodes/month = 0.5 episodes/week.)'
				].join("<br/>"),
				rules:[
					{
						target: 7.07,	// reasons why
						expression: 'true'
					}
				]	
			},	
// 
// End of exercise assessment
//	****************************************************************************
//	Assessment of reasons for purging or exercise: required for BN
//	After next 2 questions, make a lot of decisions
//	****************************************************************************
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
					{	// I do not think this will ever be hit, 
						diagnosis: true,
						expression: '(global.an) && (!global.OBE_1perMON && !global.in_frequency_months)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
					},
					{	// or this--but don't think it will hurt!
						diagnosis: true,
						expression: '(global.an) && (global.OBE_1perMON || global.purging1XMON)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
					},
					{	// Assess whether criteria for BN MIGHT be met
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(global.in_behaviors || global.in_exercise) && ',
							'(global.in_compensate || global.in_weightloss)'
						].join(''),
						target: 8,
						trigger: 'bn'
					},
					{	//	Determine whether criteria for BED MIGHT be met
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(!global.in_behaviors && !global.in_exercise)'	
						].join(''),
						trigger: 'binge',
						target: 9.1	// changed from 9 
					},
					{
						expression: 'true',		// This is logically the last if-else; go to ARFID
						target: 11
					}
				]
			},
// 8/14: I have moved this to other questions, and logic is now in 7.08. Should never be hit. Hopefully can be eliminated.
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
						expression: 'false'
					},
					{
						diagnosis: true,
						expression: '(global.an) && (!global.OBE_1perMON && !global.in_frequency_months)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
					},
					{
						diagnosis: true,
						expression: '(global.an) && (global.OBE_1perMON || global.in_frequency_months)',
						trigger: 'an-bs',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
					},
					{
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(global.in_behaviors || global.in_exercise) && ',
							'(global.in_compensate || global.in_weightloss)'
						].join(''),
						target: 8,
						trigger: 'bn'
					},
					{
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(! global.in_behaviors && !global.in_exercise)'	
						].join(''),
						trigger: 'binge',
						target: 9.1	// changed from 9 
					},
					{
						expression: 'true',		// This is logically the last if-else; go to ARFID
						target: 11
					},
					{
						expression: [
							'(!global.an) && (!global.lacks_control) && ',
							'(global.OBE_1perMON && global.obe) '
							].join(''),
						target: 11, 
						trigger: 'arfid'
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
						expression: '(global.an) && (!global.OBE_1perMON && !global.in_frequency_months)',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 18
					},
					{
						diagnosis: true,
						expression: '(global.an) && (global.OBE_1perMON || global.in_frequency_months)',
						trigger: 'an-bs',
						diagnosisname: 'Binge-Purge Subtype',
						target: 18
					},
					{
						expression: [
							'(!global.an && !global.lacks_control && global.OBE_1perWK) && ',
							'(global.in_behavior || global.in_excercise) && ',
							'(global.in_compensate && in_frequency_weeks)'
						].join(''),
						target: 8,
						trigger: 'bn'
					},
					{
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(! global.in_behavior && !global.in_exercise)'	
						].join(''),
						trigger: 'binge',
						target: 9.1 //	Changed from 9, to skip question 9
					},
					{
						expression: [
							'(!global.an) && (!global.lacks_control) && ',
							'(global.OBE_1perMON && global.obe)'
							].join(''),
						target: 11, 
						trigger: 'arfid'
					}
				]
			},
//	****************************************************************************
//	Assessment of reasons for purging or exercise: required for BN
//	****************************************************************************
			
			{
				id:8,
				initial:false,
				instrument_id:1,
				sectionlabel:'Bulimia Nervosa',
				shortname:'none',
				interviewprobe:[
					'8. Does your weight or your body shape impact how you feel about yourself?', 
					'',
					'For example, if you were to have a day when you did not like the number on the scale, or the way your clothes fit, or how your body shape felt in general, how much would that impact you? Would it make you feel very badly about yourself? Please tell me a little about this.'
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
// This is now skipped over
			{
				id:9,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'9. Keeping in mind the type of episode you just described, when you ate a large amount of food and feel that loss of control…'
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
// End of skipped over
			{
				id:9.1,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'Keeping in mind the type of episode you described just a moment ago, when you ate a large amount of food and felt that loss of control…',
					'<br/>',
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
					'9b. … did you eat until you felt uncomfortably full?'
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
					'9c. … did you eat large amounts of food when you were not hungry?'
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
					'9d. … did you eat alone because you felt embarrassed by how much you are eating? Or because you did not want to be seen eating in this way?'
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
						diagnosis: true,
						expression: 'global.binge_distress',
						trigger: 'bn',
						diagnosisname: 'Binge Eating Disorder',
						target: 11
					},
					{
						target: 11,
						expression: '! global.binge_distress'
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
					'<b>Notes:</b>',
					'Sufficient information may already be available to answer this without additional questions. ',
					' ',
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
					'11d. Can you describe any eating restrictions you have? Has trouble eating enough or these particular eating restrictions made it difficult for you socially? How so?',
					'<br/>',
					'If unclear: Do you have problems eating out at restaurants with others? Eating with family? ',
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
					'If no: Are they related to a particular cultural or religious practice? How do your restrictions compare to others within your identified group?'
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
					'13. Have you been diagnosed with a medical condition or an emotional problem that may be associated with your difficulty eating enough? Or, are the dietary restrictions due to a medical condition or prescribed by a clinician?'
				].join("<br/>"),
				symptom:[
					'Is an associated medical condition or mental disorder (e.g., Crohn’s disease, mental retardation, pervasive developmental disorder) present that might better account for eating restrictions or weight loss?'
				].join("<br/>"),
				rules:[
					{
						target: 15,	// changed from 14 to 15; BTW 6/28/13
						expression: 'global.avoidant_alt_explanation || global.avoidant_alt_condition'	
					},
					{
						target: 14, // changed from 15 to 14; BTW 6/28/13
						expression: '!global.avoidant_alt_explanation && !global.avoidant_alt_condition'	// || changed to &&; BTW 6/28/13
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
					'16. Have you been diagnosed with a medical condition (e.g., gastrointestinal problem such as esophageal reflux) or an emotional problem that may be associated with this eating behavior (re-chewing, etc.)?'
				].join("<br/>"),
				symptom:[
					'Is an associated medical condition or mental disorder present that might better account for the repeated regurgitation of food?'
				].join("<br/>"),
				rules:[
					{
						target: 18,
						expression: 'global.regurge_alt_explanation'
					},
					{
						target: 17,
						expression: '! global.regurge_alt_explanation'
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
					'17. Have you been to see a specialist (e.g., nutritionist, psychotherapist) specifically for help with this regurgitation problem?',
					'<br/>',
					'If no: How severely does the problem affect you? In what ways?'
				].join("<br/>"),
				symptom:[
					'Is the disturbance in eating behavior sufficiently severe to warrant clinical attention in addition to that for the psychiatric problem?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						diagnosisname: 'Rumination Disorder',
						target: 19,	// changed from 18 to skip over question re age-appropriateness of pica
						trigger: 'rd',
						expression: 'global.regurge_independent_clinical'
					},
					{
						target: 19,	// as above
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
					'18. Do you regularly eat items that others do not consider food?',
					'<br/>',
					'If Yes: can you give some examples?'
//						'Note individual’s age:',
//						'<br/><br/>',
//						'<table border=1 spacing=1 padding=2>',
//						'<tr>',
//						'<td><span>Age in years: <span></td>',
//						'<td><input type="text" size=2 id="saveAge" name="PICA:Age"></input></td>',
//						'</tr>',
//						'</table>'
				].join("<br/>"),
				symptom:[
					'Is there eating of non-nutritive substance (e.g, dirt) that is inappropriate for developmental stage/age?'
				].join("<br/>"),
				rules:[
					{
						target: 19,
						expression: 'global.nonfood_age_appropriate'
					},
					{
						expression: '! global.nonfood_age_appropriate',
						endifdiagnosis: true,
						target: 30	// to section on other ED
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
						target: 30,	// to section on other ED
						expression: '! global.nonfood_persistent',
						endifdiagnosis: true
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
					'20. Is the eating behavior you’ve described related to a particular cultural or religious practice? How is it  similar or different compared to others within your identified group?'
				].join("<br/>"),
				symptom:[
					'Is eating behavior a culturally sanctioned practice?'
				].join("<br/>"),
				rules:[
					{
						target: 30,	// to section on other ED
						expression: 'global.nonfood_culturally_sanctioned',
						endifdiagnosis:true
					},
					{
						target: 21,
						expression: '!global.nonfood_culturally_sanctioned'
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
					'21. Have you been to see a specialist (e.g., nutritionist, psychotherapist) specifically for help with this eating  problem?',
					'<br/>',
					'If no: How severely does the problem affect you? In what ways?' 
				].join("<br/>"),
				symptom:[
					'Is the disturbance in eating behavior sufficiently severe to warrant independent clinical attention?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						diagnosisname: 'PICA',
						expression: 'global.nonfood_needs_clinical',
						endifdiagnosis: true
					},
					{
						target: 30,	// to section on other ED
						expression: '! global.nonfood_needs_clinical'
					}
			
				]
			},																	

//	
// Assessment of other eating disorders
// Section starts with id = 30, to keep clearly separate from what has preceded.
//
			{
				id:30,
				initial:false,
				instrument_id:1,
				sectionlabel:'Other Eating Disorders',
				shortname:'none',
				interviewprobe:[
					'30. The conditions very briefly described below are other eating disorders noted in DSM-5, but not formally recognized. ',
					'<b>Atypical Anorexia Nervosa:</b> meets all criteria for Anorexia Nervosa, but, despite significant weight loss, weight is within or above normal range.',
					'<b>Subthreshold Bulimia Nervosa:</b> meets all criteria for Bulimia Nervosa, but low in frequency or of limited duration.',
					'<b>Subthreshold Binge Eating Disorder:</b> meets all criteria for Binge Eating Disorder, but low in frequency or of limited duration.',
					'<b>Purging Disorder:</b> Recurrent purging to influence shape or weight, but no binge eating. ',
					'<b>Night Eating Syndrome:</b> Recurrent episodes of night eating (after falling asleep or after evening meal.',
					'<b>Other (unspecified) Eating Disorder</b>',
					'<br/>',
					].join("<br/>"),
				symptom:[
					'Brief descriptions are provided below. Proceed to the next page to indicate the most appropriate diagnosis. Choose the one that most closely matches the presenting problem.',
				].join("<br/>"),
				rules:[
				{
					target: 31, 
					expression: true,
				}
				
				]
			},
			{
				id:31,
				initial:false,
				instrument_id:1,
				sectionlabel:'Other Eating Disorders',
				shortname:'none',
				interviewprobe:[
					'31. The conditions below are other eating disorders noted in DSM-5, but not formally recognized. ',
					].join("<br/>"),
				symptom:[
					'Choose the disorder that most closely matches the presenting problem.',
				].join("<br/>"),
				rules:[
				{
					diagnosis: true,
					diagnosisname: 'Atypical Anorexia Nervosa',
					expression: 'global.atypicalAN',
					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Subthreshold Bulimia Nervosa',
					expression: 'global.subthresholdBN',
					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Subthreshold Binge Eating Disorder',
					expression: 'global.subthresholdBED',
					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Purging Disorder',
					expression: 'global.purgingdisorder',
					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Night Eating Syndrome',
					expression: 'global.NES',
					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Other (unspecified) Eating Disorder',
					expression: 'global.otherED',
					endifdiagnosis: true
				}
				
				]
			},




//	
// Below is all the original material for assessing 'other' EDs
//
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
					''
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

var calculateRecentLowBMI  = new Function(
				['var weight = parseFloat(document.getElementById("saveRecentWeight").value);',
				'var height = parseFloat(document.getElementById("saveHeight").value); ',
				'console.debug("this is called");',
				'document.getElementById("saveRecentLowBMI").value = (weight/(height*height)) * 703; '].join("\n")
			);

