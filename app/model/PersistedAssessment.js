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
			{
				name:'savedon',
				sortType: 'asDate'
			},
			{
				name: 'lastupdated',
				sortType: 'asDate'
			},

			'data',
			'instrument',
			'text'
		]
	}
})