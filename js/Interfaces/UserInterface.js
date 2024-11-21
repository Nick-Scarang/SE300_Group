class UserInterface {
    Master;
    accessToken;
    constructor(Master) {
        this.Master = Master;
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
        new UserSetup(this.Master, this);
    }

    showMainMenu() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create MainMenu UI
        new MainMenu(this.Master, this.accessToken, this);
    }

    showSyllabusUpload() {
        this.clearExistingUI();
        new SyllabusUpload(this.Master, this);
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