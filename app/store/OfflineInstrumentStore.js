Ext.define('ceda.store.OfflineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'offlineInstrumentStore',
        fields: ['urlname', 'version_major', 'version_minor'],
//        model: "ceda.model.BasicKeyValue",
	proxy:{
		type: 'localstorage',
		id: 'instrument'
	},
        //autoLoad: true
    }
});
