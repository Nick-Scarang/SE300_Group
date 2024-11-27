class MainMenu {
    master;
    accessToken;
    userInterface;
    courseDatabase;
    taskDatabase;
    userPrefDatabase;
    formula;

    constructor(master, accessToken, userInterface) {
        this.accessToken = accessToken;
        this.master = master;
        this.userInterface = userInterface;
        // Check and initialize courseDatabase if necessary
        this.courseDatabase = this.userInterface.getCourseDatabase();
        if (this.courseDatabase == null) {
            this.courseDatabase = new CourseDatabase();
            this.userInterface.setCourseDatabase(this.courseDatabase);
        }

        // Check and initialize taskDatabase if necessary
        this.taskDatabase = this.userInterface.getTaskDatabase();
        if (this.taskDatabase == null) {
            this.taskDatabase = new TaskDatabase();
            this.userInterface.setTaskDatabase(this.taskDatabase);
        }

        // Check and initialize userPrefDatabase if necessary
        this.userPrefDatabase = this.userInterface.getUserPrefDatabase();
        if (this.userPrefDatabase == null) {
            this.userPrefDatabase = new UserPrefDatabase();
            console.log('Instantiated UserPrefDatabase from MainMenu')
            this.userInterface.setUserPrefDatabase(this.userPrefDatabase);
        }
        this.saveData();
        this.render();
    }

    render() {
        // Clear previous content
        const existingContainer = document.getElementById('mainMenuContainer');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Insert HTML for Main Menu with collapsible sections
        const mainMenuHTML = `
            <div id="mainMenuContainer">
                <h2>Main Menu</h2>

                <!-- Collapsible Menu 1 -->
                <details id="menu1">
                    <summary>Menu 1</summary>
                    <div>
                        <label for="menu1AccessToken">Access Token:</label>
                        <input type="text" id="menu1AccessToken" value="${this.accessToken}" />
                        <button id="menu1SaveButton">Save</button>
                    </div>
                </details>

                <!-- Collapsible Menu 2 -->
                <details id="menu2">
                    <summary>Menu 2</summary>
                    <div>
                        <label for="menu2AccessToken">Access Token:</label>
                        <input type="text" id="menu2AccessToken" value="${this.accessToken}" />
                        <button id="menu2SaveButton">Save</button>
                    </div>
                </details>

                <!-- Collapsible Menu 3 -->
                <details id="menu3">
                    <summary>User Preferences:</summary>
                    <div>
                        <p>Please select the number of tasks you would like to be displayed:</p>
                        <input type="text" id="numTasksField"/>
                    </div>
                    <div>
                        <p>Please select the fields you would like to display in your task list:</p>
                        <label>
                            <input type="checkbox" id="priorityNumCheck" />
                            Priority Number
                        </label><br>
                        <label>
                            <input type="checkbox" id="taskNameCheck" />
                            Task Name
                        </label><br>
                        <label>
                            <input type="checkbox" id="courseNameCheck" />
                            Course Name
                        </label><br>
                        <label>
                            <input type="checkbox" id="doneDateCheck" />
                            Done Date
                        </label><br>
                        <label>
                            <input type="checkbox" id="progressCheck" />
                            Progress
                        </label><br>
                        <label>
                            <input type="checkbox" id="dueDateCheck" />
                            Due Date
                        </label><br>
                        <label>
                            <input type="checkbox" id="weightCheck" />
                            Weight
                        </label><br>
                    </div>
                
                    <div>
                        <p>Would you like to display completed assignments?</p>
                        <label for="completedAssignmentsToggle">No</label>
                        <input type="checkbox" id="completedAssignmentsToggle" />
                        <label for="completedAssignmentsToggle">Yes</label>
                    </div>
                
                    <div>
                        <p>Please select which types of tasks you would like to display:</p>
                        <label>
                            <input type="checkbox" id="examsCheck" />
                            Exams
                        </label><br>
                        <label>
                            <input type="checkbox" id="homeworkCheck" />
                            Homework
                        </label><br>
                        <label>
                            <input type="checkbox" id="essayCheck" />
                            Essays
                        </label><br>
                        <label>
                            <input type="checkbox" id="allCheck" />
                            All Tasks
                        </label><br>
                    </div>
                
                    <button id="saveUserPref" style="margin-top: 20px;">Save</button>
                </details>
                

                <!-- Collapsible Menu 4 -->
                <details id="menu4">
                    <summary>Upload Syllabus</summary>
                    <div>
                <input type="file" id="fileInput" accept="image/*" />
                <button id="processButton">Process Syllabus</button>
                <div id="output"></div>
                <div id="assignments"></div>
                    </div>
                </details>

                <!-- Collapsible Menu 5 -->
                <details id="menu5">
                    <summary>Your Canvas API Access Token:</summary>
                    <div>
                        <label for="menu5AccessToken">Access Token:</label>
                        <input type="text" id="menu5AccessToken" value="${this.accessToken}" readonly/>
                        <button id="editButton">To User Setup Scene</button>
                    </div>
                </details>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mainMenuHTML);
        this.populateUserPreferences();
        this.addEventListeners();
    }

    addEventListeners() {
        // Add event listener for the edit button
        document.getElementById('editButton').addEventListener('click', () => {
            // On edit button click, go to user setup without causing a loop
            this.userInterface.showUserSetup();
        });

        document.getElementById('processButton').addEventListener('click', async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                try {
                    const assignments = await TesseractHandler.processImage(file);

                    if (assignments && assignments.length > 0) {
                        document.getElementById('output').textContent = "Extracted Text:";
                        document.getElementById('assignments').innerHTML = assignments
                            .map((a) => `<p>${a.assignment}: ${a.weight}%</p>`)
                            .join('');
                    } else {
                        document.getElementById('output').textContent = "No assignments found in the image.";
                    }
                } catch (error) {
                    console.error("Error processing the syllabus:", error);
                    document.getElementById('output').textContent = "Failed to process the image.";
                }
            } else {
                alert("Please select a file.");
            }
        });
        document.getElementById('saveUserPref').addEventListener('click', () => {
            const numTasksInput = document.getElementById('numTasksField').value.trim();
            const numTasksValue = parseInt(numTasksInput, 10);
            let numTasksValid = false;

            if (numTasksInput !== '' && !isNaN(numTasksValue) && numTasksValue > 0 && numTasksValue.toString() === numTasksInput) {
                this.userPrefDatabase.setNumTasks(numTasksValue);
                numTasksValid = true;
            } else {
                alert("Please enter a valid number greater than 0 for the number of tasks.");
            }

            if (numTasksValid) {
                // Set the boolean values from the checkboxes
                this.userPrefDatabase.setPriorityNumBool(document.getElementById('priorityNumCheck').checked);
                this.userPrefDatabase.setTaskNameBool(document.getElementById('taskNameCheck').checked);
                this.userPrefDatabase.setCourseBool(document.getElementById('courseNameCheck').checked);
                this.userPrefDatabase.setDoneDateBool(document.getElementById('doneDateCheck').checked);
                this.userPrefDatabase.setProgressBool(document.getElementById('progressCheck').checked);
                this.userPrefDatabase.setDueDateBool(document.getElementById('dueDateCheck').checked);
                this.userPrefDatabase.setWeightBool(document.getElementById('weightCheck').checked);
                this.userPrefDatabase.setCompletedAssignmentsBool(document.getElementById('completedAssignmentsToggle').checked);
                this.userPrefDatabase.setExamsBool(document.getElementById('examsCheck').checked);
                this.userPrefDatabase.setHomeworkBool(document.getElementById('homeworkCheck').checked);
                this.userPrefDatabase.setEssayBool(document.getElementById('essayCheck').checked);
                this.userPrefDatabase.setAllBool(document.getElementById('allCheck').checked);

                // Optionally call saveUserPref() or similar function
                this.saveUserPref();
            }
        });




    }
    populateUserPreferences() {
        // Set the number of tasks using the getter
        document.getElementById('numTasksField').value = this.userPrefDatabase.getNumTasks();

        // Set checkbox values based on user preferences using getters
        document.getElementById('priorityNumCheck').checked = this.userPrefDatabase.getPriorityNumBool();
        document.getElementById('taskNameCheck').checked = this.userPrefDatabase.getTaskNameBool();
        document.getElementById('courseNameCheck').checked = this.userPrefDatabase.getCourseBool();
        document.getElementById('doneDateCheck').checked = this.userPrefDatabase.getDoneDateBool();
        document.getElementById('progressCheck').checked = this.userPrefDatabase.getProgressBool();
        document.getElementById('dueDateCheck').checked = this.userPrefDatabase.getDueDateBool();
        document.getElementById('weightCheck').checked = this.userPrefDatabase.getWeightBool();

        document.getElementById('completedAssignmentsToggle').checked = this.userPrefDatabase.getCompletedAssignmentsBool();

        document.getElementById('examsCheck').checked = this.userPrefDatabase.getExamsBool();
        document.getElementById('homeworkCheck').checked = this.userPrefDatabase.getHomeworkBool();
        document.getElementById('essayCheck').checked = this.userPrefDatabase.getEssayBool();
        document.getElementById('allCheck').checked = this.userPrefDatabase.getAllBool();
    }
    saveUserPref() {
        chrome.storage.local.set({userPrefDatabase: this.userPrefDatabase}, () => {
            console.log("Saving User Preferences...")
            console.table(this.userPrefDatabase);
        });
    }

    saveData() {
        chrome.storage.local.set({
            accessToken: this.accessToken,
            courseDatabase: this.courseDatabase,
            taskDatabase: this.taskDatabase,
            userPrefDatabase: this.userPrefDatabase
        }, () => {
        });
    }

    updateTaskList() {
        this.formula = new Formula(this.userPrefDatabase, this.taskDatabase)
    }

    isInteger(str) {
        const num = parseInt(str, 10); // Parse string to integer (base 10)
        return !isNaN(num) && num.toString() === str.trim(); // Ensure the number equals the string
    }
}
