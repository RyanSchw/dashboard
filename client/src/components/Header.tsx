import React from 'react';
import { Box, Button, Text, Toolbar } from 'grommet';
import DateTimeHeader from './DateTimeHeader';
import { SettingsOption } from 'grommet-icons';

function Header() {
  return (
    <Box gridArea='header' flex direction='row' align='center' justify='between'>
        <DateTimeHeader />
        <Toolbar justify='end'>
            <Button icon={<SettingsOption />} />
        </Toolbar>
    </Box>
  );
};

export default Header;
