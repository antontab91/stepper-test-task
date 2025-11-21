import type { Step, Link } from '../model/steps';
import { STEP_TYPE } from '../model/steps';

interface Props {
    step: Step;
    onLink: (link: Link) => void;
    onRandom: () => void;
    onRestart: () => void;
}

const ControlsUI = ({
    step,
    onLink,
    onRandom,
    onRestart,
}: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'controls-container';

    switch (step.type) {
        case STEP_TYPE.BRANCH: {
            step.links.forEach((link) => {
                container.append(
                    createButton({
                        text: link.label,
                        onClick: () => onLink(link),
                        className: 'btn',
                    })
                );
            });
            break;
        }

        case STEP_TYPE.RANDOM: {
            container.append(
                createButton({
                    text: 'Чекати відповідь компанії',
                    onClick: onRandom,
                    className: 'btn',
                })
            );
            break;
        }

        case STEP_TYPE.END: {
            container.append(
                createButton({
                    text: 'Почати заново',
                    onClick: onRestart,
                    className: 'btn',
                })
            );
            break;
        }
    }

    return container;
};
function createButton({
    text,
    onClick,
    className,
}: {
    text: string;
    onClick: () => void;
    className: string;
}): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = className;
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
}

export default ControlsUI;
