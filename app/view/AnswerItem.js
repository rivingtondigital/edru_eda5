Ext.define("ceda.view.AnswerItem", {
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'aitem',
	config:{
		description: {
			ui: 'confirm'
		},
		dataMap: {
			getDescription: {
				setHtml: 'description'
			}
		},
		styleHtmlContents: true,
		
		style: 'margin: 10px'
	},
	applyDescription: function(config){
		return Ext.factory(config, Ext.Button, this.getDescription());
	},
	updateDescription: function(newdesc, olddesc){
		if(olddesc){
			this.remove(olddesc);
		}
		if(newdesc){
			this.add(newdesc);
		}
	}
});
