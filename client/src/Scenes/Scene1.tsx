import React from 'react';

import WeatherApp from '../Widgets/WeatherApp';
import { Grid } from 'grommet';
import Introduction from '../components/Introduction';
import SettingsBar from '../components/SettingsBar';
import Header from '../components/Header';
import Placeholder from '../components/Placeholder';

function Scene1() {
    return (
        <>
            <Grid
                rows={['xsmall', 'xsmall', '312px']}
                columns={['flex', 'flex', 'flex', 'xsmall']}
                margin={'medium'}
                gap={'small'}
                areas={[
                    ['header', 'header', 'header', 'header'],
                    ['introduction', 'introduction', 'introduction', 'settings'],
                    ['placeholder1', 'weather', 'placeholder2', 'settings'],
                ]}
            >
                <Header />
                <Introduction />
                <WeatherApp />
                <Placeholder />
                <SettingsBar />
            </Grid>
        </>
    );
}

export default Scene1;
