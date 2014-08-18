Ext.define('ceda.model.Instrument',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: '_id', type: 'int'},
			{name: 'instrument_id', type: 'int'},
			{name: 'version', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'description', type: 'string'}
		],
		hasMany:[
		{
			model: 						'ceda.model.Question',
			name:							'questions',
			associationKey: 	'questions',
			autoload: 				true
		}],
		idProperty: '_id',
	}

});
