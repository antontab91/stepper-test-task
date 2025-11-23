import type { State } from '../../store/state';
import type { Step, STEP_ID } from '../../schema/types';

interface Props {
    state: State;
    getStep: (id: STEP_ID) => Step;
}

const Info = ({ state, getStep }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'info-container';

    const { history, attempts, experience } = state;

    const totalSteps = history.length - 1;

    const trail = history.map((id) => getStep(id).title).join(' → ');

    const el = document.createElement('div');

    el.innerHTML = `
        <p>Пройдено кроків: <b>${totalSteps}</b></p>
        <p>Спроб: <b>${attempts}</b></p>
        <p>Досвід: <b>${experience}</b></p>
        <p>Історія: ${trail}</p>
        
    `;

    container.append(el);
    return container;
};

export default Info;
