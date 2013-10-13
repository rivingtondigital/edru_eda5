Ext.define('ceda.model.PersistedAssessment', {
	extend: 'Ext.data.Model',
	config: {
		identifier: 'uuid',
		proxy: {
			type: 'localstorage',
			id: 'assessmentStore'
		},
		fields: [
			'id',
			'user',
			'savedon',
			'lastupdated',
			'data'
		]
	}
})