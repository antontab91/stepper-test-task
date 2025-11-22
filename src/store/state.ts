import type { PersistedState } from '../store/db';
import { type Step, STEP_ID } from '../types/step';

export type State = PersistedState;

export enum ActionType {
    GO_TO = 'GO_TO',
    RANDOM = 'RANDOM',
    RESTART = 'RESTART',
}

export type Action =
    | { type: ActionType.GO_TO; id: STEP_ID }
    | { type: ActionType.RANDOM; step: Step }
    | { type: ActionType.RESTART };

export const createInitialState = (): State => ({
    currentStepId: STEP_ID.START,
    history: [STEP_ID.START],
});

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.GO_TO: {
            const id = action.id;

            return {
                currentStepId: id,
                history: [...state.history, id],
            };
        }

        case ActionType.RANDOM: {
            const { step } = action;
            if (!step.links.length) return state;

            const randomLink =
                step.links[Math.floor(Math.random() * step.links.length)];
            const nextId = randomLink.to;

            return {
                currentStepId: nextId,
                history: [...state.history, nextId],
            };
        }

        case ActionType.RESTART: {
            return createInitialState();
        }

        default:
            return state;
    }
};
