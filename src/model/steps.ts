export const STEP_ID_MAP = {
    START: 'start',
    PREPARED: 'prepared',
    SENT_CV: 'sentCv',
    SCREENING_INVITE: 'screeningInvite',
    SCREENING_CALL: 'screeningCall',
    TECH_INTERVIEW: 'techInterview',
    BAR_RAISER: 'barRaiser',
    POSITION_CLOSED: 'positionClosed',
    REJECT: 'reject',
    OFFER: 'endOffer',
} as const;

export const STEP_TYPE_MAP = {
    BRANCH: 'branch',
    RANDOM: 'random',
    END: 'end',
} as const;

type Values<T> = T[keyof T];

export type StepId = Values<typeof STEP_ID_MAP>;
type StepType = Values<typeof STEP_TYPE_MAP>;

export interface Link {
    label: string;
    to: StepId;
}

export interface Step {
    id: StepId;
    title: string;
    text: string;
    type: StepType;
    links: Link[] | null;
}

export const STEPS: Step[] = [
    {
        id: STEP_ID_MAP.POSITION_CLOSED,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Вакансію закрили',
        text: 'Позиція закрита',
        links: [{ label: 'Буду шукати далі', to: STEP_ID_MAP.START }],
    },

    {
        id: STEP_ID_MAP.REJECT,
        title: 'Відмова',
        text: 'Обрали іншого кандидата',
        type: STEP_TYPE_MAP.BRANCH,
        links: [{ label: 'Буду шукати далі', to: STEP_ID_MAP.START }],
    },

    {
        id: STEP_ID_MAP.OFFER,
        type: STEP_TYPE_MAP.END,
        title: 'Оффер',
        text: 'Запросили',
        links: null,
    },
    {
        id: STEP_ID_MAP.START,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Нова вакансія',
        text: 'Знайшов цікаву вакансію.',
        links: [
            { label: 'Відгукнутися', to: STEP_ID_MAP.SENT_CV },
            { label: 'Підготовка', to: STEP_ID_MAP.PREPARED },
            { label: 'Попити чайку', to: STEP_ID_MAP.REJECT },
        ],
    },

    {
        id: STEP_ID_MAP.PREPARED,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Підготовка',
        text: 'Вивчаю вимоги,готуюсь, оновлюю CV ',
        links: [
            { label: 'Відгукнутися', to: STEP_ID_MAP.SENT_CV },
            { label: 'Попити чайку', to: STEP_ID_MAP.REJECT },
        ],
    },

    {
        id: STEP_ID_MAP.SENT_CV,
        title: 'Відправив CV',
        text: 'Відправив CV. Перевіряю email, LinkedIn , Telegram.',
        type: STEP_TYPE_MAP.RANDOM,
        links: [
            {
                label: 'Запрошення на скринінг',
                to: STEP_ID_MAP.SCREENING_INVITE,
            },
            {
                label: 'Вакансію закрили',
                to: STEP_ID_MAP.POSITION_CLOSED,
            },
            { label: 'Довго чекав, не відповіли ', to: STEP_ID_MAP.REJECT },
        ],
    },

    {
        id: STEP_ID_MAP.SCREENING_INVITE,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Запрошення на скринінг',
        text: 'Рекрутер написав, що моє СВ сподобалось, пропонує пропонує познайомитись',
        links: [
            { label: 'Скринінг з ейчаром', to: STEP_ID_MAP.SCREENING_CALL },
            { label: 'Попити чайку', to: STEP_ID_MAP.REJECT },
        ],
    },

    {
        id: STEP_ID_MAP.SCREENING_CALL,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Скринінг з ейчаром',
        text: 'Обговорюємо досвід, стек, зп',
        links: [
            {
                label: 'Все супер, рухаюсь далі',
                to: STEP_ID_MAP.TECH_INTERVIEW,
            },
            {
                label: 'Не метч , щось не підійшло',
                to: STEP_ID_MAP.REJECT,
            },
        ],
    },

    {
        id: STEP_ID_MAP.TECH_INTERVIEW,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Технічна співбесіда',
        text: 'JS, TS, React, і тд по вимогам',
        links: [
            { label: 'Вирішив задачі', to: STEP_ID_MAP.BAR_RAISER },
            { label: 'Не впорався із задачами', to: STEP_ID_MAP.REJECT },
            { label: 'Попити чайку', to: STEP_ID_MAP.REJECT },
        ],
    },

    {
        id: STEP_ID_MAP.BAR_RAISER,
        type: STEP_TYPE_MAP.BRANCH,
        title: 'Баррейзінг',
        text: 'Говорю з техлідом, Сі левелом, тощо',

        links: [
            { label: 'Сильні відповіді', to: STEP_ID_MAP.OFFER },

            {
                label: 'Вибрали іншого кандидата',
                to: STEP_ID_MAP.REJECT,
            },
        ],
    },
];
