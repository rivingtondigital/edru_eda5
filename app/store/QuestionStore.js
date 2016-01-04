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
								'Enter date and codes for interviewer and subject. ',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Date of interview: <span></td>',
								'<td><input id="saveInterviewDate" name="Interview:Date:date" type="text"></input></td>',
								'</tr><tr>',
								'<td><span>ID of interviewer:</span></td>',
								'<td><input id="saveInterviewerID" name="Interview:InterviewerID" type="text"></input></td>',
								'</tr><tr>',
								'<td><span>ID of subject: <span></td>',
								'<td><input id="saveSubjectID" name="Interview:SubjectID" type="text"></input></td>',
								'</tr><tr>',
								'<td><span>Subject&#39s age: <span></td>',
								'<td><input id="saveSubjectAge" name="Interview:SubjectAge:number" type="text"></input></td>',
								'</tr>',
								'</table>',
								'<br/>'
							].join(''),
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
				interviewprobe: 'Are you having any problems with your eating? For example, is it hard for you to maintain your weight or alter your diet (e.g., eat certain types of food, eat at particular times of day)?<br><br>Do other people feel you have a problem in these areas?',
				symptom: 'Is there a disturbance in eating or eating-related behavior?',
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
				interviewprobe: 'Can you describe a typical day of eating? When and what do you eat?<br/><br/><i>As indicated, ask about symptoms such as the examples above.</i>',
				symptom: 'Is an abnormal eating pattern present (for example, fasting, severely restricting intake, binge eating, purging, or avoiding certain foods or food textures)?',
				rules: [
					{
						target: 3.001,
						expression: 'global.eatingdisturbance || global.aberranteating'
					},
					{
						diagnosis: true,
						expression: '!global.eatingdisturbance && !global.aberranteating',
						diagnosisname: 'None',
						target: 50	// to last page for final notes
//						endifdiagnosis: true,
//						target: 'finish'
					}
				]
			},
//	****************************************************************************
//	Is the disturbance clinically significant?
//	****************************************************************************
			{
				id:3.001,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'Typical Day',
				interviewprobe: [
					'Is the problem with your eating getting in the way of ',
					'your day-to-day functioning? For example, at work, at ',
					'school, or in your relationships?<br>',
					'Is the problem interfering with your health?',
					'Is it very distressing or upsetting to you?',
					'<p> ',
					'<i>As some individuals have difficulty acknowledging ',
					'the problems resulting from their eating disorder,  ',
					'the clinician should use all available information, ',
					'including from ancillary sources such as family members ',
					'and his or her own observations, in making this judgment.</i>'
				].join("<br>"),
				symptom: [
							'Is the eating problem clinically significant? ',
							'Does it impair functioning and/or is it significantly ',
							'distressing to the individual?',
							'<br/><br/>',
				].join(''),
				rules: [
					{
						target: 3.01,
						expression: 'global.impairmentdistress'
					},
					{
						diagnosis: true,
						expression: '!global.impairmentdistress',
						diagnosisname: 'None',
						target: 50		// to last page
//						endifdiagnosis: true,
//						target: 'finish'
					}
				]
			},

