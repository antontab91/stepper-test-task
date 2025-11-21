import type { Step } from '../data/steps';
import type { STEP_ID } from '../data/steps';

export interface PersistedState {
    currentStepId: STEP_ID;
    history: STEP_ID[];
}

const DB_NAME = 'stepper-db';
const STORE_STEPS = 'steps';
const STORE_STATE = 'state';

export const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);

        req.onupgradeneeded = () => {
            const db = req.result;

            if (!db.objectStoreNames.contains(STORE_STEPS)) {
                db.createObjectStore(STORE_STEPS, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORE_STATE)) {
                db.createObjectStore(STORE_STATE);
            }
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

export const loadSteps = async (): Promise<Step[]> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_STEPS, 'readonly');
        const store = tx.objectStore(STORE_STEPS);

        const req = store.getAll();

        req.onsuccess = () => resolve(req.result ?? []);
        req.onerror = () => reject(req.error);
    });
};

export const saveSteps = async (steps: Step[]): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_STEPS, 'readwrite');
        const store = tx.objectStore(STORE_STEPS);

        steps.forEach((step) => store.put(step));

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};

export const loadState = async (): Promise<PersistedState | null> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_STATE, 'readonly');
        const store = tx.objectStore(STORE_STATE);

        const req = store.get('gameState');

        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => reject(req.error);
    });
};

export const saveState = async (state: PersistedState): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_STATE, 'readwrite');
        const store = tx.objectStore(STORE_STATE);

        store.put(state, 'gameState');

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};
