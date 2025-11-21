import type { Step, Link } from '../model/steps';
import { STEP_TYPE_MAP } from '../model/steps';

interface Props {
    root: HTMLElement;
    step: Step;
    onLink: (link: Link) => void;
    onRandom: () => void;
    onRestart: () => void;
}

const ControlsUI = ({
    root,
    step,
    onLink,
    onRandom,
    onRestart,
}: Props): void => {
    if (step.type === STEP_TYPE_MAP.BRANCH) {
        step.links?.forEach((link) => {
            const btn = document.createElement('button');
            btn.textContent = link.label;

            btn.onclick = () => onLink(link);
            root.append(btn);
        });
        return;
    }

    if (step.type === STEP_TYPE_MAP.RANDOM) {
        const btn = document.createElement('button');

        btn.className = 'btn';

        btn.textContent = 'Чекати відповідь компанії';

        btn.onclick = onRandom;
        root.append(btn);
        return;
    }

    if (step.type === STEP_TYPE_MAP.END) {
        const btn = document.createElement('button');

        btn.className = 'btn';
        btn.textContent = 'Почати новий квест';

        btn.onclick = onRestart;
        root.append(btn);
    }
};

export default ControlsUI;
