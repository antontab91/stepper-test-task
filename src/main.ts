import { STEPS, STEP_ID } from './model/steps';
import type { Step, Link } from './model/steps';

import StepUI from './ui/StepUI';
import InfoUI from './ui/InfoUI';
import ControlsUI from './ui/ControlsUI';

import { loadSteps, saveSteps } from './store/db';

import './styles/index.css';

interface State {
    currentStepId: STEP_ID;
    history: STEP_ID[];
}

const createInitialState = (): State => ({
    currentStepId: STEP_ID.START,
    history: [STEP_ID.START],
});

export const App = async (): Promise<void> => {
    const root = document.getElementById('app');
    if (!root) throw new Error('root is undefined');

    let steps: Step[] = STEPS;

    try {
        const fromDb = await loadSteps();
        if (fromDb.length === 0) {
            await saveSteps(STEPS);
        } else {
            steps = fromDb;
        }
    } catch (e) {
        console.warn('IndexedDB недоступен, используются дефолтные шаги', e);
    }

    let state: State = createInitialState();

    const getStep = (id: STEP_ID): Step => {
        const step = steps.find((s) => s.id === id);
        if (!step) throw new Error(`Unknown step id: ${id}`);
        return step;
    };

    const goTo = (nextId: STEP_ID): void => {
        state = {
            currentStepId: nextId,
            history: [...state.history, nextId],
        };
        render();
    };

    const onLink = (link: Link): void => goTo(link.to);

    const onRandom = (): void => {
        const step = getStep(state.currentStepId);
        if (!step.links.length) return;

        const index = Math.floor(Math.random() * step.links.length);
        const randomLink = step.links[index];
        goTo(randomLink.to);
    };

    const onRestart = (): void => {
        state = createInitialState();
        render();
    };

    const stepContainer = document.createElement('div');
    const controlsContainer = document.createElement('div');
    const infoContainer = document.createElement('div');

    stepContainer.className = 'step-container';
    controlsContainer.className = 'controls-container';
    infoContainer.className = 'info-container';

    root.append(stepContainer, controlsContainer, infoContainer);

    const render = (): void => {
        const step = getStep(state.currentStepId);
        const totalSteps = state.history.length;

        stepContainer.innerHTML = '';
        controlsContainer.innerHTML = '';
        infoContainer.innerHTML = '';

        StepUI({ root: stepContainer, step });
        ControlsUI({
            root: controlsContainer,
            step,
            onLink,
            onRandom,
            onRestart,
        });
        InfoUI({ root: infoContainer, totalSteps });
    };

    render();
};

App();
