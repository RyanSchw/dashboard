export function getTimeEpoch(hour: number): number {
    const time = new Date();
    time.setHours(hour, 0, 0, 0);

    // getTime returns milliseconds, we want seconds
    return time.getTime() / 1000; 
}

export function calculateScreenFriendlyTime(hour: number): string {
    let ampm = 'am';
    if (hour >= 12) {
        ampm = 'pm';
        if (hour > 12) {
            hour -= 12;
        }
    }
    // edge case for midnight
    if (hour === 0) {
        hour = 12;
    }
    return `${hour} ${ampm}`;
}
