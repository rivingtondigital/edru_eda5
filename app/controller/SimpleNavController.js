Ext.define('ceda.controller.SimpleNavController', {
	extend:'Ext.app.Controller',
	config: {
		assessment: true,
		instrument: true,
		savedvalues: {},
		backedvalues: {},
		user: false,
		password: false,
		saved_session: true,
		questionstack: true,
		post_login_callback: false,
		qview: true,
		refs: {
			view: 'view',
			bar: '#topbar',
			mainpanel: '#mainpanel',
			start_bttn: 'idetail #start',
			answer_bttn: 'qview #answerarea #aview',
			back_bttn: '#topbar #backbutton',
			restart_bttn: '#topbar #restartbutton',
			save_bttn: '#topbar #sbutton',
			login_user: 'loginview #txt_login_username',
			login_pass: 'loginview #pass_login_pass',
			login_bttn: 'loginview #bttn_login',
			goto_register_bttn: 'loginview #bttn_goto_register',
			login_output: 'loginview #login_output',
			reg_user: 'registerview #txt_reg_username',
			reg_pass: 'registerview #pass_reg_pass',
			reg_confirm: 'registerview #pass_reg_confirm',
			register_bttn: 'registerview #bttn_register',
			reg_output: 'registerview #reg_output',
			goto_previous_bttn: 'idetail #previous',
			saved_list: 'savedview'
		},
		control:{
			view:{
				initialize: 'initView'
			},
			mainpanel:{
				activate: 'showmain'
			},
			start_bttn:{
				tap: 'startTest'
			},
			answer_bttn:{
				itemtap: 'answerQuestion'
			},
			back_bttn:{
				tap: 'backup'
			},
			restart_bttn:{
				tap: 'restart'
			},
			save_bttn:{
				tap: 'save_session'
			},
			login_bttn:{
				tap: 'check_user'
			},
			goto_register_bttn:{
				tap: 'register_page'
			},
			register_bttn:{
				tap: 'register_user'
			},
			goto_previous_bttn:{
				tap: 'view_saved'
			},
			saved_list:{
				itemtap: 'restore_session',
				'tap': 'restore_session'
			}
		}
	},
	restore_session: function(button){
		if (button.hasOwnProperty('sess_id')){
			var astore = Ext.getStore('assessmentStore');

			if (button['action'] == 'delete'){
				var del = astore.findRecord('id', button['sess_id']);
				del.erase();
				del.destroy();
				this.getSaved_list().refresh();
			}
			else{
				this.saved_session = astore.findRecord('id', button['sess_id']);
				var dec = JSON.parse(sjcl.decrypt(this.password, this.saved_session.data.data));

				this.assessment = Ext.create('ceda.model.Assessment', {
					triggers: dec.data.triggers,
					savedvalues: dec.data.savedvalues,
					backedvalues: dec.data.backedvalues,
					questionstack: dec.data.questionstack
				});

				this.savedvalues = this.assessment.get('savedvalues');
				this.backedvalues = this.assessment.get('backedvalues');
				this.questionstack = this.assessment.get('questionstack');

				this.questionstack.pop(); //get 'save' off of stack
				var pg = this.questionstack.pop();
				if (pg == 'output'){
					this.viewOutput();
				}
				else{
					qstore = Ext.getStore('questionStore');
					var q = qstore.findRecord('id', pg);
					if (q != null){
						this.viewQuestion(q, false);
					}
					else{
						q = qstore.findRecord('initial', true);
						this.viewQuestion(q, false);
					}
				}

			}
		}
	},

	view_saved: function(){
		if (this.password == null){
			this.post_login_callback = this.view_saved;
			this.login();
			return false;
		}
		var saved = Ext.widget('savedview');
		this.getMainpanel().animateActiveItem(saved, {type:'slide', direction: 'left'});
		var sstore = Ext.getStore('assessmentStore');
		sstore.load();
		this.getSaved_list().setStore(sstore);
		this.getRestart_bttn().show();
	},

	check_user: function(){
		var user = this.getLogin_user().getValue();
		var pass = this.getLogin_pass().getValue();
		var hash = sjcl.hash.sha256.hash(pass);
		hash = sjcl.codec.hex.fromBits(hash);
		var users = Ext.getStore('userStore');
		users.load();
		var rec = users.findRecord('username', user);
		if (rec == null){
			this.getLogin_output().setHtml('<span class="msg err">That user name does not exist.</span>');
			return false;
		}
		if (rec.get('password') != hash ){
			this.getLogin_output().setHtml('<span class="msg err">password is incorrect.</span>');
			return false;
		}
		this.password = pass;
		this.user = user;
		if (this.post_login_callback){
			this.post_login_callback();
		}
		else{
			this.backup();
		}
	},

	register_page:function(){
		var rview = Ext.widget('registerview');
		this.getMainpanel().animateActiveItem(rview, {type:'slide', direction: 'left'});
	},

	register_user:function(){
		this.getSave_bttn().hide();
		this.getBack_bttn().show();
		var user = this.getReg_user().getValue();
		var pass = this.getReg_pass().getValue();
		var confirm = this.getReg_confirm().getValue();

		if (/^\s*$/.test(user)){
			this.getReg_output().setHtml('<span class="msg err">Username can not be blank</span>');
			return false;
		}

		if (/^\s*$/.test(pass)){
			this.getReg_output().setHtml('<span class="msg err">Password can not be blank</span>');
			return false;
		}

		if (/^\s*$/.test(confirm)){
			this.getReg_output().setHtml('<span class="msg err">Confirm can not be blank</span>');
			return false;
		}

		if (pass != confirm){
			this.getReg_output().setHtml('<span class="msg err">the passwords you entered do not match.</span>');
			return false;
		}

		var users = Ext.getStore('userStore');
		if (users.find('username', user) != -1){
			this.getReg_output().setHtml('<span class="msg err">that username is not available</span>');
			return false;
		}

		var hash = sjcl.hash.sha256.hash(pass);
		hash = sjcl.codec.hex.fromBits(hash);
		users.add({
			username: user,
			password: hash
		});
		users.sync();
		this.getReg_output().setHtml('<span class="msg info">You are registered. Press the back button to return to the interview.</span>');
		return true;
	},

	save_session: function(){

		if (this.password == null){
			this.post_login_callback = this.save_session;
			this.login();
			return false;
		}
		else{
			this.assessment.set('backedvalues', this.backedvalues);
			this.assessment.set('savedvalues', this.savedvalues);
			this.assessment.set('questionstack', this.questionstack);

			var assessments = Ext.getStore('assessmentStore')
			assessments.load();

			var d = new Date();
			if (this.saved_session == null){
				var assessment = {
					'savedon': d.toJSON(),
					'lastupdated': d.toJSON(),
					'user': this.user,
					'data': sjcl.encrypt(this.password, JSON.stringify(this.assessment)),
					'instrument': this.instrument.get('id'),
					'text': this.instrument.get('name') + ' - ' + this.questionstack.slice(-1) + ' [' + d.toLocaleDateString() +' '+ d.toLocaleTimeString() + ']'
				}
				assessment = assessments.add(assessment)[0];
				this.saved_session = assessment;
			}
			else{
				this.saved_session.set('data', sjcl.encrypt(this.password, JSON.stringify(this.assessment)));
				this.saved_session.set('lastupdated', Date());
				this.saved_session.set('text', this.instrument.get('name') + ' - ' + this.questionstack.slice(-1) + ' [' + d.toLocaleDateString() +' '+ d.toLocaleTimeString() + ']');
			}
			assessments.sync();
			alert('Assessment Saved');
			var page = this.questionstack.slice(-1);
			if (page == 'output'){
				this.viewOutput();
			}
			else{
				var qstore = Ext.getStore('questionStore');
				q = qstore.findRecord('id', this.questionstack.pop());
				this.viewQuestion(q, false);
			}
			return true;
		}
	},
	restart: function(){
		location.reload();
	},
	showmain: function(){
		this.getBack_bttn().hide();
		this.getRestart_bttn().hide();
		this.getSave_bttn().hide();
	},

	backup: function(){
		qstore = Ext.getStore('questionStore');
		this.questionstack.pop();
		var question = qstore.findRecord('id', this.questionstack.pop());
		this.viewQuestion(question, true);
	},

	login: function(){
		login = confirm('You need to login in order to perform that action. Would you like to log in now?');
		if (login){
			var lview = Ext.widget('loginview');
			this.getMainpanel().animateActiveItem(lview, {type:'slide', direction: 'left'});
		}
	},

	initView: function(){
		var istore = Ext.getStore('instrumentStore');
		this.instrument = istore.findRecord('id', 1);
		var details = Ext.widget('idetail');
		if (this.saved_session == null){
			this.assessment = Ext.create('ceda.model.Assessment', {
				triggers: {},
				savedvalues: {},
				backedvalues: {},
				questionstack: []
			});
		}
		else{
			var data = this.saved_session.get('data');
			this.assessment = JSON.parse(sjcl.decrypt(this.password, data));
		}
		this.savedvalues = this.assessment.get('savedvalues');
		this.backedvalues = this.assessment.get('backedvalues');
		this.questionstack = this.assessment.get('questionstack');
		this.qview = Ext.widget('qview');
		details.setRecord(this.instrument);
		this.getBar().setTitle(this.instrument.get("name"));
		this.getMainpanel().add(details);
	},

	startTest: function(one, two){
		var instrument = one.getRecord();
		var qstore = Ext.getStore('questionStore');
		var question = qstore.findRecord('initial', true);
		this.viewQuestion(question);
	},

	answerQuestion: function(list, index, item, record){
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
		this.getBack_bttn().show();
		this.getRestart_bttn().show();
		this.getSave_bttn().show();

		//this.captureCapturables();
		var oview = Ext.widget('oview');
		oview.setCollectedInfo(this.savedvalues);
		this.questionstack.push('output');
		this.getMainpanel().animateActiveItem(oview, {type:'slide', direction: 'left'});
	},

	viewQuestion: function(question, back){
//		var debug = true;
		var debug = false;
		if(this.questionstack.length === 0){
			this.getBack_bttn().hide();
		}
		else{
			this.getBack_bttn().show();
		}
		this.getRestart_bttn().show();
		this.getSave_bttn().show();


		this.questionstack.push(question.get('id'));

		//var qview = Ext.widget('qview');
		this.getMainpanel().remove(this.qview);
		this.qview = Ext.widget('qview');
		this.qview.setRecord(question);

		var inputs = Ext.query('*[id^="save"]');
		for (var key in inputs){
			input = inputs[key];
			if (this.backedvalues.hasOwnProperty(input.id)){
				input.value = this.backedvalues[input.id];
			}
		}
		var optionals = Ext.query('*[id^="optional"]');
		for (var key in optionals){
			input = optionals[key];
			if (this.backedvalues.hasOwnProperty(input.id)){
				input.value = this.backedvalues[input.id];
			}
		}

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
		var problems = {
			empties: [],
			invalids: []
		};

		var inputs = Ext.query('*[id^="save"]');
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

		var optionals = Ext.query('*[id^="optional"]');
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
