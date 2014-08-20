Ext.define('ceda.model.Assessment', {
	extend: 'Ext.data.Model',
	config:{
		proxy: {
            type: 'localstorage',
            id  : 'assessment-proxy'
        },

		fields:[
				'id',
				'triggers',
				'backedvalues',
				'savedvalues',
				'questionstack',
				'version_major',
				'version_minor'
		],
		hasOne: [
			'Instrument'
		]
	}
});
