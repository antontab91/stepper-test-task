import { type Step, STEP_ID } from './schema/types';
import allSteps from './schema/steps.json';

import { loadSteps, saveSteps, loadState, saveState } from './store/db';
import { reduce, type State, type Action } from './store/state';

import TopContent from './components/TopContent';
import Info from './components/Info';
import Controls from './components/Controls';

import './styles/index.css';

const INITIAL_STEPS: Step[] = allSteps as Step[];
const USER_NAME_KEY = 'user-name';
export const App = async (): Promise<void> => {
    const root = document.getElementById('app');
    if (!root) throw new Error('root undefined');

    const userName = getUserName();
    const steps = await initSteps();
    let state = await initState(userName);

    const getStep = (id: STEP_ID): Step => {
        const step = steps.find((s) => s.id === id);
        if (!step) throw new Error(`Unknown id: ${id}`);
        return step;
    };

    const dispatch = (action: Action): void => {
        state = reduce(state, action);
        saveState(userName, state);
        render();
    };

    console.log(state);

    const render = (): void => {
        root.innerHTML = '';

        const step = getStep(state.currentStepId);

        const stepEl = TopContent({ step });
        const controlsEl = Controls({
            step,
            dispatch,
            isCanBack: state.history.length > 1,
        });
        const infoEl = Info({ state, getStep });

        root.append(stepEl, controlsEl, infoEl);
    };

    render();
};

App();

function getUserName(): string {
    const stored = localStorage.getItem(USER_NAME_KEY);
    if (stored && stored.trim() !== '') {
        return stored;
    }

    let name = '';

    while (!name) {
        const input = window.prompt('Введіть імʼя:') ?? '';
        name = input.trim();
    }

    localStorage.setItem(USER_NAME_KEY, name);
    return name;
}

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

    void saveSteps(INITIAL_STEPS);
    return INITIAL_STEPS;
}

async function initState(userName: string): Promise<State> {
    try {
        const saved = await loadState(userName);
        if (saved) {
            return saved;
        }
    } catch (err) {
        console.warn(err);
    }

    const initialState = createInitialState();
    saveState(userName, initialState);
    return initialState;
}
