export enum STEP_ID {
    START = 'start',
    PREPARED = 'prepared',
    SENT_CV = 'sentCv',
    SCREENING_INVITE = 'screeningInvite',
    SCREENING_CALL = 'screeningCall',
    TECH_INTERVIEW = 'techInterview',
    BAR_RAISER = 'barRaiser',
    POSITION_CLOSED = 'positionClosed',
    REJECT = 'reject',
    TEHREJECT = 'tehReject',
    BARREJECT = 'barReject',
    TEAREJECT = 'teaReject',
    OFFER = 'endOffer',
}

export enum STEP_TYPE {
    BRANCH = 'branch',
    RANDOM = 'random',
    END = 'end',
}

interface Link {
    label: string;
    to: STEP_ID;
}

export interface Step {
    id: STEP_ID;
    title: string;
    text: string;
    type: STEP_TYPE;
    links: Link[];
}
