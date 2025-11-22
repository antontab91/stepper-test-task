import { STEP_ID, type Step, type StepId } from './data/steps';

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

    const updateState = (next: State): void => {
        state = next;
        saveState(state);
        render();
    };

    const render = (): void => {
        root.innerHTML = '';

        const step = getStep({ id: state.currentStepId, steps });

        const stepEl = StepUI({ step });
        const controlsEl = ControlsUI({ step, state, updateState });
        const infoEl = InfoUI({ totalSteps: state.history.length });

        root.append(stepEl, controlsEl, infoEl);
    };

    render();
};

App();

async function initSteps(): Promise<Step[]> {
    let loaded: Step[] = [];

    try {
        loaded = await loadSteps();
    } catch (err) {
        console.warn(err);
    }

    if (loaded.length > 0) {
        return loaded;
    }

    saveSteps(INITIAL_STEPS);
    return INITIAL_STEPS;
}

async function initState(): Promise<State> {
    try {
        const saved = await loadState();
        if (saved) {
            return saved;
        }
    } catch (err) {
        console.warn(err);
    }

    const initial = createInitialState();
    saveState(initial);
    return initial;
}

export const getStep = ({ id, steps }: { id: StepId; steps: Step[] }): Step => {
    const step = steps.find((s) => s.id === id);
    if (!step) throw new Error(`Unknown step id: ${id}`);
    return step;
};
