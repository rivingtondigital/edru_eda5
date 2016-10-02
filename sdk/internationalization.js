lang_lookup = {
    en: {
        ISO_CODE: 'en',
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
        RESULTS: "results",
        PRINT: "print",
        AUTHENTICATION: "login",
        USER_NAME: "user name",
        PASSWORD: "password",
        LOGIN: "login",
        LOGIN_FAIL: "That username/password is incorrect",
        NOT_VALID: "SUB1 is not a valid SUB2.",
        INCOMPLETE: "Complete all inputs on this page.",
        CRITERIA_MET: 'Criteria for SUB met.',
        NEED_LOGIN: 'You need to login in order to perform that action. Would you like to log in now?',
//        SUCCESS_UPDATE:'You have successfully updated the questionnaire.',
//        UPDATE_ANYWAY: "You're version is up to date. Would you still like to re-install it?",
//        UPDATE_UNAVAILABLE: 'Update Unavailable',
//        CONNECT_INTERNET: 'Please connect to the internet before updating the questionnaire.',
        PASSWORDS_NO_MATCH: "the passwords you entered do not match",
        REGISTER_SUCCESS: "You are registered. Press the back button to return to the interview"
    },
    no: {
        ISO_CODE: 'no',
        BEGIN_NEW: "Start nytt intervju",
        VIEW_PREVIOUS: "Se tidligere intervjuer",
        UPDATE: "oppdater",
        BACK: "tilbake",
        RESTART: "omstart",
        SAVE: "lagre",
        NOTES: "notater",
        SYMPTOMS: "symptomer",
        PROBE: "spørsmål",
        ANSWERS: "svar",
        RESULTS: "resultater",
        PRINT: "skriv ut",
        AUTHENTICATION: "innlogging",
        USER_NAME: "brukernavn",
        PASSWORD: "passord",
        LOGIN: "logg på",
        LOGIN_FAIL: "Brukernavnet eksisterer ikke",
        NOT_VALID: "SUB1 er ikke en gyldig SUB2",
        INCOMPLETE: "fyll ut all informasjon på denne siden.",
        CRITERIA_MET: 'oppfyller kriteriene for SUB.',
        NEED_LOGIN: 'Du må logge in for å lagre. Ønsker du å logge in nå?',
//        SUCCESS_UPDATE:'You have successfully updated the questionnaire.',
//        UPDATE_ANYWAY: "You're version is up to date. Would you still like to re-install it?",
//        UPDATE_UNAVAILABLE: 'Update Unavailable',
//        CONNECT_INTERNET: 'Please connect to the internet before updating the questionnaire.',
        PASSWORDS_NO_MATCH: "Du har oppgitt forskjellige passord",
        REGISTER_SUCCESS: "Du er registrert. Klikk Tilbake for å gå tilbake til intervjuet"
    }
}


function get_language(){
    var prefered = null;

    var languages = navigator.languages
    if (languages && languages.length > 1){
        prefered =languages[0];

    }
//    var params = Ext.urlDecode(location.search.substring(1));
    if (PARAMS.lang){
        prefered = PARAMS.lang;

    }
    if (prefered){
        switch(true){
            case /en/.test(prefered):
                return lang_lookup['en'];
                break;
            case /no/.test(prefered):
                return lang_lookup['no'];
                break;
            default:
                return lang_lookup['en'];
        }
    }
    return lang_lookup['en'];
}

var lang = get_language();

