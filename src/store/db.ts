import type { Step } from '../model/steps';

const DB_NAME = 'stepper-db';
const STORE = 'steps';

export const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);

        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE, { keyPath: 'id' });
            }
        };

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

export const loadSteps = async (): Promise<Step[]> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const store = tx.objectStore(STORE);

        const req = store.getAll();

        req.onsuccess = () => resolve(req.result ?? []);
        req.onerror = () => reject(req.error);
    });
};

export const saveSteps = async (steps: Step[]): Promise<void> => {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        const store = tx.objectStore(STORE);

        steps.forEach((step) => store.put(step));

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};
