int_strings = {
    en: {
        BEGIN_NEW: "begin new",
        VIEW_PREVIOUS: "view previous sessions",
        UPDATE: "update",
        BACK: "back",
        RESTART: "restart",
        SAVE: "save",
        NOTES: "notes",
        SYMPTOMS: "symptoms",
        PROBE: "probe",
        ANSWERS: "answers",
        NOT_VALID: "SUB1 is not a valid SUB2.",
        INCOMPLETE: "Complete all inputs on this page.",
        CRITERIA_MET: 'Criteria for SUB met.',
        NEED_LOGIN: 'You need to login in order to perform that action. Would you like to log in now?',
        SUCCESS_UPDATE:'You have successfully updated the questionnaire.',
        UPDATE_ANYWAY: "You're version is up to date. Would you still like to re-install it?",
        UPDATE_UNAVAILABLE: 'Update Unavailable',
        CONNECT_INTERNET: 'Please connect to the internet before updating the questionnaire.'
    },
    no: {
        BEGIN_NEW: "Start nytt intervju",
        VIEW_PREVIOUS: "Se tidligere intervjuer",
        UPDATE: "Oppdater",
        BACK: "Tilbake",
        RESTART: "Omstart",
        SAVE: "Spare",
        NOTES: "Noter",
        SYMPTOMS: "Symptomer",
        PROBE: "spørsmål",
        ANSWERS: "svar",
        NOT_VALID: "SUB1 er ikke en gyldig SUB2",
        INCOMPLETE: "Fyll ut all informasjon på denne siden.",
        CRITERIA_MET: 'Oppfyller kriteriene for SUB.',
        NEED_LOGIN: 'You need to login in order to perform that action. Would you like to log in now?',
        SUCCESS_UPDATE:'You have successfully updated the questionnaire.',
        UPDATE_ANYWAY: "You're version is up to date. Would you still like to re-install it?",
        UPDATE_UNAVAILABLE: 'Update Unavailable',
        CONNECT_INTERNET: 'Please connect to the internet before updating the questionnaire.'
    }
}


function get_language(){
    console.info("HI THERE" + params);
    var prefered = null;

    var languages = navigator.languages
    if (languages && languages.length > 1){
        prefered =languages[0];

    }
    var params = Ext.urlDecode(location.search.substring(1));
    if (params.lang){
        prefered = params.lang;

    }
    if (prefered){
        switch(true){
            case /en/.test(prefered):
                return int_strings['en'];
                break;
            case /no/.test(prefered):
                return int_strings['no'];
                break;
            default:
                return int_strings['en'];
        }
    }
    return int_strings['en'];
}

var lang = get_language();