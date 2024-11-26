class UserInterface {
    Master;
    accessToken;
    courseDatabase;
    taskDatabase;
    userPrefDatabase;
    constructor(Master) {
        this.Master = Master;
        this.loadSavedData();
    }

    loadSavedData() {
        chrome.storage.local.get(['accessToken', 'courseDatabase', 'taskDatabase', 'userPrefDatabase'], (result) => {
            if(result.courseDatabase){
                this.courseDatabase = result.courseDatabase;
            }
            if(result.taskDatabase){
                this.taskDatabase = result.taskDatabase;
            }
            if(result.userPrefDatabase){
                this.userPrefDatabase = result.userPrefDatabase;
            }
            if (result.accessToken) {
                this.accessToken = result.accessToken;
                this.showMainMenu();  // Show Main Menu
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
        new MainMenu(this.Master, this.accessToken, this, this.courseDatabase, this.taskDatabase, this.userPrefDatabase);
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
