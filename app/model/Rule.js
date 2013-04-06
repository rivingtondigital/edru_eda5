Ext.define('ceda.model.Rule', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            type: 'localstorage',
            id  : 'rule-proxy'
        },
		
		fields:[ 'id', 'name' ],
		hasOne: 'Question',
		hasMany: 'Triggers'
	}
});
