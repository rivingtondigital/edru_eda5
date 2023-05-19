Ext.define('ceda.store.OnlineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'onlineInstrumentStore',
        model: 'ceda.model.Instrument',
        proxy: {
            type: 'jsonp',
            url: '/api/ajax/v/interview.json',
            noCache: false,
            reader:{
                type: 'json',
                model: 'ceda.model.Instrument'
            }
        }
    }
});
