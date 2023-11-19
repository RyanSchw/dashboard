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
                rows={['xsmall', 'flex', 'flex']}
                columns={['flex', 'flex', 'flex', 'flex', 'xsmall']}
                margin={{ horizontal: 'medium' }}
                gap={'small'}
                areas={[
                    ['header', 'header', 'header', 'header', 'header'],
                    ['placeholder1', 'placeholder1', 'weather', 'placeholder2', 'settings'],
                    ['placeholder3', 'placeholder4', 'placeholder4', 'placeholder2', 'settings'],
                ]}
            >
                <Header />
                <WeatherApp />
                <Placeholder />
                <SettingsBar />
            </Grid>
        </>
    );
}

export default Scene1;
