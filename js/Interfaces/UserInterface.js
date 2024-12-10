class UserInterface {
    accessToken;
    canvasInterface;
    courseDatabase;
    userPrefDatabase;
    courseList;
    constructor(canvasInterface) {
        this.canvasInterface = canvasInterface;
        this.loadSavedData();
    }

    // Load saved data from Chrome storage
    loadSavedData() {
        chrome.storage.local.get(['accessToken', 'courseDatabase', 'userPrefDatabase'], (result) => {
            if (result.courseDatabase) {
                console.log('Found Course Database: ');
                console.table(result.courseDatabase);
                this.courseDatabase = new CourseDatabase();
                this.courseDatabase.loadSerializedData(result.courseDatabase);
            } else {
                console.log('Did not find Course Database, initializing a new one.');
                this.courseDatabase = new CourseDatabase();  // Default to a new course database if none found
            }

            if (result.userPrefDatabase) {
                console.log('Found saved User Preferences');
                this.userPrefDatabase = Object.assign(new UserPrefDatabase(), result.userPrefDatabase);
                console.table(this.userPrefDatabase);
            } else {
                console.log('Did not find any saved User Preferences');
                this.userPrefDatabase = new UserPrefDatabase();
                console.table(this.userPrefDatabase);
            }

            if (result.accessToken) {
                this.accessToken = result.accessToken;
                this.canvasInterface = new CanvasInterface(this.accessToken, this);
                this.canvasInterface.fetchCourses();
            } else {
                this.showUserSetup();
            }
        });
    }

    // Show user setup screen
    showUserSetup() {
        this.clearExistingUI();
        new UserSetup(this);
    }

    // Show the main menu screen
    showMainMenu() {
        this.clearExistingUI();
        new MainMenu(this.accessToken, this, this.courseDatabase, this.userPrefDatabase);
    }

    // Clear existing UI elements
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

    // Handle valid access token and fetch courses
    accessTokenFoundValid(courseList) {
        console.log('Token is valid and courses are fetched:', courseList);
        this.courseList = courseList;

        chrome.storage.local.set({accessToken: this.accessToken}, () => {
            console.log("Token saved successfully:", this.accessToken);
        });

        console.log('Fetching assignments...');
        this.canvasInterface.fetchAssignments();
    }

    // Handle invalid access token
    accessTokenFoundInvalid() {
        console.log('Token is invalid');
        this.showUserSetup();
    }

    // Save the user access token and fetch courses
    userTryingToSaveAccessToken(accessToken) {
        this.accessToken = accessToken;
        this.canvasInterface = new CanvasInterface(this.accessToken, this);
        this.canvasInterface.fetchCourses();
    }

    // Get the course database
    getCourseDatabase() {
        return this.courseDatabase;
    }

    // Get the user preferences database
    getUserPrefDatabase() {
        return this.userPrefDatabase;
    }

    // Set the course database and save it
    setCourseDatabase(courseDatabase) {
        this.courseDatabase = courseDatabase;
        this.saveCourseDatabase();
    }

    // Set the user preferences database and save it
    setUserPrefDatabase(userPrefDatabase) {
        this.userPrefDatabase = userPrefDatabase;
        this.saveUserPrefDatabase();
    }

    // Handle found assignments and update the course database
    foundAssignments(assignmentsList) {
        console.log('Assignments List:');
        console.table(assignmentsList);

        // Update the course database with the assignments
        this.updateCourseDatabase(assignmentsList);

        // Show the main menu
        this.showMainMenu();
    }

    // Handle missing assignments
    missingAssignments() {
        alert('Error finding all of the assignments.');
        this.showUserSetup();
    }

    // Update the course database with new or modified courses and their assignments
    updateCourseDatabase(assignmentsList) {
        let currentCourse = null;  // Track the current course

        assignmentsList.forEach(assignment => {
            console.log('Looking for course:', assignment.course);

            // Find the course by name from the course database
            currentCourse = this.courseDatabase.findCourseByName(assignment.course);
            console.log(this.courseDatabase.getAllCourses());

            // If the course is not found, create a new one
            if (currentCourse) {
                console.log(`Course found: ${currentCourse.getName()}`);
                console.log('Course visibility: ', currentCourse.getVisibility());
            } else {
                console.log(`Course not found. Creating new course: ${assignment.course}`);
                currentCourse = new Course(assignment.course);
                this.courseDatabase.addCourse(currentCourse);
            }
            if (!this.courseDatabase.doesThisCourseExist(assignment.course)) {
                currentCourse = this.courseDatabase.addCourseByName(assignment.course);
            }

            // Add the assignment to the current course
            console.log('Adding assignment to course:', currentCourse.getName());
            currentCourse.addAssignment({
                name: assignment.name,
                dueDate: assignment.due_date,
                taskType: assignment.taskType,
                gradeWeight: assignment.gradeWeight
            });
        });

        // Save the updated course database
        console.table(this.courseDatabase);
        this.saveCourseDatabase();
    }

    // Save the updated course database to Chrome storage
    saveCourseDatabase() {
        chrome.storage.local.set({courseDatabase: this.courseDatabase}, () => {
            console.log("Course database saved successfully");
        });
    }

    // Save the updated user preferences database to Chrome storage
    saveUserPrefDatabase() {
        chrome.storage.local.set({userPrefDatabase: this.userPrefDatabase}, () => {
            console.log("User preferences database saved successfully");
        });
    }
}