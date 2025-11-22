import { STEP_TYPE, type Step } from '../types/step';
import { ActionType, type Action } from '../store/state';

interface Props {
    step: Step;
    dispatch: (action: Action) => void;
}

const ControlsUI = ({ step, dispatch }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'controls-container';

    switch (step.type) {
        case STEP_TYPE.BRANCH: {
            for (const link of step.links) {
                container.append(
                    createButton({
                        text: link.label,
                        onClick: () =>
                            dispatch({
                                type: ActionType.GO_TO,
                                id: link.to,
                            }),
                    })
                );
            }
            break;
        }

        case STEP_TYPE.RANDOM: {
            container.append(
                createButton({
                    text: 'Чекати відповідь компанії',
                    onClick: () =>
                        dispatch({
                            type: ActionType.RANDOM,
                            step,
                        }),
                })
            );
            break;
        }

        case STEP_TYPE.END: {
            container.append(
                createButton({
                    text: 'Заново',
                    onClick: () =>
                        dispatch({
                            type: ActionType.RESTART,
                        }),
                })
            );
            break;
        }

        default:
            break;
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
