Ext.Loader.setConfig({
	enabled : true,
	disableCaching : false
});


Ext.application({
    name: 'ceda',

    requires: [
        'Ext.MessageBox'
    ],

		models:[
            'Question',
            'Answer',
            'Assessment',
            'Diagnosis',
            'Rule',
            'Trigger',
            'PersistedAssessment',
            'User',
            'Instrument',
            'BasicKeyValue',
            'Version'
    ],

    stores:[
//   	'InstrumentStore',
//   	'QuestionStore',
//  	'AnswerStore',
        'AssessmentStore',
        'UserStore',
        'OfflineInstrumentStore',
        'OnlineInstrumentStore'
    ],

    views: [
        'Main',
        'InstrumentDetailView',
        'QuestionView',
        'AnswersView',
        'AnswerItem',
        'OutputView',
        'DebugView',
        'LoginView',
        'RegisterView',
        'SavedView',
        'NotesView'
    ],

    controllers:[
    	'SimpleNavController'
    ],

//    stores:[
//        'InstrumentStore',
//        'QuestionStore',
//        'AnswerStore',
//        'AssessmentStore',
//        'UserStore'
//    ],
//
//    models:[
//        'Instrument',
//        'Question',
//        'Answer',
//        'Assessment',
//        'Diagnosis',
//        'Rule',
//        'Trigger',
//        'PersistedAssessment',
//        'User'
//    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('ceda.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }

});
