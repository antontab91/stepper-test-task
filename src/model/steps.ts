export const enum STEP_ID {
    START = 'start',
    PREPARED = 'prepared',
    SENT_CV = 'sentCv',
    SCREENING_INVITE = 'screeningInvite',
    SCREENING_CALL = 'screeningCall',
    TECH_INTERVIEW = 'techInterview',
    BAR_RAISER = 'barRaiser',
    POSITION_CLOSED = 'positionClosed',
    REJECT = 'reject',
    OFFER = 'endOffer',
}

export const enum STEP_TYPE {
    BRANCH = 'branch',
    RANDOM = 'random',
    END = 'end',
}

export interface Link {
    label: string;
    to: STEP_ID;
}

export interface Step {
    id: STEP_ID;
    title: string;
    text: string;
    type: STEP_TYPE;
    links: Link[] | null;
}

export const STEPS: Step[] = [
    {
        id: STEP_ID.POSITION_CLOSED,
        type: STEP_TYPE.BRANCH,
        title: 'Вакансію закрили',
        text: 'Позиція закрита',
        links: [{ label: 'Буду шукати далі', to: STEP_ID.START }],
    },
    {
        id: STEP_ID.REJECT,
        title: 'Відмова',
        text: 'Обрали іншого кандидата',
        type: STEP_TYPE.BRANCH,
        links: [{ label: 'Буду шукати далі', to: STEP_ID.START }],
    },
    {
        id: STEP_ID.OFFER,
        type: STEP_TYPE.END,
        title: 'Оффер',
        text: 'Запросили',
        links: null,
    },
    {
        id: STEP_ID.START,
        type: STEP_TYPE.BRANCH,
        title: 'Нова вакансія',
        text: 'Знайшов цікаву вакансію.',
        links: [
            { label: 'Відгукнутися', to: STEP_ID.SENT_CV },
            { label: 'Підготовка', to: STEP_ID.PREPARED },
            { label: 'Попити чайку', to: STEP_ID.REJECT },
        ],
    },
    {
        id: STEP_ID.PREPARED,
        type: STEP_TYPE.BRANCH,
        title: 'Підготовка',
        text: 'Вивчаю вимоги, готуюсь, оновлюю CV',
        links: [
            { label: 'Відгукнутися', to: STEP_ID.SENT_CV },
            { label: 'Попити чайку', to: STEP_ID.REJECT },
        ],
    },
    {
        id: STEP_ID.SENT_CV,
        title: 'Відправив CV',
        text: 'Відправив CV. Перевіряю email, LinkedIn, Telegram.',
        type: STEP_TYPE.RANDOM,
        links: [
            { label: 'Запрошення на скринінг', to: STEP_ID.SCREENING_INVITE },
            { label: 'Вакансію закрили', to: STEP_ID.POSITION_CLOSED },
            { label: 'Довго чекав, не відповіли', to: STEP_ID.REJECT },
        ],
    },
    {
        id: STEP_ID.SCREENING_INVITE,
        type: STEP_TYPE.BRANCH,
        title: 'Запрошення на скринінг',
        text: 'Рекрутер написав, що СV сподобалось',
        links: [
            { label: 'Скринінг з ейчаром', to: STEP_ID.SCREENING_CALL },
            { label: 'Попити чайку', to: STEP_ID.REJECT },
        ],
    },
    {
        id: STEP_ID.SCREENING_CALL,
        type: STEP_TYPE.BRANCH,
        title: 'Скринінг з ейчаром',
        text: 'Обговорюємо досвід, стек, зарплату',
        links: [
            { label: 'Все супер, рухаюсь далі', to: STEP_ID.TECH_INTERVIEW },
            { label: 'Не метч, щось не підійшло', to: STEP_ID.REJECT },
        ],
    },
    {
        id: STEP_ID.TECH_INTERVIEW,
        type: STEP_TYPE.BRANCH,
        title: 'Технічна співбесіда',
        text: 'JS, TS, React, інше по вимогам',
        links: [
            { label: 'Вирішив задачі', to: STEP_ID.BAR_RAISER },
            { label: 'Не впорався із задачами', to: STEP_ID.REJECT },
            { label: 'Попити чайку', to: STEP_ID.REJECT },
        ],
    },
    {
        id: STEP_ID.BAR_RAISER,
        type: STEP_TYPE.BRANCH,
        title: 'Баррейзінг',
        text: 'Говорю з техлідом',
        links: [
            { label: 'Сильні відповіді', to: STEP_ID.OFFER },
            { label: 'Вибрали іншого кандидата', to: STEP_ID.REJECT },
        ],
    },
];
