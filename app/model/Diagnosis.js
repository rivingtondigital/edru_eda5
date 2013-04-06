Ext.define('ceda.model.Diagnosis', {
	extend: 'Ext.data.Model',
	config: {
		proxy: {
            type: 'localstorage',
            id  : 'diagnosis-proxy'
        },
		
		fields: [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'description', type: 'string'}
		],
		hasMany: 'Question',
		belongsTo: 'Instrument'
	}
});