int_strings = {
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
        NOT_VALID: "SUB1 is not a valid SUB2.",
        INCOMPLETE: "Complete all inputs on this page.",
        CRITERIA_MET: 'Criteria for SUB met.',
        NEED_LOGIN: 'You need to login in order to perform that action. Would you like to log in now?',
        SUCCESS_UPDATE:'You have successfully updated the questionnaire.',
        UPDATE_ANYWAY: "You're version is up to date. Would you still like to re-install it?",
        UPDATE_UNAVAILABLE: 'Update Unavailable',
        CONNECT_INTERNET: 'Please connect to the internet before updating the questionnaire.',
	INTERVIEW: 'Interview',
	DATE: 'Date',
	INTERVIEW_ID: 'Interview ID',
	SUBJECT_ID: 'Subject ID',
	SUBJECT_AGE: 'Subect Age',
	BMI: 'BMI',
	WEIGHT: 'Weight',
	HEIGHT: 'Height',
	RECENT_WEIGHT: 'Recent Weight',
	RECENT_HEIGHT: 'Recent Height',
	RECENT_LOW_BMI: 'Recent Low BMI',
	DIAGNOSIS: 'Diagnosis',
	ANOREXIA_NERVOSA: 'Anorexia Nevosa',
     	BINGE_PURGE_SUBTYPE: 'Binge-Purge Subtype',
     	RESTRICTING_SUBTYPE: 'Restricting Subtype',
	BULIMIA_NERVOSA: 'Bulimia Nervosa',
	BINGE_EATING_DISORDER: 'Binge Eating Disorder',
	PICA: 'Pica',
	RUMINATION_DISORDER: 'Rumination Disorder',
	AVOIDANT_RESTRICTIVE: 'Avoidant/Restrictive Food Intake Disorder',
	TYPICAL_OBE_ITEMS: 'Typical OBE items',
	OBES_PER_WEEK: 'OBEs per week',
	TYPICAL_SBE_ITEMS: 'Typical SBE items',
	SBES_PER_WEEK: 'SBEs per week',
	VOMITING: 'Vomiting',
	LAXATIVES: 'Laxitives',
	DIURETICS: 'Diuretics',
	AVERAGE_NO_WEEK: 'Average # per week',
	AVERAGE_NO_MONTH: 'Average # per month',
	OTHER_METHOD: 'Other method',
	NAME: 'Name',
	EXERCISE: 'Exercise',
	TYPE: 'Exercise Type',
	AVERAGE_MINUTES_PER: 'Average number mins per episode',
	AVERAGE_PER_WEEK: 'Average number episodes per week',
	AVERAGE_PER_MONTH: 'Average number episodes per month',
	NOTES: 'Notes'
    },
    no: {
        ISO_CODE: 'no',
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
        CONNECT_INTERNET: 'Please connect to the internet before updating the questionnaire.',
        INTERVIEW: 'Intervju',
        DATE: 'Dato',
        INTERVIEW_ID: 'ID intervjuere',
        SUBJECT_ID: 'ID individ',
        SUBJECT_AGE: 'Individets alder',
        BMI: 'KMI',
        WEIGHT: 'Vekt',
        HEIGHT: 'Høyde',
        RECENT_WEIGHT: 'Nylig vekt',
        RECENT_HEIGHT: 'Nylig høyde',
        RECENT_LOW_BMI: 'Nylig lav KMI',
        DIAGNOSIS: 'Diagnose',
        ANOREXIA_NERVOSA: 'Anoreksia Nervosa',
        BINGE_PURGE_SUBTYPE: 'Bulemisk Subtype',
        RESTRICTING_SUBTYPE: 'Restriktiv Subtype',
        BULIMIA_NERVOSA: 'Bulimi Nervosa',
        BINGE_EATING_DISORDER: 'Overspisingslidelse',
        PICA: 'Pica',
        RUMINATION_DISORDER: 'Regurgitasjonsforstyrrelse',
        AVOIDANT_RESTRICTIVE: 'Unnvikende/restriktiv matinntaksforstyrrelse',
        TYPICAL_OBE_ITEMS: 'Eksempel på typisk UOO',
        OBES_PER_WEEK: 'Antall UOO per uke',
        TYPICAL_SBE_ITEMS: 'Eksempel på typisk USO',
        SBES_PER_WEEK: 'Antall USO per uke',
        VOMITING: 'Oppkast',
	LAXATIVES: 'Avføringsmiddel',
	DIURETICS: 'Vanndrivende midler',
        AVERAGE_NO_WEEK: 'Gjennomsnittlig hyppighet per uke',
	AVERAGE_NO_MONTH: 'gjennomsnittlig antall per måned',
        OTHER_METHOD: 'Andre metoder',
        NAME: 'Beskrivelse',
        EXERCISE: 'Trening',
        TYPE: 'Type trening',
        AVERAGE_MINUTES_PER: 'Antall minutter per treningsøkt i gjennomsnitt',
        AVERAGE_PER_WEEK: 'Antall episoder, i gjennomsnitt, av overdreven trening per uke',
	AVERAGE_PER_MONTH: 'Antall episoder, i gjennomsnitt, av overdreven trening per måned',
        NOTES: 'Notater'
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

