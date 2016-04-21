Ext.define('ceda.model.Version',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: '_id', type: 'int'},
			{name: 'major', type: 'int'},
			{name: 'minor', type: 'int'}
		],
	}

});
