Ext.define('ceda.model.BasicKeyValue',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'keyname', type: 'string'},
			{name: 'version', type: 'string'},
			{name: 'json_value', type: 'string'}
		],
		identifier: {
			type: 'uuid'
		}
	}
});