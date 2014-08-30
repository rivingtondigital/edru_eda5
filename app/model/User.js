Ext.define('ceda.model.User',{
	extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		proxy: {
			type: 'localstorage',
			id: 'userStore'
		},
		fields: [
			'id',
			'username',
			'password'
		]
	}
})