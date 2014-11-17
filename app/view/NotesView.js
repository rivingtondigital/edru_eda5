Ext.define('ceda.view.NotesView', {
	extend: 'Ext.Container',
	xtype: 'notes_view',
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
						'<h1 class="questionheader">Notes</h1>',
					'</div>'
				]
			},
			{
				itemId: 'inputArea',
				record: true,
				tpl: [
					"<div>",
						"<span>Input Area</span>",
					"</div>"
				]
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
			area.getComponent('aview').setStore(question.getAnswers());
		}
	}
});
