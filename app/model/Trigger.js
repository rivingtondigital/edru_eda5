Ext.define('ceda.model.Trigger', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            type: 'localstorage',
            id  : 'trigger-proxy'
        },
		
		fields: [ 'id', 'answer_id', 'name', 'value' ],
		belongsTo: 'Answer'
	}
});
