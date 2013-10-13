Ext.define('ceda.store.UserStore', {
    extend: 'Ext.data.Store',
    config: {
			storeId: 'userStore',
			model: 'ceda.model.User'
    }
});