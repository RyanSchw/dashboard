import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Down, Moon, Sun, Up } from 'grommet-icons';

function SettingsBar() {
    return (
        <Box gridArea='settings'>
            <Box border align='center'>
                <Box margin={{ top:'small', bottom: 'xsmall' }}>
                    <Sun />
                </Box>
                <Button icon={<Up />} disabled />
                <Button icon={<Down />} disabled />
            </Box>

            <Box margin='xsmall' />

            <Box border align='center'>
                <Button icon={<Moon />} disabled />
            </Box>


        </Box>
    );
}

export default SettingsBar;
