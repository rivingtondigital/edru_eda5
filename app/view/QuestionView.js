Ext.define('ceda.view.QuestionView', {
	extend: 'Ext.Container',
	xtype: 'qview',
	requires: [
		'Ext.dataview.List'
	],
	config:{
		layout: 'auto',
		fullscreen: true,
		scrollable:{
		    direction: 'vertical',
		    directionLock: true
		},
		items: [
			{
				itemId: 'header',
				record: null,
				tpl: [
					'<div>',
						'<h1 class="questionheader">{sectionlabel}</h1>',
					'</div>'
				]
			},
			{
				itemId:'probe',
				tpl: ['<div class="sectiondiv">',
						'<div class="tabheader">Question:</div><br>',
						'<div class="probearea">',
							'<ul><li>{interviewprobe}</li></ul>',
						'</div>',
					  '</div>']
			},
			{
				itemId: 'answerarea',
				layout: {
					type: 'vbox'
				},
				items:[
					{
						html: '<div class="sectiondiv"><div class="tabheader">Answers: </div><br><br>'
					},
					{
						itemId: 'aview',
						xtype: 'aview'
					}
				],
				setStore: function(store){
					this.getComponent('aview').setStore(store);
				}
			},
			{
				itemId: 'symptom',
				tpl: ['<div class="sectiondiv">',
						'<div class="tabheader">Symptom:</div><br>',
						'<div class="probearea">',
							'<ul><li>{symptom}</li></ul>',
						'</div>',
					  '</div>']
			}
			
		]
	},
	
	setRecord: function(question){
		this.getComponent('header').setRecord(question);
		this.getComponent('probe').setRecord(question);
		this.getComponent('symptom').setRecord(question);

		var area = this.getComponent('answerarea');
		area.getComponent('aview').setStore(question.getAnswers());
	}
});


