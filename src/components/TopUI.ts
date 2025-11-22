import type { Step } from '../data/steps';

interface Props {
    step: Step;
}

const TopUI = ({ step }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'step-container';

    const title = document.createElement('h2');
    title.textContent = step.title;

    const text = document.createElement('p');
    text.textContent = step.text;

    container.append(title, text);
    return container;
};

export default TopUI;
