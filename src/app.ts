import { type Step, STEP_ID } from './types/step';
import allSteps from './data/steps.json';

import { loadSteps, saveSteps, loadState, saveState } from './store/db';
import { reduce, type State, type Action } from './store/state';

import StepUI from './components/TopUI';
import InfoUI from './components/InfoUI';
import ControlsUI from './components/ControlsUI';

import './styles/index.css';

const INITIAL_STEPS: Step[] = allSteps as Step[];

export const App = async (): Promise<void> => {
    const root = document.getElementById('app');
    if (!root) throw new Error('root undefined');

    const steps = await initSteps();
    let state = await initState();

    const getStep = (id: STEP_ID): Step => {
        const step = steps.find((s) => s.id === id);
        if (!step) throw new Error(`Unknown id: ${id}`);
        return step;
    };

    const dispatch = (action: Action): void => {
        state = reduce(state, action);
        saveState(state);
        render();
    };

    const render = (): void => {
        root.innerHTML = '';

        const step = getStep(state.currentStepId);

        const stepEl = StepUI({ step });
        const controlsEl = ControlsUI({
            step,
            dispatch,
            isCanBack: !!state.history.length,
        });
        const infoEl = InfoUI({ state, getStep });

        root.append(stepEl, controlsEl, infoEl);
    };

    render();
};

App();

function createInitialState(): State {
    return {
        currentStepId: STEP_ID.START,
        history: [STEP_ID.START],
        attempts: 0,
        experience: 0,
    };
}

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

    const initialState = createInitialState();
    saveState(initialState);
    return initialState;
}
