import { STEP_TYPE, STEP_ID, type Step, type StepId } from '../data/steps';
import type { PersistedState } from '../store/db';

interface Props {
    step: Step;
    state: PersistedState;
    updateState: (next: PersistedState) => void;
}

const ControlsUI = ({ step, state, updateState }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'controls-container';

    const handleSetStep = (nextId: StepId, resetHistory = false): void => {
        updateState({
            currentStepId: nextId,
            history: resetHistory ? [nextId] : [...state.history, nextId],
        });
    };

    const handleRandom = (): void => {
        if (!step.links.length) return;

        const randomLink =
            step.links[Math.floor(Math.random() * step.links.length)];

        handleSetStep(randomLink.to);
    };

    switch (step.type) {
        case STEP_TYPE.BRANCH: {
            for (const link of step.links) {
                container.append(
                    createButton({
                        text: link.label,
                        onClick: () => handleSetStep(link.to),
                    })
                );
            }
            break;
        }

        case STEP_TYPE.RANDOM: {
            container.append(
                createButton({
                    text: 'Чекати відповідь компанії',
                    onClick: handleRandom,
                })
            );
            break;
        }

        case STEP_TYPE.END: {
            container.append(
                createButton({
                    text: 'Заново',
                    onClick: () => handleSetStep(STEP_ID.START, true),
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
}: {
    text: string;
    onClick: () => void;
}): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
}

export default ControlsUI;
