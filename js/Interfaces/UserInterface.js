class UserInterface {
    Master;
    accessToken;
    canvasInterface;
    courseDatabase;
    taskDatabase;
    userPrefDatabase;
    courseList;

    constructor(Master) {
        this.Master = Master;
        this.loadSavedData();
    }

    loadSavedData() {
        chrome.storage.local.get(['accessToken', 'courseDatabase', 'taskDatabase', 'userPrefDatabase'], (result) => {
            if (result.courseDatabase) {
                this.courseDatabase = Object.assign(new CourseDatabase(), result.courseDatabase);
            } else {
                this.courseDatabase = new CourseDatabase();
            }

            if (result.taskDatabase) {
                this.taskDatabase = Object.assign(new TaskDatabase(), result.taskDatabase);
            } else {
                this.taskDatabase = new TaskDatabase();
            }

            if (result.userPrefDatabase) {
                this.userPrefDatabase = Object.assign(new UserPrefDatabase(), result.userPrefDatabase);
            } else {
                this.userPrefDatabase = new UserPrefDatabase();
            }

            if (result.accessToken) {
                this.accessToken = result.accessToken;
                // Initialize CanvasInterface and pass callbacks for token validation
                this.canvasInterface = new CanvasInterface(this.accessToken, this);
                this.canvasInterface.fetchCourses();
            } else {
                this.showUserSetup();  // Show Setup if no token exists
            }
        });
    }

    showUserSetup() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create UserSetup UI
        new UserSetup(this.Master, this);
    }

    showMainMenu() {
        // Clear any existing UI
        this.clearExistingUI();
        // Create MainMenu UI
        new MainMenu(this.Master, this.accessToken, this);
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

    // Callback for valid token
    accessTokenFoundValid(courseList) {
        console.log('Token is valid and courses are fetched:', courseList);
        this.courseList = courseList;

        // Save the access token to chrome.storage after validation
        chrome.storage.local.set({ accessToken: this.accessToken }, () => {
            console.log("Token saved successfully:", this.accessToken);
        });

        // Show the main menu once the token is valid
        this.showMainMenu();
    }

    // Callback for invalid token
    accessTokenFoundInvalid() {
        console.log('Token is invalid');
        // Show the user setup UI to enter a new token
        this.showUserSetup();
    }

    userTryingToSaveAccessToken(accessToken) {
        // Initialize CanvasInterface with the new token and validate it
        this.accessToken = accessToken;
        this.canvasInterface = new CanvasInterface(this.accessToken, this);

        // Validate token via CanvasInterface
        this.canvasInterface.fetchCourses();  // This will trigger either accessTokenFoundValid or accessTokenFoundInvalid
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
    setCourseDatabase(courseDatabase){
        this.courseDatabase = courseDatabase;
    }
    setTaskDatabase(taskDatabase){
        this.taskDatabase = taskDatabase;
    }
    setUserPrefDatabase(userPrefDatabase){
        this.userPrefDatabase = userPrefDatabase;
    }
}
