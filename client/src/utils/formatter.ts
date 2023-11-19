export function screenTemperature(dataTemperature: number): string {
    if (dataTemperature === -1) {
        return '';
    }

    return `${Math.round(dataTemperature)}°F`;
}
