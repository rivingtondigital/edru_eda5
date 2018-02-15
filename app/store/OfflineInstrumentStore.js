Ext.define('ceda.store.OfflineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'offlineInstrumentStore',
        fields: [
          {name: 'urlname', type: 'string'},
          {name: 'version_major', type: 'int'},
          {name: 'version_minor', type: 'int'},
          {name: 'json_value', type: 'string'}
          ],
//        model: "ceda.model.BasicKeyValue",
	proxy:{
		type: 'localstorage',
		id: 'instrument'
	},
        //autoLoad: true
    }
});