//	****************************************************************************
//	Calculation of BMI, and assessment of current weight status.
//	****************************************************************************
			{	id: 3.01,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'BMI',
				interviewprobe: [
								'BMI Calculation <br/><br/>',
								'What are your current height and weight?',
								'<br/>',
								'<i>Measure if possible.</i>',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Weight in lbs: <span></td>',
								'<td><input type="text" size=2 id="saveWeight" name="BMI:Weight" onChange="calcBMI(\'saveWeight\',\'saveHeight\',\'saveBmi\')"></input></td>',
								'</tr><tr>',
								'<td><span>Height in inches: <span></td>',
								'<td><input type="text" size=2 id="saveHeight" name="BMI:Height" onChange="calcBMI(\'saveWeight\',\'saveHeight\',\'saveBmi\')"></input></td>',
								'</tr><tr>',
								'<td><span>BMI (kg/m<sup>2</sup>)</span></td>',
								'<td><input type="text" size=2 disabled="true" name="BMI:BMI" id="saveBmi"></input></td>',
								'</tr>',
								'</table>'
							].join('')

				,
				symptom: [
							"BMI range (adults):",
								"",
								"•	Underweight ≤ 18.5",
								"•	Normal weight = 18.5–24.9",
								"•	Overweight = 25–29.9",
								"•	Obesity ≥ 30 ",
								""
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
// Next question deals with RECENT low weight
//	****************************************************************************
			{
				id:4.06,
				initial: false,
				instrument_id: 1,
				sectionlabel: 'Introduction',
				shortname: 'recent low weight',
				interviewprobe: [
						'What was your lowest weight in the last 3 months? <i>Enter below.</i>',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span>Weight in lbs: <span></td>',
								'<td><input type="text" size=2 id="saveRecentWeight" name="BMI:RecentWeight" onChange="calcBMI(\'saveRecentWeight\',\'saveHeight\',\'saveRecentLowBMI\')"></input></td>',
								'</tr><tr>',
								'<td><span>Height in inches: <span></td>',
								'<td><input type="text" size=2 id="saveHeight" name="BMI:RecentHeight" onChange="calcBMI(\'saveRecentWeight\',\'saveHeight\',\'saveRecentLowBMI\')"></input></td>',
								'</tr><tr>',
								'<td><span>Lowest BMI (kg/m<sup>2</sup>): </span></td>',
								'<td><input type="text" size=2 disabled="true" name="BMI:RecentLowBMI" id="saveRecentLowBMI"></input></td>',
								'</tr>',
								'</table>'
					].join(''),
				symptom: [
					'In the last 3 months, was individual at a significantly low body weight (i.e., individual’s weight was significantly less than that of otherwise comparable normal individuals)?',
					' ',
					'For adults, a BMI of 18.5 kg/m<sup>2</sup> has been employed by the CDC as the lower limit of normal body weight.',
				].join("<br>"),
				rules: [
					{
						target: 5.1,	// need to assess other sx of AN
						expression: 'global.recentlowweight'
					},
					{
						target: 7.01,	// not low now or recently: not AN
						expression: '!global.recentlowweight'
					}

				]
			},
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
						'Are you afraid of gaining weight?',
						'',
						'If No: Are you worried that if you start to gain weight, you will continue to gain weight and will become fat?'
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
					'<i>Once any of the interfering behaviors below is endorsed, press YES and proceed.</i>',
					'',
					'Do you try to cut back on calories or amounts or types of food? What do you try to do?',
					'',
					'Do you exercise? What do you do and how often?',
					'',
					'Do you vomit or use any types of pills (such as diet pills, diuretics, or laxatives)?',
					'',
					'Do you do anything else that might make it hard for you to gain or maintain weight?',
					'',
				].join("<br>"),
				symptom:[
					'Are persistent behaviors (e.g., dietary restriction, excessive exercise, purging, fasting) interfering with weight gain?',
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
//	Assess body image disturbance and concern about being low in weight.
//	At end of this section, assess criteria for AN.
//	****************************************************************************
			{
				id:6.1,
				initial:false,
				instrument_id: 1,
				sectionlabel: 'Anorexia Nervosa',
				shortname: 'body image distortion',
				interviewprobe:[
					'In terms of your body weight and shape, how do you think you look? Does what you see/feel/experience differ from how you think others might perceive you?',
					'',
					'If unable to describe distortion of body image: Have you recently thought that you are fat or that a part of your body is too big? Have you recently had a distorted view of your body? Can you describe it?'
				].join("<br>"),
				symptom:[
					'Is the individual’s body image distorted ',
					'(e.g., feeling fat despite being at a low weight)?'
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
					'Does your body shape or your weight impact how you feel about yourself?',
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
					'Do you think that your current or recent low weight presents a significant problem for you and your overall health? Why or why not?',
					'',
					'If Yes: What efforts have you made in the past 3 months to deal with this problem? Have your feelings about the significance of the problem fluctuated? How so?'
				].join("<br>"),
				symptom:[
						'Does the individual recognize or acknowledge the seriousness of his or her low body weight?',
						'',
						'If individual initially acknowledges seriousness of the problem, are the efforts taken consistent with this recognition?'
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
					'In the past 3 months, were there times when you',
					'felt a sense of loss of control over eating?',
					'Or times when you felt that you could not stop eating?',
					'Or times when you felt unable to control what or',
					'how much you were eating?<br/>',
					'If No: Have there been times when you felt you could not prevent yourself from eating? '
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
					'Were there times in the last 3 months when you',
					'felt out of control and consumed what was clearly a large',
					'amount of food?<br/>',
					'Can you give me an example of what you typically ate?',
					'And the context?<br/>',
							[
								'If Yes: Enter typical binge below: ',
								'<br/><br/>',
								'<textarea id="optionalOBEitems" name="BingeEating:typical OBE items" type="text" size="20" width="20"></textarea>',
								'<br/>'
							].join('')
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
					'How many times in the last WEEK have you had an',
					'eating episode like what you have just described, when',
					'you ate a large amount of food and felt a lack of control?<br/>',
					'Is this consistent with how frequently this behavior has',
					'occurred for the past 3 months?<br/>',
					'If No: How was frequency of episodes different?<br/>',
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
					'How many times in the last MONTH have you had ',
					'an eating episode when you ate a large amount of food ',
					'and felt a lack of control?<br/>',
					'Is this consistent with how frequently this behavior has ',
					'occurred for the past 3 months? If No: How was the ',
					'frequency of episodes different?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Has objective binge eating occurred at least once a month, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0204,
						expression: 'global.OBE_1perMON'
					},
					{
						target: 7.0210,
						expression: '!global.OBE_1perMON'	// Ignore if <1/Mon; to SBE assessment
					}
				]
			},
// *****************************************************************************
// Next question assesses frequency if OBE's are >= 1/WEEK
// *****************************************************************************
			{
				id:7.0203,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
						[
							'Can you estimate how many times per WEEK, on average, ',
							'over the last 3 months, you have had episodes like ',
							'this?<br/>',
//							'<i>Enter average number of objective binge ',
//							'episodes per WEEK over the last 3 months.</i><br/>',
//							'<br/>',
//							'<i>If frequency is less than once a week, divide ',
//							'monthly frequency by 4. For example, ',
//							'2 binge episodes/month = 0.5 episodes/week.<i/>',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span># of OBEs per week: <span></td>',
								'<td><input id="saveOBEfreq" name="BingeEating:OBEs per week" type="text"></input></td>',
								'</tr>',
								'</table>'
					].join('')
				],
				symptom:[
					'Average number of OBEs per WEEK over the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0210,	// to SBE assessment
						expression: true
					}
				]
			},
