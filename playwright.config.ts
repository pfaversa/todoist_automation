import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    use: {
        headless: false,
        //viewport:
        actionTimeout: 15000,
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
    ],
}

export default config

//npx playwright test --config=playwright.config.ts --project=Chromium --reporter=line
//npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html
// npx playwright show-report