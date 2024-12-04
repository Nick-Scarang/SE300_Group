class MainMenu {
    accessToken;
    userInterface;
    courseDatabase;
    userPrefDatabase;
    formula;
    selectedCourses = [];
    tasksDisplayed = [];

    constructor(accessToken, userInterface, courseDatabase, userPrefDatabase) {
        console.log('MainMenu instantiated');

        this.accessToken = accessToken;
        this.userInterface = userInterface;
        this.courseDatabase = courseDatabase;
        this.userPrefDatabase = userPrefDatabase;
        this.formula = new Formula(CourseDatabase);

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

                <!-- Task List (Non-Collapsible) -->
                <div id="taskList">
                    <h3>Task List</h3>
                    <table id="taskTable" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr id="tableHeaders"></tr>
                        </thead>
                        <tbody id="taskTableBody"></tbody>
                    </table>
                </div>


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
                

                <!-- User Setup -->
                <details id="UserSetup">
                    <summary>User Setup:</summary>
                    <div>

                    <!-- Confirm Courses in User Setup -->
                    <details id="confirmCourses">
                        <summary>Confirm Courses:</summary>
                        <div>
                            <summary>Below are all your Canvas courses. We have</summary> 
                            <summary>preselected the courses we think you are </summary>
                            <summary>currently in. Please deselect the courses </summary>
                            <summary>you don't want and select the courses you do.</summary>
                            <div id = "courseContainer"></div>
                            <button id="saveSelectedCourses">Save Selected Courses</button>
                            <div id = "selectedCoursesOutput"></div>
                        </div>
                    </details>


                    <!-- Upload Syllabi in User Setup -->
                    <details id="UploadSyllabi">
                        <summary>Upload Syllabi:</summary>
                        <div>
                            <input type="file" id="fileInput" accept="image/*" />
                            <button id="processButton">Process Syllabus</button>
                            <div id="output"></div>
                            <div id="assignments"></div>
                        </div>
                    </details>


                    <!-- Late Work Preference in User Setup -->
                    <details id="menu4LateWork">
                        <summary>Late Work Preferences:</summary>
                        <div>
                            <button id="saveCourses">Save Courses</button>
                        </div>
                    </details>


                    <!-- Set Done Date in User Setup -->
                    <details id="doneDate">
                        <summary>Set Done Date:</summary>
                        <div id  = 'assignmentsContainer'></div>
                    </details>

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

        this.displayCourses();

        this.populateUserPreferences();
        this.addEventListeners();
        this.updateTaskList();
        this.displayAssignmentNames();
    }

    displayCourses() {
        const courseContainer = document.getElementById('courseContainer');
        let courses = this.courseDatabase.getAllCourses();
        if (!courses || courses.length === 0) {
            courseContainer.innerHTML = '<p>No courses found. Please refresh or check your API settings.</p>';
            return;
        }
        courseContainer.innerHTML = '';
        courses.forEach((course) => {
            const button = document.createElement('button');
            button.textContent = course.getName();
            button.classList.add('course-button');
            button.classList.toggle('selected', course.getVisibility());
            console.log('Set the course buttons toggle to: ', course.getVisibility());
            button.addEventListener('click', () => {
                button.classList.toggle('selected');
                course.toggleVisibility();
                console.log('Updated Course: ', course.getName());
            });
            courseContainer.appendChild(button);
        });
    }

    displayAssignmentNames(){
        const assignmentsContainer = document.getElementById('assignmentsContainer');

        if (this.tasksDisplayed.length === 0) {
            assignmentsContainer.innerHTML = '<p>No tasks displayed. Please update your task list.</p>';
            return;
        }

        assignmentsContainer.innerHTML = '';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save Changes';
        saveButton.classList.add('save-button');

        saveButton.addEventListener('click', () => { 
            const textboxes = document.querySelectorAll('.done-date-textbox'); // Select all textboxes by a common class
            textboxes.forEach((textbox, index) => {
                const newDoneDate = textbox.value.trim();
                if (newDoneDate) {
                    const task = this.tasksDisplayed[index]; // Match the task based on its index in tasksDisplayed
                    task.setDoneDate(newDoneDate); // Save the new done date to the task object
                    console.log(`Task updated with done date: ${newDoneDate}`);
                }
            });
            this.updateTaskList(); // Re-render the task list with updated data
        });

        assignmentsContainer.appendChild(saveButton);

        this.tasksDisplayed.forEach(task => {
            //new
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container');
            //new

            const label = document.createElement('label');
            label.textContent = task.getName() || `Assignment ${task.getId()}`; // Customize how you want to display task info
            label.classList.add('assignment-label');

            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.placeholder = 'MM/DD';
            textbox.classList.add('done-date-input');

            const initialDoneDate = task.getDoneDate();
            if (initialDoneDate){
                textbox.value = initialDoneDate;
            }

            textbox.addEventListener('change', (event) => {
                const newDoneDate = event.target.value;
                task.setDoneDate(newDoneDate); // Save the date in the task object
                //console.log(`Saved done date for task ${task.getId()}: ${newDoneDate}`); // Debugging log
            });

            taskContainer.appendChild(label);
            taskContainer.appendChild(textbox);

            // Append the label to the assignments container
            //assignmentsContainer.appendChild(label);
            assignmentsContainer.appendChild(taskContainer);
        });


    }


    addEventListeners() {
        document.getElementById('saveSelectedCourses').addEventListener('click', () => {
            this.saveData();
        });
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
        console.log('Populating the user preferences html elements.');
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
        this.updateTaskList();
        this.displayAssignmentNames();
    }

    saveData() {
        chrome.storage.local.set({
            accessToken: this.accessToken,
            courseDatabase: this.courseDatabase ? this.courseDatabase.getSerializedData() : null,
            userPrefDatabase: this.userPrefDatabase
        }, () => {
            console.log("Data saved to storage.");
        });
    }

    updateTaskList() {
        const numTasks = this.userPrefDatabase.getNumTasks();
        
        const tasks = this.courseDatabase.getTasks(); // Fetch all tasks

        let tasksToDisplay;

        // If no courses are selected, show all tasks
        if (this.selectedCourses.length === 0) {
            tasksToDisplay = tasks;
        } else {
            // Filter tasks by selected courses
            tasksToDisplay = tasks.filter(task => {
                return this.selectedCourses.some(course => course.name === task.getCourseName());
            });
        }

        this.tasksDisplayed = tasksToDisplay.slice(0, numTasks);

        const tableHeaders = document.getElementById('tableHeaders');
        const tableBody = document.getElementById('taskTableBody');
        const userPrefs = this.userPrefDatabase;

        // Clear existing table content
        tableHeaders.innerHTML = '';
        tableBody.innerHTML = '';

        // Generate table headers based on user preferences
        const headers = [];
        if (userPrefs.getPriorityNumBool()) headers.push('#');
        if (userPrefs.getTaskNameBool()) headers.push('Task');
        if (userPrefs.getCourseBool()) headers.push('Course');
        if (userPrefs.getDoneDateBool()) headers.push('Done Date');
        if (userPrefs.getProgressBool()) headers.push('Progress');
        if (userPrefs.getDueDateBool()) headers.push('Due Date');
        if (userPrefs.getWeightBool()) headers.push('Weight');

        // Create table header cells
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHeaders.appendChild(th);
        });
        const charLimit = 20;
        // Populate table rows with tasks
            //this.tasksDisplayed.forEach((task, index) => {
        tasksToDisplay.slice(0, numTasks).forEach((task, index) => {
            //tasksToDisplay.forEach((task, index) => {
            const tr = document.createElement('tr');

            headers.forEach(header => {
                const td = document.createElement('td');

                // Map header names to task properties dynamically
                let taskValue = '';
                switch (header) {
                    case '#':
                        taskValue =  (index + 1) || '';
                        break;
                    case 'Task':
                        taskValue = task.getName() || '';
                        break;
                    case 'Course':
                        taskValue = task.getCourseName() || '';
                        break;
                    case 'Done Date':
                        taskValue = task.getDoneDate() || ''; // If applicable
                        break;
                    case 'Progress':
                        taskValue = task.getProgress() || ''; // Assuming you have a progress property
                        break;
                    case 'Due Date':
                        taskValue = task.getDueDate() || '';
                        break;
                    case 'Weight':
                        taskValue = task.getGradeWeight() || '';
                        break;
                    default:
                        taskValue = ''; // Fallback if no matching property
                }
                if (taskValue.length > charLimit) {
                    taskValue = taskValue.substring(0, charLimit) + '...';  // Truncate and add ellipsis
                }

                td.textContent = taskValue;
                tr.appendChild(td);
            });

            tableBody.appendChild(tr);
        });
    }
}
