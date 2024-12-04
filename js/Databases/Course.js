class Course {
    name;
    assignmentGroups;
    taskDatabase;
    visibility = true;

    // Initialize a course with its name (and optionally other properties)
    constructor(name) {
        this.name = name;
        this.taskDatabase = new TaskDatabase();
        this.assignmentGroups = [];
    }

    // Add an assignment to the course
    addAssignment(assignment) {
        console.table(this.taskDatabase);
        // Add the assignment to the TaskDatabase
        if (assignment && assignment.name) {
            console.log(`Adding assignment: ${assignment.name} to course: ${this.name}`);

            const task = new Task();
            task.initialize(assignment.name, assignment.dueDate, this.name, assignment.taskType, assignment.gradeWeight);
            this.taskDatabase.addAssignment(task);  // Add the task to the course's task database
            this.addAssignmentGroup(assignment.taskType, assignment.gradeWeight);  // Add assignment group to the course
        } else {
            console.error('Invalid assignment:', assignment);
        }
    }

    // Add or update an assignment group
    addAssignmentGroup(taskType, gradeWeight) {
        let groupExists = false;  // Flag to track if the group already exists

        // Iterate over assignmentGroups to check if the taskType already exists
        for (let i = 0; i < this.assignmentGroups.length; i++) {
            if (this.assignmentGroups[i].taskType === taskType) {
                console.log(`Assignment group ${taskType} already exists. Updating weight.`);
                this.assignmentGroups[i].gradeWeight = gradeWeight;  // Update the existing group's gradeWeight
                groupExists = true;  // Set the flag to true since we found a matching group
                break;  // Exit the loop as we found the match
            }
        }

        // If no matching group was found, add a new assignment group
        if (!groupExists) {
            console.log(`Adding new assignment group: ${taskType}`);
            this.assignmentGroups.push({ taskType, gradeWeight });
        }
    }

    // Get tasks from the TaskDatabase
    getTasks() {
        return this.taskDatabase.getTasks();  // Get tasks from the task database
    }

    // Get assignment groups for the course
    getAssignmentGroups() {
        return this.assignmentGroups;
    }

    // Get course name
    getName() {
        return this.name;
    }

    // Get course visibility status
    getVisibility() {
        return this.visibility;
    }

    // Set course visibility status
    setVisibility(bool) {
        this.visibility = bool;
    }

    // Toggle course visibility status
    toggleVisibility() {
        this.visibility = !this.visibility;
    }

    // Serialize the course data for saving
    getSerializedData() {
        let serializedAssignmentGroups = [];
        for (let i = 0; i < this.assignmentGroups.length; i++) {
            serializedAssignmentGroups.push({
                taskType: this.assignmentGroups[i].taskType,
                gradeWeight: this.assignmentGroups[i].gradeWeight
            });
        }

        return {
            name: this.name,
            assignmentGroups: serializedAssignmentGroups,
            taskDatabase: this.taskDatabase.getSerializedData(),  // Serialize taskDatabase
            visibility: this.visibility
        };
    }

    // Load serialized data into the course instance
    loadSerializedData(data) {
        this.name = data.name || '';  // Set name, default to empty string if not present
        this.assignmentGroups = data.assignmentGroups || [];  // Set assignmentGroups, default to empty array if not present
        this.taskDatabase = new TaskDatabase();  // Create a new TaskDatabase
        this.taskDatabase.loadSerializedData(data.taskDatabase);  // Load serialized data into taskDatabase
        this.visibility = data.visibility // Set visibility, default to true if not present
    }
}
