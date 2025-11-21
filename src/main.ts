import { STEPS, STEP_ID_MAP } from './model/steps';
import type { Step, StepId, Link } from './model/steps';

import StepUI from './ui/StepUI';
import InfoUI from './ui/InfoUI';
import ControlsUI from './ui/ControlsUI';

import './styles/index.css';

interface QuestState {
    currentStepId: StepId;
    history: StepId[];
}

export interface ViewState {
    totalSteps: number;
}

const createInitialState = (): QuestState => ({
    currentStepId: STEP_ID_MAP.START,
    history: [STEP_ID_MAP.START],
});

export const stepperApp = (): void => {
    const root = document.getElementById('app');
    if (!root) return;

    let state: QuestState = createInitialState();

    const getStep = (id: StepId): Step => {
        const step = STEPS.find((s) => s.id === id);
        if (!step) throw new Error(`Unknown step id: ${id}`);
        return step;
    };

    const goTo = (nextId: StepId): void => {
        state = {
            currentStepId: nextId,
            history: [...state.history, nextId],
        };
        render();
    };

    const onLink = (link: Link): void => goTo(link.to);

    const onRandom = (): void => {
        const step = getStep(state.currentStepId);
        if (!step.links || step.links.length === 0) return;
        const index = Math.floor(Math.random() * step.links.length);
        const randomLink = step.links[index];
        goTo(randomLink.to);
    };

    const onRestart = (): void => {
        state = createInitialState();
        render();
    };

    const render = (): void => {
        const step = getStep(state.currentStepId);
        const viewState: ViewState = { totalSteps: state.history.length };

        root.innerHTML = '';

        StepUI({ root, step });

        ControlsUI({
            root,
            step,
            onLink,
            onRandom,
            onRestart,
        });

        InfoUI({ root, totalSteps: viewState.totalSteps });
    };

    render();
};

stepperApp();
