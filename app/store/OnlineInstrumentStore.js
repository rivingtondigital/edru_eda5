Ext.define('ceda.store.OnlineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'onlineInstrumentStore',
        model: 'ceda.model.Instrument',
        proxy: {
            type: 'jsonp',
					url: 'http://localhost:8000/ajax/v/fetch/1/eda5.json',
						noCache: false,
						//callbackKey: 'ceda.data.iproxy',
            reader:{
							type: 'json',
							model: 'ceda.model.Instrument'
						}
        }
    }
});