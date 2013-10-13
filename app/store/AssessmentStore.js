Ext.define('ceda.store.AssessmentStore', {
    extend: 'Ext.data.Store',
    config: {
			storeId: 'assessmentStore',
			model: 'ceda.model.PersistedAssessment'
    }
});