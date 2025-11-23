import { type Step, STEP_ID } from '../schema/types';

const EXPERIENCE_STEPS: STEP_ID[] = [
    STEP_ID.REJECT,
    STEP_ID.PREPARED,
    STEP_ID.TECH_INTERVIEW,
    STEP_ID.SCREENING_CALL,
];

export interface State {
    currentStepId: STEP_ID;
    history: STEP_ID[];
    attempts: number;
    experience: number;
}

export enum ActionType {
    GO_TO = 'GO_TO',
    RANDOM = 'RANDOM',
    RESTART = 'RESTART',
    BACK = 'BACK',
}

export type Action =
    | { type: ActionType.GO_TO; id: STEP_ID }
    | { type: ActionType.RANDOM; step: Step }
    | { type: ActionType.RESTART }
    | { type: ActionType.BACK };

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.GO_TO: {
            const id = action.id;

            return {
                ...state,
                currentStepId: id,
                history: [...state.history, id],
                experience:
                    state.experience + (EXPERIENCE_STEPS.includes(id) ? 1 : 0),
            };
        }

        case ActionType.RANDOM: {
            const { step } = action;
            if (!step.links.length) return state;

            const randomLink =
                step.links[Math.floor(Math.random() * step.links.length)];

            const id = randomLink.to;

            return {
                ...state,
                currentStepId: id,
                history: [...state.history, id],
                experience:
                    state.experience + (EXPERIENCE_STEPS.includes(id) ? 1 : 0),
            };
        }

        case ActionType.BACK: {
            if (state.history.length <= 1) return state;

            const newHistory = state.history.slice(0, -1);
            const prevId = newHistory[newHistory.length - 1];

            return {
                ...state,
                currentStepId: prevId,
                history: newHistory,
            };
        }

        case ActionType.RESTART: {
            return {
                ...state,
                currentStepId: STEP_ID.START,
                history: [STEP_ID.START],
                attempts: state.attempts + 1,
            };
        }

        default:
            return state;
    }
};
