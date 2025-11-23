import type { Step } from '../schema/types';
import type { State } from './state';

const DB_NAME = 'stepper-db';
const STORE_STEPS = 'steps';
const STORE_STATE = 'state';
export const USER_NAME_KEY = 'user-name';

const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_STEPS)) {
                db.createObjectStore(STORE_STEPS, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORE_STATE)) {
                db.createObjectStore(STORE_STATE);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

export const loadSteps = async (): Promise<Step[]> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STEPS, 'readonly');
        const store = transaction.objectStore(STORE_STEPS);

        const request = store.getAll();

        request.onsuccess = () => resolve(request.result ?? []);
        request.onerror = () => reject(request.error);
    });
};

export const saveSteps = async (steps: Step[]): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STEPS, 'readwrite');
        const store = transaction.objectStore(STORE_STEPS);

        steps.forEach((step) => store.put(step));

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};

export const loadState = async (userName: string): Promise<State | null> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STATE, 'readonly');
        const store = transaction.objectStore(STORE_STATE);

        const request = store.get(userName);

        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error);
    });
};

export const saveState = async (
    userName: string,
    state: State
): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STATE, 'readwrite');
        const store = transaction.objectStore(STORE_STATE);

        store.put(state, userName);

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};
