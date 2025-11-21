import { STEPS, STEP_ID_MAP } from './model/steps';
import type { Step, StepId, Link } from './model/steps';

import StepUI from './ui/StepUI';
import InfoUI from './ui/InfoUI';
import ControlsUI from './ui/ControlsUI';

import { loadSteps, saveSteps } from './store/db';

import './styles/index.css';

interface State {
    currentStepId: StepId;
    history: StepId[];
}

const createInitialState = (): State => ({
    currentStepId: STEP_ID_MAP.START,
    history: [STEP_ID_MAP.START],
});

export const stepperApp = async (): Promise<void> => {
    const root = document.getElementById('app');
    if (!root) throw new Error('root is undefinesd');

    const fromDb: Step[] = await loadSteps();

    const steps: Step[] = fromDb.length > 0 ? fromDb : STEPS;

    if (fromDb.length === 0) {
        await saveSteps(STEPS);
    }

    let state: State = createInitialState();

    const getStep = (id: StepId): Step => {
        const step = steps.find((s) => s.id === id);
        if (!step) throw new Error(` ${id} - unknown id:`);
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
        const totalSteps = state.history.length;

        root.innerHTML = '';

        StepUI({ root, step });

        ControlsUI({
            root,
            step,
            onLink,
            onRandom,
            onRestart,
        });

        InfoUI({ root, totalSteps });
    };

    render();
};

stepperApp();
