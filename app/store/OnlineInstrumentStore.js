Ext.define('ceda.store.OnlineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'onlineInstrumentStore',
        model: 'ceda.model.Instrument',
        proxy: {
            type: 'jsonp',
						url: 'http://eda5.org/api/ajax/v/fetch/current/eda5.json',
						noCache: false,
						//callbackKey: 'ceda.data.iproxy',
            reader:{
							type: 'json',
							model: 'ceda.model.Instrument'
						}
        }
    }
});