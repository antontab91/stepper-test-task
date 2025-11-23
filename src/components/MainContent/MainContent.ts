import type { Step } from '../../schema/types';
import { USER_NAME_KEY } from '../../app-constants';

import styles from './mainContent.module.css';

interface Props {
    step: Step;
}

const MainContent = ({ step }: Props): HTMLElement => {
    const container = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const btn = document.createElement('button');

    container.className = styles.container;
    title.className = styles.title;
    description.className = styles.description;
    btn.className = styles.button;

    title.textContent = step.title;
    description.textContent = step.text;

    btn.textContent = 'Змінити юзера';

    btn.onclick = () => {
        const name = prompt('Введіть нове імʼя:');
        if (!name) return;

        localStorage.setItem(USER_NAME_KEY, name.trim());
        location.reload();
    };

    container.append(btn, title, description);
    return container;
};

export default MainContent;
