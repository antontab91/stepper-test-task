import type { Step } from '../model/steps';

interface Props {
    root: HTMLElement;
    step: Step;
}

const StepUI = ({ root, step }: Props): void => {
    const title = document.createElement('h2');
    title.textContent = step.title;

    const text = document.createElement('p');
    text.textContent = step.text;

    root.append(title, text);
};

export default StepUI;
