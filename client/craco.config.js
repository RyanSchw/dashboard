// https://stackoverflow.com/a/68017931

const path = require("path");
const enableImportsFromExternalPaths = require("./buildHelpers/enableImportsFromExternalPaths");

// Paths to the code you want to use
const sharedLibOne = path.resolve(__dirname, "../types");
// const sharedLibTwo = path.resolve(__dirname, "../shared-lib-2/src");

module.exports = {
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({ webpackConfig }) => {
                    enableImportsFromExternalPaths(webpackConfig, [
                        // Add the paths here
                        sharedLibOne,
                        // sharedLibTwo,
                    ]);
                    return webpackConfig;
                },
            },
        },
    ],
};
