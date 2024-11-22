class UserInterface {
    constructor(Master) {
        this.Master = Master;
        this.accessToken = '';
        this.loadSavedData();
    }

    loadSavedData() {
        // Load the saved access token from chrome storage
        chrome.storage.local.get(['accessToken'], (result) => {
            if (result.accessToken) {
                this.accessToken = result.accessToken;
                this.showMainMenu(result.accessToken);  // Show Main Menu if token exists
            } else {
                this.showUserSetup();  // Show Setup screen if no token exists
            }
        });
    }

    showUserSetup() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create and display the User Setup UI
        new UserSetup(this.Master, this);
    }

    showMainMenu() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create and display the Main Menu UI
        new MainMenu(this.Master, this.accessToken, this);
    }

    showSyllabusUpload() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create and display the Syllabus Upload UI
        new SyllabusUpload(this.Master, this);
    }

    clearExistingUI() {
        // Clear previous UI screens
        const existingUserSetup = document.getElementById('userSetupContainer');
        if (existingUserSetup) {
            existingUserSetup.remove();
        }

        const existingMainMenu = document.getElementById('mainMenuContainer');
        if (existingMainMenu) {
            existingMainMenu.remove();
        }

        const existingSyllabusUpload = document.getElementById('syllabusUploadContainer');
        if (existingSyllabusUpload) {
            existingSyllabusUpload.remove();
        }
    }
}