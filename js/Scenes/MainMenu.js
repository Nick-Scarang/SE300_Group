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
                        <label for="numTasksField">Number of tasks:</label>
                        <input type="text" id="numTasksField"/>
                        <button id="saveUserPref">Save</button>
                    </div>
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
        this.addEventListeners();
    }
    addEventListeners(){
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
            // Get the value from the input field and trim any leading/trailing spaces
            const numTasksInput = document.getElementById('numTasksField').value.trim();
            const numTasksValue = parseInt(numTasksInput, 10);
            let numTasksValid = false;
            let dateValid = false;
            let lateWorkValid = false;
            let doneDateValid = false;

            // If the input is valid (not empty, a valid number, and greater than 0)
            if (numTasksInput !== '' && !isNaN(numTasksValue) && numTasksValue > 0 && numTasksValue.toString() === numTasksInput) {
                this.userPrefDatabase.setNumTasks(numTasksValue);
                numTasksValid = true;
            } else {
                alert("Please enter a valid number greater than 0 for the number of tasks.");
            }
            if (numTasksValid && dateValid && lateWorkValid && doneDateValid){
                this.saveUserPref();
                this.userPrefDatabase.setDate();
                this.userPrefDatabase.setLateWorkPref();
                this.userPrefDatabase.setDoneDate();
            }
        });



    }
    saveUserPref(){
        chrome.storage.local.set({ userPrefDatabase: this.userPrefDatabase }, () => {
        });
    }
    saveData(){
        chrome.storage.local.set({ accessToken: this.accessToken, courseDatabase: this.courseDatabase, taskDatabase: this.taskDatabase, userPrefDatabase: this.userPrefDatabase }, () => {
        });
    }
    updateTaskList(){
        this.formula = new formula(this.userPrefDatabase, this.taskDatabase)
    }
    isInteger(str) {
        const num = parseInt(str, 10); // Parse string to integer (base 10)
        return !isNaN(num) && num.toString() === str.trim(); // Ensure the number equals the string
    }
}
