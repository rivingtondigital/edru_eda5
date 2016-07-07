Ext.define('ceda.model.Instrument',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: '_id', type: 'int'},
			{name: 'instrument_id', type: 'int'},
//			{name: 'version' type: 'ceda.model.Version'},
			{name: 'name', type: 'string'},
			{name: 'section_label', type: 'string'},
			{name: 'description', type: 'string'}
		],
		hasOne:{
			model: 					'ceda.model.Version',
			name: 					'version',
			associationKey: 'version',
			autoload: 			true
		},
		hasMany:[
		{
			model: 						'ceda.model.Question',
			name:							'questions',
			associationKey: 	'questions',
			autoload: 				true
		}],
		idProperty: '_id'
	}

});
