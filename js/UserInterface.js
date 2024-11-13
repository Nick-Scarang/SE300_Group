class UserInterface {
    CI;
    constructor(CI) {
        this.CI = CI;
        this.loadSavedData();

    }

    loadSavedData() {
        chrome.storage.local.get(['accessToken'], (result) => {
            if (result.accessToken) {
                this.showMainMenu(result.accessToken);
            } else {
                this.showUserSetup();
            }
        });
    }

    showUserSetup() {
        // Clear any existing UI
        this.clearExistingUI();

        new UserSetup((inputText) => {
            this.showMainMenu(inputText, CI);
        });
    }

    showMainMenu(outputText) {
        // Clear any existing UI
        this.clearExistingUI();

        new MainMenu(outputText, () => {
            this.showUserSetup(CI);
        });
    }

    clearExistingUI() {
        const existingUserSetup = document.getElementById('userSetupContainer');
        if (existingUserSetup) {
            existingUserSetup.remove();
        }

        const existingMainMenu = document.getElementById('mainMenuContainer');
        if (existingMainMenu) {
            existingMainMenu.remove();
        }
    }

}