// *****************************************************************************
// Next question assesses frequency if OBE's are >= 1/MONTH
// *****************************************************************************
			{
				id:7.0204,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
						[
							'Can you estimate how many times per MONTH, on average, ',
							'over the last 3 months, you have had episodes like ',
							'this?<br/>',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span># of OBEs per month: <span></td>',
								'<td><input id="saveOBEfreq" name="BingeEating:OBEs per month" type="text"></input></td>',
								'</tr>',
								'</table>'
					].join('')
				],
				symptom:[
					'Average number of OBEs per MONTH over the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0210,	// to SBE assessment
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
					'Were there times in the last 3 months when you felt out of control but consumed no more than what others would judge to be a small or normal amount of food?<br/>',
					'Can you give me an example of what you typically ate? And the context?<br/>',
							[
								'If Yes: enter typical binge below: ',
								'<br/><br/>',
								'<textarea id="optionalSBEitems" name="BingeEating:typical SBE items" type="text" size="20" width="20"></textarea>',
								'<br/>'
							].join('')
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
					'How many times in the last WEEK have you had an eating episode like what you have just described, when you ate a small or normal amount of food and felt a lack of control?<br/>',
					'Is this consistent with how frequently this behavior has occurred for the past 3 months?',
					' ',
					'If No: How was frequency of episodes different?',
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
					'How many times in the last MONTH have you had an eating episode when you ate a small or normal amount of food but felt a lack of control?',
					'<br/>',
					'Is this consistent with how frequently this behavior has occurred for the past 3 months? If No: How was frequency of episodes different?',
					'<br/>',
				].join("<br/>"),
				symptom:[
					'Has subjective binge eating occurred at least once a month, on average, for the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.0214,
						expression: 'global.sbe_frequency_months'
					},
					{
						target: 7.05,
						expression: '!global.sbe_frequency_months'
					}
				]
			},
// *****************************************************************************
// Next question assesses frequency if SBE's are >= 1/WEEK
// *****************************************************************************
			{
				id:7.0213,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
						[
							'Can you estimate how many times per WEEK, on average, ',
							'over the last 3 months, you have had episodes like ',
							'this?<br/>',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span># of SBEs per week: <span></td>',
								'<td><input id="saveSBEfreq" name="BingeEating:SBEs per week" type="text"></input></td>',
								'</tr>',
								'</table>'
					].join('')
				],
				symptom:[
					'Average number of SBEs per WEEK over the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.05,	// to purging assessment
						expression: true
					}
				]
			},
// *****************************************************************************
// Next question assesses frequency if OBE's are >= 1/MONTH
// *****************************************************************************
			{
				id:7.0214,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
						[
							'Can you estimate how many times per MONTH, on average, ',
							'over the last 3 months, you have had episodes like ',
							'this?<br/>',
								'<br/><br/>',
								'<table border=1 spacing=1 padding=2>',
								'<tr>',
								'<td><span># of SBEs per month: <span></td>',
								'<td><input id="saveSBEfreq" name="BingeEating:SBEs per month" type="text"></input></td>',
								'</tr>',
								'</table>'
					].join('')
				],
				symptom:[
					'Average number of SBEs per MONTH over the last 3 months?'
				].join("<br/>"),
				rules:[
					{
						target: 7.05,	// to purging assessment
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
						'Do you make yourself vomit, or overuse (misuse) laxatives, diuretics or other medications?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Does the individual use inappropriate (purging) behaviors?<br/>',
					'<i>Indicators of misuse include taking laxatives, diuretics, or other medications (e.g., diet pills) for weight control without a prescription, using more pills than suggested, or at a higher frequency.<i/>'
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
						'In the last WEEK, how many times have you engaged in this type of behavior?<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Does  the individual engage in inappropriate (purging) behaviors, on average, at least once a week over the last 3 months?',
					'<br/>',
				].join("<br/>"),
				rules:[
					{
						target: 7.0505,						// document frequency per WEEK
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
						'In the last MONTH, how many times have you engaged in this type of behavior?<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
				].join("<br/>"),
				symptom:[
					'Has  the individual engaged in inappropriate (purging) behaviors, on average, at least once a month over the last 3 months?',
					'<br/>',
				].join("<br/>"),
				rules:[
					{
						target: 7.0506,						// document frequency per MONTH
						expression: 'global.purging1xMON'
					},
					{
						target: 7.06,
						expression: '!global.purging1xMON'	// if not at least 1x/month, ignore; go to exercise
					}
				]
			},
//	****************************************************************************
//	Next question assesses frequency of purging if >= 1/WEEK
//	****************************************************************************
			{
				id:7.0505,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'Can you estimate how many times per WEEK over the last 3 months, on average, you have made yourself vomit, or misused laxatives, diuretics or other medications?<br/>',
//						'<i>If frequency is less than once a week, divide monthly frequency by 4. For example, 2 episodes/month = 0.5 episodes/week.</i>',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td colspan="2">Average weekly frequency over past 3 months:<br/></td></tr>',
						'<tr><td>Vomiting:</td> <td><input id="saveVomitFrequency" name="Vomiting:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Laxatives:</td> <td><input id="saveLaxativesFrequency" name="Laxatives:Average_number_per_week" size="3"></td></tr>',
						'<tr><td>Diuretics:</td> <td><input id="saveDiureticsFrequency" name="Diuretics:Average_number_per_week" size="3"></td></tr>',
						'<tr>',
						'<td>If other method used, describe below and enter frequency per week</td><td>&nbsp;</td>',
						'<tr>',
						'<td><input id="optionalOtherMethodName" name="OtherMethod:Name" size="35" placeholder="Description"></input></td>',
						'<td><input id="optionalOtherMethodFrequency" name="OtherMethod:Average_number_per_week" size="3"></input></td>',
						'</tr>',
						'</table>',
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Average number of episodes per WEEK over last 3 months. Has inappropriate behavior occurred at least once a week, on average, for the last 3 months?<br/>',
				].join("<br/>"),
				rules:[
					{
						target: 7.06,	// to exercise
						expression: true
					}
				]
			},
