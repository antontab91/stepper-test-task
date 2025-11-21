import { STEPS, STEP_ID } from './model/steps';
import type { Step, Link } from './model/steps';

import StepUI from './ui/TopUI';
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
    } catch (err) {
        console.warn('IndexedDB недоступен, используются дефолтные шаги', err);
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

    const onLink = (link: Link): void => {
        goTo(link.to);
    };

    const onRandom = (): void => {
        const step = getStep(state.currentStepId);
        if (!step.links.length) return;

        const index = Math.floor(Math.random() * step.links.length);
        goTo(step.links[index].to);
    };

    const onRestart = (): void => {
        state = createInitialState();
        render();
    };

    const render = (): void => {
        root.innerHTML = '';

        const step = getStep(state.currentStepId);

        const stepEl = StepUI({ step });
        const controlsEl = ControlsUI({ step, onLink, onRandom, onRestart });
        const infoEl = InfoUI({ totalSteps: state.history.length });

        root.append(stepEl, controlsEl, infoEl);
    };

    render();
};

App();
