import type { State } from '../../store/state';
import { type Step, type STEP_ID, STEP_TYPE } from '../../schema/types';

import styles from './info.module.css';

export const INFO_LABEL = {
    STEPS: 'Пройдено кроків: ',
    ATTEMPTS: 'Спроб: ',
    EXPERIENCE: 'Досвід: ',
    HISTORY: 'Історія: ',
} as const;

interface Props {
    state: State;
    getStep: (id: STEP_ID) => Step;
}

const Info = ({ state, getStep }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = styles.container;

    const { history, attempts, experience } = state;

    const totalSteps = history.length - 1;

    const trail = history
        .map((id, i, arr) => {
            const title = getStep(id).title;
            if (i > 0 && getStep(arr[i - 1]).type === STEP_TYPE.RANDOM) {
                return `[Рандом] ${title}`;
            }
            return title;
        })
        .join(' --> ');

    const rows = [
        { label: INFO_LABEL.STEPS, value: totalSteps },
        { label: INFO_LABEL.ATTEMPTS, value: attempts },
        { label: INFO_LABEL.EXPERIENCE, value: experience },
        { label: INFO_LABEL.HISTORY, value: trail },
    ];

    rows.forEach(({ label, value }) => {
        const row = document.createElement('div');
        const labelEl = document.createElement('span');
        const valueEl = document.createElement('span');

        row.className =
            label === INFO_LABEL.HISTORY ? styles.rowHistory : styles.row;

        valueEl.className = styles.value;
        labelEl.className = styles.label;

        labelEl.textContent = label;
        valueEl.textContent = String(value);

        row.append(labelEl, valueEl);
        container.append(row);
    });

    return container;
};

export default Info;
