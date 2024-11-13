class UserInterface {
    CI;
    accessToken;
    constructor(CI) {
        this.CI = CI;
        this.loadSavedData();
    }

    loadSavedData() {
        chrome.storage.local.get(['accessToken'], (result) => {
            if (result.accessToken) {
                this.accessToken = result.accessToken;
                this.showMainMenu(result.accessToken);  // Show Main Menu
            } else {
                this.showUserSetup();  // Show Setup if no token exists
            }
        });
    }

    showUserSetup() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create UserSetup UI without passing showMainMenu directly
        new UserSetup(this.CI, this);
    }

    showMainMenu() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create MainMenu UI
        new MainMenu(this.CI, this.accessToken, this);
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
