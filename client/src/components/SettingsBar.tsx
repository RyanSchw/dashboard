import React, { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';

function SettingsBar() {
    return (
        <Box gridArea='settings'>
            <div style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'grey',
            }} />
        </Box>
    );
}

export default SettingsBar;
