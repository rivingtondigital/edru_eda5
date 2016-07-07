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
				record: true,
				tpl: [
					'<div>',
						'<h1 class="questionheader">{section_label}</h1>',
					'</div>'
				]
			},
			{
				itemId: 'symptom',
				tpl: ['<div class="sectiondiv">',
						'<div class="tabheader"> ' + lang.SYMPTOMS + ':</div><br>',
						'<div class="probearea">',
							'<ul><li>{symptom_text}</li></ul>',
						'</div>',
					'</div>']
			},
			{
				itemId:'probe',
				tpl: ['<div class="sectiondiv">',
						'<div class="tabheader">' + lang.PROBE + ':</div><br>',
						'<div class="probearea">',
							'<ul><li>{probe_text}</li></ul>',
						'</div>',
					'</div>',
					'<div>',
						'<span class="span_id">{question_id}</span>',
					'</div>',
				]
			},
			{
				itemId: 'answerarea',
				layout: {
					type: 'vbox'
				},
				items:[
					{
						html: '<div class="sectiondiv"><div class="tabheader">' + lang.ANSWERS + ': </div><br><br>'
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
				itemId: 'debugarea',
				layout:{
					type: 'vbox',
				},
				items:[
					{
						html: '<div class="sectiondiv"><div class="tabheader">Debug: </div><br><br>'
					},
					{
						itemId: 'debugview',
						xtype: 'debugview'
					}
				]
			}
		]
	},


	setRecord: function(question){
		if(typeof this.getComponent('header') !== 'undefined'){
			this.getComponent('header').setRecord(question);
			this.getComponent('probe').setRecord(question);
			this.getComponent('symptom').setRecord(question);
			var area = this.getComponent('answerarea');
//			area.getComponent('aview').setStore(question.getAnswers());
			area.getComponent('aview').setStore(question.answersStore);
		}
	}
});


