import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 1,
    use: {
        headless: false,
        viewport:{width:1728,height:900},
        video: 'off',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use:{browserName: 'chromium'},
        },
        {
            name: 'Firefox',
            use:{browserName: 'firefox'},
        },
        {
            name: 'Webkit',
            use: {browserName: 'webkit'},
        },
        {
            name: 'SmokeChromium',
            use: {browserName: 'chromium', headless: true},
        },
        {
            name: 'SmokeFirefox',
            use: {browserName: 'firefox', headless: true},
        },        {
            name: 'SmokeWebkit',
            use: {browserName: 'webkit', headless: true},
        },
    ],
    
}

export default config
