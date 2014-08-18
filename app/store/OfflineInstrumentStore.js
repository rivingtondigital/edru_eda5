Ext.define('ceda.store.OfflineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'offlineInstrumentStore',
        model: "ceda.model.BasicKeyValue",
				proxy:{
					type: 'localstorage',
					id: 'instrument'
				},
        //autoLoad: true
    }
});