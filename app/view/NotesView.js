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
				html: '<div class="sectiondiv"><div class="tabheader">Notes: </div><br><br>'
			},
			{
				itemId: 'nview',
				scrollable: false,
				triggers: null,				
				style: 'margin: 10px 20px',
				html: "<textarea id='notes_area'></textarea>"
			}
		]
	},
	setNotes: function(notes){
		var area = this.getComponent('nview');
		html = "<textarea id='notes_area'>"+notes+"</textarea>";
		area.setHtml(html);
	}	
});