//	****************************************************************************
//	Next question assesses frequency of purging if >= 1/MONTH
//	****************************************************************************
			{
				id:7.0506,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'Can you estimate how many times per MONTH over the last 3 months, on average, you have made yourself vomit, or misused laxatives, diuretics or other medications?<br/>',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td colspan="2">Average monthly frequency over past 3 months:<br/></td></tr>',
						'<tr><td>Vomiting:</td> <td><input id="saveVomitFrequency" name="Vomiting:Average_number_per_month" size="3"></td></tr>',
						'<tr><td>Laxatives:</td> <td><input id="saveLaxativesFrequency" name="Laxatives:Average_number_per_month" size="3"></td></tr>',
						'<tr><td>Diuretics:</td> <td><input id="saveDiureticsFrequency" name="Diuretics:Average_number_per_month" size="3"></td></tr>',
						'<tr>',
						'<td>If other method used, describe below and enter frequency per week</td><td>&nbsp;</td>',
						'<tr>',
						'<td><input id="optionalOtherMethodName" name="OtherMethod:Name" size="35" placeholder="Description"></input></td>',
						'<td><input id="optionalOtherMethodFrequency" name="OtherMethod:Average_number_per_month" size="3"></input></td>',
						'</tr>',
						'</table>',
					].join(" ")
				].join("<br/>"),
				symptom:[
					'Average number of episodes per MONTH over last 3 months. Has inappropriate behavior occurred at least once a week, on average, for the last 3 months?<br/>',
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
						'Do you exercise? What type of exercise do you do and for how long?<br/>',
					].join("<br/>"),
					[
						'<table>',
						'<tr><td>Type of Exercise: </td> <td><input id="optionalExerciseType" name="Exercise:Type"></td></tr>',
						'<tr><td>Average # minutes per episode: </td> <td><input id="optionalExerciseFrequency" name="Exercise:Average_number_mins_per_episode" size="3"></td></tr>',
						'</table>'
					].join(" "),
					[
						'Does the amount of exercise you do interfere with your health',
						'or get in the way of meeting your daily responsibilities?',
						'<br/>'
					].join(" "),
				].join("<br/>"),
				symptom:[
					'Does the individual use exercise inappropriately (i.e., excessively)?',
					' ',
					'<i>Indicators of excessive exercise include exercising despite illness or injury, exercising to an extent that it interferes with daily responsibilities (e.g., being late for work or school), or feeling highly distressed when unable to exercise.</i>'
				].join("<br/>"),
				rules:[
					{
						target: 7.0601,	//  assess frequency of exercise
						expression: 'global.in_exercise'
					},
					{
						target: 9.1,	// not purging, not exercising, and not AN, but OBE>1x/wk-->assess for BED
						expression: '!global.purging && !global.in_exercise && !global.an && global.OBE_1perWK'
					},
					{
						target: 11,	// not purging, not exercising, and not AN and not OBE>1x/wk-->assess for ARFID
						expression: '!global.purging && !global.in_exercise && !global.an && !global.OBE_1perWK'
					},
					{
						target: 7.07,	// not exercising, but purging; determine reasons why
						expression: 'global.purging && !global.in_exercise'
					},
					// next branches needed to deal with NO purging, +AN
					// should never get to these if purging, but included !purging below for clarity
					{
						diagnosis: true,
						expression: 'global.an && !global.purging && !global.OBE_1perMON && !global.OBE_1perWK',
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 19
					},
					{
						diagnosis: true,
						expression: 'global.an && !global.purging && (global.OBE_1perMON || global.OBE_1perWK)',
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 19
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
						'In the last WEEK, how many times have you engaged in this type of exercise?<br/>',
						'Is this typical of the last 3 months?',
						' ',
//						'If No: How was frequency of exercise different?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Has the individual exercised inappropriately (i.e., exercised excessively), on average, at least once a week over the last 3 months?'
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
						'In the last MONTH, how many times have you engaged in this type of exercise?<br/>',
						'Is this typical of the last 3 months?',
						'<br/>'
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Has the individual exercised inappropriately (i.e., exercised excessively), on average, at least once a month over the last 3 months?',
					'<br/>',
				].join("<br/>"),
				rules:[
					{
						target: 7.0606,						// document frequency
						expression: 'global.in_exercise1xMON'
					},
					{
						target: 7.07,						// reasons why
						expression: '!global.in_exercise1xMON'
					}
				]
			},
