import React from 'react';
import { Box, Button, Text, Toolbar } from 'grommet';
import DateTimeHeader from './DateTimeHeader';
import { SettingsOption } from 'grommet-icons';

function Placeholder() {
  return (
    <>
        <Box gridArea='placeholder1' skeleton round>
        </Box>
        <Box gridArea='placeholder2' skeleton round>
        </Box>
    </>
  );
};

export default Placeholder;
