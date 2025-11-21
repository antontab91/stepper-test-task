interface Props {
    totalSteps: number;
}

const InfoUI = ({ totalSteps }: Props): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'info-container';

    const row = document.createElement('div');
    row.className = 'info-row';
    row.textContent = `Пройдено кроків: ${totalSteps - 1}`;

    container.append(row);
    return container;
};

export default InfoUI;
