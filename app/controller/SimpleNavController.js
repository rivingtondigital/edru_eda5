Ext.define('ceda.controller.SimpleNavController', {
	extend:'Ext.app.Controller',
	config: {
		assessment: true,
		savedvalues: {},
		backedvalues: {},
		questionstack: true,
		qview: true,
		refs: {
			view: 'view',
			bar: '#topbar',
			mainpanel: '#mainpanel',
			startbttn: 'idetail #start',
			answerbttn: 'qview #answerarea #aview',
			backbutton: '#topbar #backbutton',
			restartbutton: '#topbar #restartbutton'
		},
		control:{
			view:{
				initialize: 'initView'
			},
			mainpanel:{
				activate: 'showmain'
			},
			startbttn:{
				tap: 'startTest'
			},
			answerbttn:{
				itemtap: 'answerQuestion'
			},
			backbutton:{
				tap: 'backup'
			},
			restartbutton:{
				tap: 'restart'
			},

		}
	},
	restart: function(){
		location.reload();
	},
	showmain: function(){
		this.getBackbutton().hide();
	},
	backup: function(){
		this.questionstack.pop();
		var question = this.questionstack.pop();
		this.viewQuestion(question, true);
	},

	initView: function(){
		var istore = Ext.getStore('instrumentStore');
		var instrument = istore.findRecord('id', 1);
		var details = Ext.widget('idetail');
		this.assessment = Ext.create('ceda.model.Assessment', {triggers: {}});
		this.questionstack = [];
		this.savedvalues = {};
		this.backedvalues = {};
		this.qview = Ext.widget('qview');
		details.setRecord(instrument);
		this.getBar().setTitle(instrument.get("name"));
		this.getMainpanel().add(details);
	},

	startTest: function(one, two){
		var instrument = one.getRecord();
		var qstore = Ext.getStore('questionStore');
		var question = qstore.findRecord('initial', true);
		this.viewQuestion(question);
	},

	answerQuestion: function(list, index, item, record){
		/*
		mustsaves = Ext.query('input[id^="save"]');
		for (key in mustsaves){
			if(mustsaves[key].value == ""){
				alert("Inputs on this page must not be left blank");
				return;
			}
		}
		*/
		problems = this.captureCapturables();
		
		if(problems.invalids.length > 0){
			input = problems.invalids[0].value;
			message = input + ' is not a valid ' + problems.invalids[0].name.split(':')[2];
			alert(message);
			return;
		}
		if(problems.empties.length > 0){
			alert("Complete all inputs on this page.");
			return;
		}
		
		var global_triggers = this.assessment.get('triggers');
		var answer_triggers = record.get('triggers');

		for(var trig in answer_triggers){
			global_triggers[trig] = answer_triggers[trig];
		}
		this.assessment.set('triggers', global_triggers);
		var next = this.findNextQuestion(record);

		if(next == 'finish'){
			this.viewOutput();
		}
		else if(next !== undefined){
			this.viewQuestion(next);
		}
		else{
			alert('No rules matched. No next question.');
			//this.viewQuestion();
		}
	},

	viewOutput: function(){
		//this.captureCapturables();
		var oview = Ext.widget('oview');
		oview.setCollectedInfo(this.savedvalues);
		this.questionstack.push({});
		this.getMainpanel().animateActiveItem(oview, {type:'slide', direction: 'left'});
	},

	viewQuestion: function(question, back){
//		var debug = true;
		var debug = false;
		if(this.questionstack.length === 0){
			this.getBackbutton().hide();
		}
		else{
			this.getBackbutton().show();
		}
		this.questionstack.push(question);

		//var qview = Ext.widget('qview');
		this.getMainpanel().remove(this.qview);
		this.qview = Ext.widget('qview');
		this.qview.setRecord(question);
		var inputs = Ext.query('input[id^="save"]');
		for (var key in inputs){
			input = inputs[key];
			if (this.backedvalues.hasOwnProperty(input.id)){
				input.value = this.backedvalues[input.id];
			}
		}
		console.info(this.debug);
		if(debug){
			var triggers = this.assessment.get('triggers');
			this.qview.getComponent('debugarea').getComponent('debugview').setTriggers(triggers);
			this.qview.getComponent('debugarea').setHidden(false);


		}
		else{
			this.qview.getComponent('debugarea').setHidden(true);
		}

		if(back){
			this.getMainpanel().animateActiveItem(this.qview, {type: 'slide', direction: 'right'});
		}
		else{
			this.getMainpanel().animateActiveItem(this.qview, {type: 'slide', direction: 'left'});
		}
	},

	findNextQuestion: function(answer){
		var question = answer.getQuestion();
		var rules = question.get('rules');
		for(var index in rules){
			var rule = rules[index];
			var global = this.assessment.get('triggers');
			if( eval(rule.expression) ){
				if(rule.diagnosis){
					if(!this.savedvalues.hasOwnProperty('Diagnosis')){
						this.savedvalues['Diagnosis'] = {};
					}
					this.savedvalues['Diagnosis'][rule.diagnosisname] = " ";
					var global_triggers = this.assessment.get('triggers');
					global_triggers[rule.trigger] = true;
					alert("Critera for " + rule.diagnosisname + " met");
				}
				if(rule.endifdiagnosis){
					if(this.savedvalues.hasOwnProperty('Diagnosis')){
						return 'finish';
					}
				}
				var target = rule.target;
				var qstore = Ext.getStore('questionStore');
				return qstore.findRecord('id', target);
			}
		}
		return undefined;
	},

	captureCapturables: function(){
		var inputs = Ext.query('input[id^="save"]');
		var problems = {
			empties: [],
			invalids: []
		};
		
		for(var key in inputs){
			var input = inputs[key];
			if(input.value){
				this.backedvalues[input.id] = input.value;
				var section_name = input.name.split(':');
				if (! this.validateInput(input) ){
					problems.invalids.push(input);
				}

				var section = section_name[0];
				section = section.replace(/_/g, " ");
				var name = section_name[1];
				name = name.replace(/_/g, " ");
				var value = input.value;
				if(! this.savedvalues.hasOwnProperty(section)){
					this.savedvalues[section] = {};
				}
				this.savedvalues[section][name] = value;
			}
			else{
				problems.empties.push(input);
			}
		}
		var optionals = Ext.query('input[id^="optional"]');
		for(key in optionals){
			var input = optionals[key];
			if(input.value){
				this.backedvalues[input.id] = input.value;
				var section_name = input.name.split(':');
				var section = section_name[0];
				section = section.replace(/_/g, " ");
				var name = section_name[1];
				name = name.replace(/_/g, " ");
				var value = input.value;
				if(! this.savedvalues.hasOwnProperty(section)){
					this.savedvalues[section] = {};
				}
				this.savedvalues[section][name] = value;
			}
		}
		return problems;
	},
	validateInput: function(input){
		var value = input.value;
		var tType = input.name.split(':')[2];
		if(tType == undefined){
			return true;
		}
		if(tType == 'date'){
			return /^\d{1,2}[\/-]\d{1,2}[\/-](\d{2}){1,2}$/.test(value);	
		}
		if(tType == 'number'){
			return /^\d+$/.test(value);
		}
		return true;
	}
});