//	****************************************************************************
//	Next question assesses frequency of exercise if >= 1/WEEK
//	****************************************************************************
			{
				id:7.0605,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'<i>Enter average number of episodes of excessive exercise per WEEK over the last 3 months.</i><br/>',
						[
							'<table>',
							'<tr><td>Average episodes of excessive exercise per week: </td> <td><input id="saveExerciseFrequency" name="Exercise:Average_number_episodes_per_week" size="3"></td></tr>',
							'</table>'
						].join(" "),
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Enter weekly frequency of excessive exercise.<br/>',
					].join("<br/>"),
				rules:[
					{
						target: 7.07,	// reasons why
						expression: 'true'
					}
				]
			},
//	****************************************************************************
//	Next question assesses frequency of exercise if >= 1/MONTH
//	****************************************************************************
			{
				id:7.0606,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating & Compensatory Behaviors',
				shortname:'none',
				interviewprobe:[
					[
						'<i>Enter average number of episodes of excessive exercise per MONTH over the last 3 months.</i><br/>',
						[
							'<table>',
							'<tr><td>Average episodes of excessive exercise per month: </td> <td><input id="saveExerciseFrequency" name="Exercise:Average_number_episodes_per_month" size="3"></td></tr>',
							'</table>'
						].join(" "),
					].join("<br/>"),
				].join("<br/>"),
				symptom:[
					'Enter monthly frequency of excessive exercise.<br/>',
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
					'Do you engage in purging or exercise behaviors to compensate for binge eating episodes?'
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
					'Do you engage in purging or exercise behaviors to help you control your weight or prevent weight gain?'
				].join("<br/>"),
				symptom:[
					'Is the motivation for inappropriate behaviors to control weight or prevent weight gain?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						expression: [
							'(global.an) && ',
							'( !(global.OBE_1perMON) && ',
							'!(global.purging1xMON && (global.in_compensate || global.in_weightloss)) )'
						].join(''),
						trigger: 'an-rs',
						diagnosisname: 'Restricting Subtype',
						target: 19
					},
					{
						diagnosis: true,
						expression: [
							'(global.an) && ',
							'( (global.OBE_1perMON) || ',
							'(global.purging1xMON && (global.in_compensate || global.in_weightloss)) )'
						].join(''),
						trigger: 'an-bps',
						diagnosisname: 'Binge-Purge Subtype',
						target: 19
					},
					{	// Assess whether criteria for BN MIGHT be met
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(global.purging || global.in_exercise) && ',
							'(global.purging1xWK || global.in_exercise1xWK) && ',
							'(global.in_compensate || global.in_weightloss)'
						].join(''),
						target: 8,
						trigger: 'bn'
					},
					{	//	Determine whether criteria for BED MIGHT be met
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(!global.purging && !global.in_exercise)'
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
						'In the past week, how many times have you [made yourself vomit, used laxatives, diuretics or other medications, or exercised] to influence your body shape or weight to compensate for binge eating episodes? [If denied in past week, ask about past month.]',
						'<br/>',
						'Is this consistent with how frequently the behaviors have occurred for the past 3 months? If No: How was frequency of episodes different?',
						'<br/>'
					].join("<br/>"),
					[
						'<table>',
						'<tr><td colspan="2">Average weekly frequency over past 3 months</td></tr>',
						'<tr><td>Vomiting:</td><td><input id="saveVomitFrequency" name="Vomiting:Average_number_per_week" size="3"></td></tr>',
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
						target: 19
					},
					{
						diagnosis: true,
						expression: '(global.an) && (global.OBE_1perMON || global.in_frequency_months)',
						trigger: 'an-bs',
						diagnosisname: 'Binge-Purge Subtype',
						target: 19
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
					'[Use information already obtained, but ask additional questions to assess frequency as needed.]'
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
						target: 19
					},
					{
						diagnosis: true,
						expression: '(global.an) && (global.OBE_1perMON || global.in_frequency_months)',
						trigger: 'an-bs',
						diagnosisname: 'Binge-Purge Subtype',
						target: 19
					},
					{
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(global.in_behavior || global.in_excercise) && ',
							'(global.purging1xWK || global.in_exercise1xWK) && ',
							'(global.in_compensate)'
						].join(''),
						target: 8,
						trigger: 'bn'
					},
					{
						expression: [
							'(!global.an && global.lacks_control && global.OBE_1perWK) && ',
							'(!global.in_behavior && !global.in_exercise)'
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
						trigger: 'arfid'	// The arfid trigger here = !AN + !LOC + OBE>1/mon
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
					'Does your body shape or your weight impact how you feel about yourself?',
					'',
					'For example, if you were to have a day when you did not like the number on the scale, or the way your clothes fit, or how your body shape felt in general, how much would that impact you? Would it make you feel very badly about yourself? Please tell me a little about this.'
				].join("<br/>"),
				symptom:[
					'Does body shape or weight exert undue influence on sense of self-worth or on self-evaluation?'
				].join("<br/>"),
				rules:[
					{
							target: 19,
							diagnosis: true,
							diagnosisname: 'Bulimia Nervosa',
							expression: 'global.bodyweight_selfworth'
					},
					{
							target: 11,		// to assessment of ARFID
							expression: '!global.bodyweight_selfworth',
//							trigger:'pica'	// 6/26: I commented this out; I don't think we should set a trigger here
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
					'Keeping in mind the type of episode you just described, when you ate a large amount of food and feel that loss of control…'
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

//	****************************************************************************
//	Assessment of binge eating disoder
//	****************************************************************************
			{
				id:9.1,
				initial:false,
				instrument_id:1,
				sectionlabel:'Binge Eating Disorder',
				shortname:'none',
				interviewprobe:[
					'Keeping in mind the type of episode you described just a moment ago, when you ate a large amount of food and felt that loss of control…',
					'<i>Refer to example of OBE provided.</i>',
					'<br/>',
					'9a. …did you eat faster than usual?'
				].join("<br/>"),
				symptom:[
					'During OBEs, eating more rapidly than usual?'
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
					' … did you eat until you felt uncomfortably full?'
				].join("<br/>"),
				symptom:[
					'During OBEs, eating until uncomfortably full?'
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
					' … did you eat large amounts of food when you were not hungry?'
				].join("<br/>"),
				symptom:[
					'During OBEs, eating in the absence of hunger?'
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
					' … did you eat alone because you felt embarrassed by how much you were eating? Or because you did not want to be seen eating in this way?'
				].join("<br/>"),
				symptom:[
					'During OBEs, avoiding eating near others due to shame or embarrassment?'
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
					' … did you feel sad, down, guilty, or disgusted afterwards?'
				].join("<br/>"),
				symptom:[
					'Negative affect associated with OBEs?'
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
					'How upset have you been about these episodes?'
				].join("<br/>"),
				symptom:[
					'Marked distress regarding OBEs?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						expression: 'global.binge_distress',
						trigger: 'bed',	// Sept 6: changed from bn. Hope that is correct!
						diagnosisname: 'Binge Eating Disorder',
						target: 11	// Goes to ARFID; seems strange, but that's how DSM-5 is currently. BED and ARFID can co-exist.
					},
					{
						target: 11,
						expression: '! global.binge_distress'
					}
				]
			},
//	****************************************************************************
//	Assessment of ARFID
//	****************************************************************************
			{
				id:11,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'In the last 3 months, have you had a serious nutritional problem because you severely restricted or avoided eating some foods?'
				].join("<br/>"),
				symptom:[
					'Has severe food restriction or avoidance resulted in serious nutritional problems?',
					' ',
//					'<b>Notes:</b>',
					'<i>PLEASE NOTE: Sufficient information may already be available to answer this without additional questions.</i>',
					' ',
					'<i>Restriction that occurs only in the context of a binge eating episode does not satisfy this criterion.</i>'
				].join("<br/>"),
				rules:[
					{
						target: 11.1,	// might have ARFID; assess further
						expression: 'global.avoidant_nutritional_problems'
					},
					{
						target: 15,	// to Rumination Disorder (not BED and cannot be ARFID)
						expression: '(!global.avoidant_nutritional_problems && !global.bed)'
					},
					{
						target: 19,	// to Pica--might have BED and Pica
						expression: '(!global.avoidant_nutritional_problems && global.bed)'
					}
				]
			},
			{
				id:11.1,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Have you had difficulty consistently eating enough food and as a result you have lost a significant amount of weight? How much weight?'
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
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Have nutritional deficiencies resulting from poor eating led to medical problems, such as anemia?'
				].join("<br/>"),
				symptom:[
					'Has the individual experienced medical problems resulting from the nutritional deficiencies?'
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
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Have you needed nutritional supplements to maintain your weight or general health?'
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
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Can you describe any eating restrictions you have? Has trouble eating enough or these particular eating restrictions made it difficult for you socially? How so?',
					'<br/>',
					'If unclear: Do you have problems eating out at restaurants with others? Eating with family? ',
					'<br/>',
					'If No: Have you avoided any social situations because of difficulty with eating?',
					'<br/>',
					'If No: Has significant weight loss or restrictions on eating impacted your ability to function well at work or in school?'
				].join("<br/>"),
				symptom:[
					'Have eating restrictions (e.g., avoidance of foods of particular colors or textures) resulted in marked interference with psychosocial functioning?'
				].join("<br/>"),
				rules:[
					{
						target: 12,
						expression: '(global.avoidant_weightloss || global.avoidant_nutri_def || global.avoidant_nutri_suppliment || global.avoidant_psychosocial_interference)'
					},
					{
						target: 15,	// assess Rumination Disorder
						expression: ' !(global.avoidant_weightloss || global.avoidant_nutri_def || global.avoidant_nutri_suppliment || global.avoidant_psychosocial_interference)'
					}
				]
			},
			{
				id:12,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Are these problems because you have not been able to obtain or pay for enough food?',
					'<br/>',
					'If No: Are they related to a particular cultural or religious practice? How do your restrictions compare to others within your identified group?'
				].join("<br/>"),
				symptom:[
					'Is there an alternate explanation to account for eating or feeding disturbance (e.g., lack of resources, culturally sanctioned practice, general medical condition)?'
				].join("<br/>"),
				rules:[
					{
						target: 15,
						expression: 'global.avoidant_alt_explanation'
					},
					{
						target: 13,	//to Rumination Disorder
						expression: '!global.avoidant_alt_explanation'
					},
				]
			},
			{
				id:13,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Have you been diagnosed with a medical condition or an emotional problem that may be associated with your difficulty eating enough? Or, are the dietary restrictions due to a medical condition or prescribed by a clinician?'
				].join("<br/>"),
				symptom:[
					'Is there an associated medical condition or mental disorder (e.g., Crohn’s disease, mental retardation, pervasive developmental disorder) that might better account for eating restrictions or weight loss?'
				].join("<br/>"),
				rules:[
					{
						target: 15, // to Rumination Disorder
						expression: 'global.avoidant_alt_condition'
					},
					{
						target: 14,
						expression: '!global.avoidant_alt_condition'
					}
				]
			},
			{
				id:14,
				initial:false,
				instrument_id:1,
				sectionlabel:'Avoidant/Restrictive Food Intake Disorder (ARFID)',
				shortname:'none',
				interviewprobe:[
					'Have you been to see a specialist (e.g., nutritionist, gastroenterologist) for help with this problem?',
					'<br/>',
					'If No: How significantly does this problem with eating impact you? In what ways?'
				].join("<br/>"),
				symptom:[
					'Has the disturbance in eating behavior been sufficiently severe to warrant independent clinical attention?'
				].join("<br/>"),
				rules:[
					{
						target: 19,
						diagnosis: true,
						diagnosisname: 'Avoidant/Restrictive Food Intake Disorder (ARFID)',
						trigger: 'arfid',
						expression: '(global.avoidant_independent_clinical) && !(global.distorted_body_image || global.distorted_bi_influences || global.bodyweight_selfworth) '
					},
					{
						target: 15,
						diagnosis: true,
						diagnosisname: 'Avoidant/Restrictive Food Intake Disorder (ARFID)',
						trigger: 'arfid',
						expression: '!global.avoidant_independent_clinical'
					},
					{
						target: 19,
						expression: 'global.avoidant_independent_clinical'
					}

				]
			},
