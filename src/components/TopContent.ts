import type { Step } from '../schema/types';

interface Props {
    step: Step;
}

const TopContent = ({ step }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'step-container';

    const title = document.createElement('h2');
    title.textContent = step.title;

    const text = document.createElement('p');
    text.textContent = step.text;

    const btn = document.createElement('button');
    btn.textContent = 'Змінити імʼя';
    btn.onclick = () => {
        const name = prompt('Введіть нове імʼя:');
        if (!name) return;
        localStorage.setItem('user-name', name.trim());
        location.reload();
    };

    container.append(btn, title, text);
    return container;
};

export default TopContent;
