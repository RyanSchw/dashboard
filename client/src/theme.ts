import { ThemeType } from 'grommet';

const SHARED_THEME: ThemeType = {
    global: {
        breakpoints: {
            // iPhone
            small: {
                value: 768,
                size: {
                    // sizes don't work for breakpoints
                },
            },
            // dashboard
            medium: {
                value: 1536,
                size: {
                    // sizes don't work for breakpoints
                },
            },
        },
        size: {
            xxsmall: '32px',
            xsmall: '48px',
            small: '96px',
            medium: '192px',
            large: '384px',
            xlarge: '768px',
            full: '100%',
        },
    },
};

export const DARK_THEME = {
    ...SHARED_THEME,
};

export const LIGHT_THEME = {
    ...SHARED_THEME,
};
