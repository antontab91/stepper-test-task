import { STEP_TYPE, type Step } from '../../schema/types';
import { ActionType, type Action } from '../../store/state';

import styles from './сontrols.module.css';

interface Props {
    step: Step;
    dispatch: (action: Action) => void;
    isCanBack: boolean;
}

const Controls = ({ step, dispatch, isCanBack }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = styles.container;

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
                    text: 'Чекати відповідь',
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

    if (isCanBack) {
        container.append(
            createButton({
                text: 'Назад',
                onClick: () =>
                    dispatch({
                        type: ActionType.BACK,
                    }),
            })
        );
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

export default Controls;
