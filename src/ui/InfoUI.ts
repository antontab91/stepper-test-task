interface Props {
    root: HTMLElement;
    totalSteps: number;
}

const InfoUI = ({ root, totalSteps }: Props): void => {
    const container = document.createElement('div');

    container.className = 'info-container';

    const row = document.createElement('div');
    row.className = 'info-row';

    row.textContent = `Пройдено кроків: ${totalSteps - 1}`;

    container.append(row);
    root.append(container);
};

export default InfoUI;
