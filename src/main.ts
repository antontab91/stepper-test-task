import { STEP_ID, type Step, type Link, type StepId } from './data/steps';

import StepUI from './ui/TopUI';
import InfoUI from './ui/InfoUI';
import ControlsUI from './ui/ControlsUI';

import {
    loadSteps,
    saveSteps,
    loadState,
    saveState,
    type PersistedState,
} from './store/db';

import rawSteps from './data/steps.json';

import './styles/index.css';

type State = PersistedState;

const INITIAL_STEPS: Step[] = rawSteps as Step[];

const createInitialState = (): State => ({
    currentStepId: STEP_ID.START,
    history: [STEP_ID.START],
});

export const App = async (): Promise<void> => {
    const root = document.getElementById('app');
    if (!root) throw new Error('root is undefined');

    const steps = await initSteps();
    let state = await initState();

    const getStep = (id: StepId): Step => {
        const step = steps.find((s) => s.id === id);
        if (!step) throw new Error(`Unknown step id: ${id}`);
        return step;
    };
    const updateState = (next: State): void => {
        state = next;
        state;
        render();
    };

    const goTo = (nextId: StepId): void => {
        updateState({
            currentStepId: nextId,
            history: [...state.history, nextId],
        });
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
        updateState(createInitialState());
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

async function initSteps(): Promise<Step[]> {
    try {
        const loaded = await loadSteps();
        if (loaded.length) return loaded;

        await saveSteps(INITIAL_STEPS);
        return INITIAL_STEPS;
    } catch (err) {
        console.warn(err);
        return INITIAL_STEPS;
    }
}

async function initState(): Promise<State> {
    try {
        const saved = await loadState();
        if (saved) return saved;
    } catch (err) {
        console.warn(err);
    }

    const initial = createInitialState();
    saveState(initial);
    return initial;
}
