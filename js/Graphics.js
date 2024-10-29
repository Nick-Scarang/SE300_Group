class Graphics {
    constructor() {
        this.loadSavedData();
    }

    loadSavedData() {
        chrome.storage.local.get(['outputText'], (result) => {
            if (result.outputText) {
                this.showMainMenu(result.outputText);
            } else {
                this.showUserSetup();
            }
        });
    }

    showUserSetup() {
        // Clear any existing UI
        this.clearExistingUI();

        new UserSetup((inputText) => {
            this.showMainMenu(inputText);
        });
    }

    showMainMenu(outputText) {
        // Clear any existing UI
        this.clearExistingUI();

        new MainMenu(outputText, () => {
            this.showUserSetup();
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