import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';

function DateTimeHeader() {
    const sharedTextSize = '2xl';
    const sharedFontWeight = 'bold';

    const [date, setDate] = useState(getDate());
    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(getDate());
            setTime(getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function getDate() {
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
        });
        return dateFormat.format(Date.now());
    }

    function getTime() {
        const timeFormat = new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
        });
        return timeFormat.format(Date.now());
    }

    return (
        <>
            <Text size={sharedTextSize} weight={sharedFontWeight}>
                {date}
            </Text>
            <Box flex/>
            <Text size={sharedTextSize} weight={sharedFontWeight} textAlign='end'>
                {time}
            </Text>
        </>
    );
}

export default DateTimeHeader;
