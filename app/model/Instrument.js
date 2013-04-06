Ext.define('ceda.model.Instrument',{
	extend: 'Ext.data.Model',

	config: {
		proxy: {
            type: 'localstorage',
            id  : 'instrument-proxy'
        },
		
		fields: [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'description', type: 'string'}
		],
		hasMany: 'Question'
	}
	
});
