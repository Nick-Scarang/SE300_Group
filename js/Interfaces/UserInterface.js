class UserInterface {
    accessToken;
    canvasInterface;
    courseDatabase;
    userPrefDatabase;
    courseList;

    constructor() {
        this.loadSavedData();
    }

    loadSavedData() {
        chrome.storage.local.get(['accessToken', 'courseDatabase', 'userPrefDatabase'], (result) => {
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

    showUserSetup() {
        this.clearExistingUI();
        new UserSetup(this);
    }

    showMainMenu() {
        this.clearExistingUI();
        new MainMenu(this.accessToken, this);
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

    accessTokenFoundValid(courseList) {
        console.log('Token is valid and courses are fetched:', courseList);
        this.courseList = courseList;

        chrome.storage.local.set({ accessToken: this.accessToken }, () => {
            console.log("Token saved successfully:", this.accessToken);
        });

        console.log('Fetching assignments...');
        this.canvasInterface.fetchAssignments();
    }

    accessTokenFoundInvalid() {
        console.log('Token is invalid');
        this.showUserSetup();
    }

    userTryingToSaveAccessToken(accessToken) {
        this.accessToken = accessToken;
        this.canvasInterface = new CanvasInterface(this.accessToken, this);
        this.canvasInterface.fetchCourses();
    }

    getCourseDatabase() {
        return this.courseDatabase;
    }

    getUserPrefDatabase() {
        return this.userPrefDatabase;
    }

    setCourseDatabase(courseDatabase) {
        this.courseDatabase = courseDatabase;
        this.saveCourseDatabase();
    }

    setTaskDatabase(taskDatabase) {
        this.taskDatabase = taskDatabase;
        this.saveTaskDatabase();
    }

    setUserPrefDatabase(userPrefDatabase) {
        this.userPrefDatabase = userPrefDatabase;
        this.saveUserPrefDatabase();
    }

    foundAssignments(assignmentsList) {
        console.log('AssignmentsList: ');
        console.table(assignmentsList);

        // Call the updateCourseDatabase method to update the course database with the assignments
        this.updateCourseDatabase(assignmentsList);

        // Then show the main menu
        this.showMainMenu();
    }

    missingAssignments() {
        alert('Error finding all of the assignments.');
        this.showUserSetup();
    }

    // Update the course database with new or modified courses and their assignments
    updateCourseDatabase(assignmentsList) {
        let currentCourseName = null;
        let currentCourse = null;  // Keep track of the current course

        assignmentsList.forEach(assignment => {
            console.log('Looking for course:', assignment.course);  // Verify course name

            // If the course is different, handle it
            if (assignment.course !== currentCourseName) {
                console.log('Moving to another course...');
                currentCourseName = assignment.course;

                // Find the course by name from the course database
                currentCourse = this.courseDatabase.findCourseByName(assignment.course);

                // If the course is not found, create a new one and add it to the CourseDatabase
                if (!currentCourse) {
                    console.log(`Course not found. Creating new course: ${assignment.course}`);
                    currentCourse = new Course(assignment.course);  // Create new Course instance
                    this.courseDatabase.addCourse(currentCourse);  // Add the new course to the database
                } else {
                    console.log(`Course found: ${currentCourse.name}`);
                }
            }

            // Now add the assignment to the course
            console.log('Adding assignment to course:', currentCourse.getName());

            // Add the assignment using the `addAssignment` method on the Course instance
            currentCourse.addAssignment({
                name: assignment.name,
                dueDate: assignment.due_date,
                taskType: assignment.taskType,
                gradeWeight: assignment.gradeWeight
            });

            console.log('Assignment:', assignment);
        });

        // After updating the courses, save the course database
        console.table(this.courseDatabase); // Verify the updated state of the CourseDatabase
        this.saveCourseDatabase();
    }

    // Save the updated course database to chrome storage
    saveCourseDatabase() {
        chrome.storage.local.set({ courseDatabase: this.courseDatabase }, () => {
            console.log("Course database saved successfully");
        });
    }

    saveUserPrefDatabase() {
        chrome.storage.local.set({ userPrefDatabase: this.userPrefDatabase }, () => {
            console.log("User preferences database saved successfully");
        });
    }
}