//	****************************************************************************
//	Assessment of Rumination Disorder
//	****************************************************************************
			{
				id:15,
				initial:false,
				instrument_id:1,
				sectionlabel:'Rumination Disorder',
				shortname:'none',
				interviewprobe:[
					'In the past month, have you re-chewed, re-swallowed, or spit out your food? How often has this happened? '
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
						target: 19,
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
					'Have you been diagnosed with a medical condition',
					'(e.g., gastrointestinal problem such as esophageal reflux)',
					'or an emotional problem that may be associated with this',
					'eating behavior (re-chewing, etc.)?<br/>',
					'<i>NOTE: Esophageal reflux is a common problem. The',
					' critical question is whether the reflux is sufficient',
					' to explain the symptoms of rumination.'
				].join("<br/>"),
				symptom:[
					'Is an associated medical condition or mental disorder present that might better account for the repeated regurgitation of food?'
				].join("<br/>"),
				rules:[
					{
						target: 19,
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
					'Have you been to see a specialist (e.g., nutritionist,',
					'psychotherapist) specifically for help with this',
					'regurgitation problem?<br/>',
					'If No: How severely does the problem affect you? In what ways?'
				].join("<br/>"),
				symptom:[
					'Is the disturbance in eating behavior sufficiently severe to warrant clinical attention in addition to any required for a related problem?'
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
//	****************************************************************************
//	Assessment of Pica
//	****************************************************************************
//	Jan 13, 2015: changed target above from 19 to 20. Therefore, this page should never be reached.
//	Page 18 was originally the default entryway to Pica. 
//	But, since this version is only for adults, questions seemed unnecessary.
//	So, it is no longer a target, and this page could be eliminated.
			{
				id:18,
				initial:false,
				instrument_id:1,
				sectionlabel:'PICA',
				shortname:'none',
				interviewprobe:[
					'Do you regularly eat items that others do not consider',
					'food?<br/>',
					'If Yes: Can you give some examples?'
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
						target: 20,
						expression: 'global.nonfood_age_inappropriate'
					},
					{
						expression: '!global.nonfood_age_inappropriate',
						endifdiagnosis: true,
						target: 30	// to section on other ED
					}
				]
			},
//	Page 19 is now the entryway into assessment of Pica
			{
				id:19,
				initial:false,
				instrument_id:1,
				sectionlabel:'PICA',
				shortname:'none',
				interviewprobe:[
					'Have you eaten any non-food materials (e.g., dirt,',
					'paint) in the last month? What have you eaten? How often?'
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
						expression: '!global.nonfood_persistent',
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
					'Is the eating behavior you’ve described related to a particular cultural or religious practice? How is it  similar or different compared to others within your identified group?'
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
					'Have you been to see a specialist (e.g., nutritionist,',
					'psychotherapist) specifically for help with this eating',
					'problem?<br/>',
					'If No: How severely does the problem affect you? In what ways?'
				].join("<br/>"),
				symptom:[
					'Is the disturbance in eating behavior sufficiently severe to warrant independent clinical attention?'
				].join("<br/>"),
				rules:[
					{
						diagnosis: true,
						diagnosisname: 'PICA',
						expression: 'global.nonfood_needs_clinical',
						target: 50
					},
					{
						target: 30,	// to section on other ED
						expression: '!global.nonfood_needs_clinical',
						endifdiagnosis: true
					}

				]
			},

//
//	****************************************************************************
//  Assessment of other eating disorders
//  Section starts with id = 30, to keep clearly separate from what has preceded.
//	****************************************************************************//
			{
				id:30,
				initial:false,
				instrument_id:1,
				sectionlabel:'Other Feeding and Eating Disorders',
				shortname:'none',
				interviewprobe:[
					'In the section Other Specified Feeding or Eating',
					'Disorder, DSM-5 provides very brief descriptions',
					'of several problems that should be assessed.<br/>',
					'<i>Before determining whether the problem may fit one of',
					'these descriptions, it may useful to inquire about the',
					'highest weight attained, weight loss, and eating at night.</i>',
					'<br/>',
					].join("<br/>"),
				symptom:[
					'The individual does not appear to meet the DSM-5 criteria for a formally defined eating disorder.',
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
				sectionlabel:'Other Feeding and Eating Disorders',
				shortname:'none',
				interviewprobe:[
					'<i> The conditions very briefly described below are other feeding and eating disorders noted in DSM-5, but not formally recognized.<br/>',
					'<b>Atypical Anorexia Nervosa:</b> meets all criteria for Anorexia Nervosa, but, despite significant weight loss, weight is within or above normal range.',
					'<b>Subthreshold Bulimia Nervosa:</b> meets all criteria for Bulimia Nervosa, but low in frequency or of limited duration.',
					'<b>Subthreshold Binge Eating Disorder:</b> meets all criteria for Binge Eating Disorder, but low in frequency or of limited duration.',
					'<b>Purging Disorder:</b> Recurrent purging to influence shape or weight, but no binge eating. ',
					'<b>Night Eating Syndrome:</b> Recurrent episodes of night eating (after falling asleep or after evening meal).',
					'<b>Other (unspecified) Eating Disorder</b></i>',
					'<br/>',
					].join("<br/>"),
				symptom:[
					'Brief descriptions are provided below. Proceed to the next page to indicate the most appropriate diagnosis. Choose the one that most closely matches the presenting problem.',
				].join("<br/>"),
				rules:[
				{
					target: 32,
					expression: true,
				}
				]
			},
			{
				id:32,
				initial:false,
				instrument_id:1,
				sectionlabel:'Other Feeding and Eating Disorders',
				shortname:'none',
				interviewprobe:[
					'The conditions below are other eating disorders noted in DSM-5, but not formally recognized. ',
					].join("<br/>"),
				symptom:[
					'Choose the disorder that most closely matches the presenting problem.',
				].join("<br/>"),
				rules:[
				{
					diagnosis: true,
					diagnosisname: 'Atypical Anorexia Nervosa',
					expression: 'global.atypicalAN',
					target: 50
//					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Subthreshold Bulimia Nervosa',
					expression: 'global.subthresholdBN',
					target: 50
//					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Subthreshold Binge Eating Disorder',
					expression: 'global.subthresholdBED',
					target: 50
//					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Purging Disorder',
					expression: 'global.purgingdisorder',
					target: 50
//					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Night Eating Syndrome',
					expression: 'global.NES',
					target: 50
//					endifdiagnosis: true
				},
				{
					diagnosis: true,
					diagnosisname: 'Other (unspecified) Eating Disorder',
					expression: 'global.otherED',
					target: 50
//					endifdiagnosis: true
				}

				]
			},
//	****************************************************************************
//  Final Page
//	****************************************************************************//
			{
				id:50,
				initial:false,
				instrument_id:1,
				sectionlabel:'Final Comments',
				shortname:'comments',
				interviewprobe:[
					'The interview is now complete.<br/> ',
					'You may press the Notes button at the top right if you',
					'wish to remark on any salient features of the particular',
					'case (e.g., if the individual is pre- or post-bariatric',
					'surgery) or interview process (e.g., if the individual ',
					'had difficulty with comprehension of items or recall of ',
					'symptoms).<br/>',
					'If the diagnosis chosen is one of the Other Specified ',
					'Feeding and Eating Disorders, you might clarify the ',
					'rationale for the diagnostic decision.<br/>',
					'If the diagnosis chosen is Unspecified Feeding or Eating ',
					'Disorder, a brief description might be given.',
					'<br/>',
					].join("<br/>"),
				symptom:[
					'Enter additional Notes if desired.',
				].join("<br/>"),
				rules:[
				{
					comment: true,
					expression: true
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
					'This condition may be assigned to an individual who exhibits ALL of the behavioral and cognitive disturbances characteristic of anorexia nervosa, but whose body weight is not below minimally normal. Such presentations have been described among individuals who have been obese and lost substantial weight, for example, after bariatric surgery, but whose weight remains within or above a normal range.',
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
					'The criteria for this condition are identical to those for bulimia nervosa, except that the frequency of binge eating and inappropriate compensatory behavior is less than once a week and/or the duration of the behavior is less than 3 months.'
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
					'The criteria for this condition are very similar to those for bulimia nervosa, except that the individual does not engage in the recurrent binge eating. Individuals with purging disorder consume an amount of food that is not objectively large, but engage in inappropriate behavior after eating.'
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
					'The criteria for this condition are identical to those for binge eating disorder, except that the frequency of binge eating is less than once a week and/or the duration of the behavior is less than 3 months.'
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
					'This condition may be assigned to an individual who exhibits a daily pattern of eating with significantly increased intake in the evening and/or nighttime. Eating episodes must not be better accounted for by existing social norms (e.g., college dorm) or occur solely in the context of disturbances in sleep necessitated by responsibilities (e.g., during night-shift work, nursing a baby).',
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

