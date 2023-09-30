export function getTimeUTC(hour: number): number {
    const time = new Date();
    time.setHours(hour, 0, 0, 0);

    // getTime returns milliseconds, we want seconds
    return time.getTime() / 1000; 
}
