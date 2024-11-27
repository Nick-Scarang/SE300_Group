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
                this.courseDatabase = Object.assign(new CourseDatabase(), result.courseDatabase);
            } else {
                this.courseDatabase = new CourseDatabase();
            }
            if(result.taskDatabase){
                this.taskDatabase = Object.assign(new TaskDatabase(), result.taskDatabase);
            } else {
                this.taskDatabase = new TaskDatabase();
            }
            if(result.userPrefDatabase){
                this.userPrefDatabase = Object.assign(new UserPrefDatabase(), result.userPrefDatabase);
                console.log('Found instantiation of UserPrefDatabase in saved data');
                console.table(this.userPrefDatabase);
            } else {
                this.userPrefDatabase = new UserPrefDatabase();
                console.log('Instantiated UserPrefDatabase from UI');
                console.table(this.userPrefDatabase);
            }
            if (result.accessToken) {
                this.accessToken = result.accessToken;
                this.showMainMenu();  // Show Main Menu
            } else {
                this.showUserSetup();  // Show Setup if no token exists
            }
            console.log(result)
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
        console.log('Instantiated MainMenu from UI');
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
    getCourseDatabase(){
        return this.courseDatabase;
    }
    getTaskDatabase(){
        return this.taskDatabase;
    }
    getUserPrefDatabase(){
        return this.userPrefDatabase;
    }
    setCourseDatabase(courseDatabse){
        this.courseDatabase = courseDatabse;
    }
    setTaskDatabase(taskDatabase){
        this.taskDatabase = taskDatabase;
    }
    setUserPrefDatabase(userPrefDatabase){
        this.userPrefDatabase = userPrefDatabase;
    }
}
