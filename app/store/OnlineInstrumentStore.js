Ext.define('ceda.store.OnlineInstrumentStore', {
    extend: "Ext.data.Store",
    config: {
        storeId: 'onlineInstrumentStore',
        model: 'ceda.model.Instrument',
        proxy: {
            type: 'jsonp',
            url: 'https://interview.eda5.org/api/ajax/v/interview.json',
            noCache: false,
            reader:{
                type: 'json',
                model: 'ceda.model.Instrument'
            }
        }
    }
});
