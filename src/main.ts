import { STEP_ID } from './data/steps';
import type { Step, Link } from './data/steps';

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

import stepsSeed from './data/steps.json';

import './styles/index.css';

export const App = async (): Promise<void> => {
    const root = document.getElementById('app');
    if (!root) throw new Error('root is undefined');

    let steps: Step[] = [];

    try {
        steps = await loadSteps();
    } catch (err) {
        console.warn('Не удалось загрузить шаги из IndexedDB', err);
    }

    if (!steps.length) {
        steps = stepsSeed as Step[];
        try {
            await saveSteps(steps);
        } catch (err) {
            console.warn('Не удалось сохранить шаги в IndexedDB', err);
        }
    }

    const getStep = (id: STEP_ID): Step => {
        const step = steps.find((s) => s.id === id);
        if (!step) throw new Error(`Unknown step id: ${id}`);
        return step;
    };

    const createDefaultState = (): PersistedState => ({
        currentStepId: STEP_ID.START,
        history: [STEP_ID.START],
    });

    const ensureState = async (): Promise<PersistedState> => {
        try {
            const saved = await loadState();
            if (saved) return saved;

            const initial = createDefaultState();
            await saveState(initial);
            return initial;
        } catch (err) {
            console.warn('Не удалось загрузить state, создаём дефолтный', err);
            const fallback = createDefaultState();
            await saveState(fallback);
            return fallback;
        }
    };

    const saveAndRender = async (next: PersistedState): Promise<void> => {
        await saveState(next);
        render();
    };

    const goTo = async (nextId: STEP_ID): Promise<void> => {
        const state = await ensureState();
        const next: PersistedState = {
            currentStepId: nextId,
            history: [...state.history, nextId],
        };
        await saveAndRender(next);
    };

    const onLink = (link: Link): void => {
        goTo(link.to);
    };

    const onRandom = async (): Promise<void> => {
        const state = await ensureState();
        const step = getStep(state.currentStepId);

        if (!step.links.length) return;

        const index = Math.floor(Math.random() * step.links.length);
        const nextId = step.links[index].to;

        await goTo(nextId);
    };

    const onRestart = async (): Promise<void> => {
        const initial = createDefaultState();
        await saveAndRender(initial);
    };

    const render = async (): Promise<void> => {
        const state = await ensureState();

        root.innerHTML = '';

        const step = getStep(state.currentStepId);

        const stepEl = StepUI({ step });
        const controlsEl = ControlsUI({
            step,
            onLink,
            onRandom: () => onRandom(),
            onRestart: () => onRestart(),
        });
        const infoEl = InfoUI({ totalSteps: state.history.length });

        root.append(stepEl, controlsEl, infoEl);
    };

    render();
};

App();
