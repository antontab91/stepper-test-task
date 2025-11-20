const STEP_ID = {
    START: 'start',
    PREPARED: 'prepared',
    SENT_CV: 'sentCv',
    SCREENING_INVITE: 'screeningInvite',
    SCREENING_CALL: 'screeningCall',
    TECH_INTERVIEW: 'techInterview',
    BAR_RAISER: 'barRaiser',

    POSITION_CLOSED: 'positionClosed',
    REJECT: 'silentReject',
    OFFER: 'endOffer',
} as const;

const STEP_TYPE = {
    BRANCH: 'branch',
    STORY: 'story',
    BACK: 'back',
    RANDOM: 'random',
    END: 'end',
} as const;

type Values<T> = T[keyof T];

type StepId = Values<typeof STEP_ID>;
type StepType = Values<typeof STEP_TYPE>;

interface Link {
    label?: string;
    to: StepId;
}

interface Step {
    id: StepId;
    title: string;
    text: string;
    type: StepType;
    links?: Link[];
}

export const STEPS: Step[] = [
    {
        id: STEP_ID.POSITION_CLOSED,
        title: 'Вакансію закрили',
        text: 'Позиція закрита',
        type: STEP_TYPE.END,
    },

    {
        id: STEP_ID.REJECT,
        title: 'Кінець',
        text: 'Шукаю далі',
        type: STEP_TYPE.END,
        links: [{ to: STEP_ID.START }],
    },

    {
        id: STEP_ID.OFFER,
        title: 'Оффер',
        text: 'Запросили',
        type: STEP_TYPE.END,
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
        type: STEP_TYPE.STORY,
        title: 'Підготовка',
        text: 'Вивчаю вимоги,готуюсь, оновлюю CV ',
        links: [
            { label: 'Відгукнутися', to: STEP_ID.SENT_CV },
            { label: 'Попити чайку', to: STEP_ID.REJECT },
        ],
    },

    {
        id: STEP_ID.SENT_CV,
        title: 'Відправив CV',
        text: 'Відправив CV. Перевіряю email, LinkedIn , Telegram.',
        type: STEP_TYPE.RANDOM,
        links: [
            { to: STEP_ID.SCREENING_INVITE },
            { to: STEP_ID.POSITION_CLOSED },
            { to: STEP_ID.REJECT },
        ],
    },

    {
        id: STEP_ID.SCREENING_INVITE,
        type: STEP_TYPE.STORY,
        title: 'Запрошення на скринінг',
        text: 'Рекрутер написав, що моє СВ сподобалось, пропонує пропонує познайомитись',
        links: [
            { label: 'Скринінг з ейчаром', to: STEP_ID.SCREENING_CALL },
            { label: 'Попити чайку', to: STEP_ID.REJECT },
        ],
    },

    {
        id: STEP_ID.SCREENING_CALL,
        type: STEP_TYPE.BRANCH,
        title: 'Скринінг з ейчаром',
        text: 'Обговорюємо досвід, стек, зп',
        links: [
            { label: 'Все супер, рухаюсь далі', to: STEP_ID.TECH_INTERVIEW },
            {
                label: 'Не метч , щось не підійшло',
                to: STEP_ID.REJECT,
            },
        ],
    },

    {
        id: STEP_ID.TECH_INTERVIEW,
        type: STEP_TYPE.BRANCH,
        title: 'Технічна співбесіда',
        text: 'JS, TS, React, і тд по вимогам',
        links: [
            { label: 'Вирішив задачі', to: STEP_ID.BAR_RAISER },

            { label: 'Не впорався із задачами', to: STEP_ID.REJECT },
        ],
    },

    {
        id: STEP_ID.REJECT,
        title: 'Відмова після технічної',
        text: 'Ми обрали іншого кандидата',
        type: STEP_TYPE.BACK,
        links: [{ label: 'Буду шукати далі', to: STEP_ID.START }],
    },

    {
        id: STEP_ID.BAR_RAISER,
        type: STEP_TYPE.BRANCH,
        title: 'Баррейзінг',
        text: 'Говорю з техлідом, Сі левелом, тощо',

        links: [
            { label: 'Сильні відповіді', to: STEP_ID.OFFER },

            {
                label: 'Вибрали іншого кандидата',
                to: STEP_ID.REJECT,
            },
        ],
    },
];
