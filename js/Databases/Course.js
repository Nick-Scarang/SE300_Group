class Course {
    #name;
    #assignmentGroups;
    #taskDatabase;
    #visibility = true;

    constructor(name) {
        this.#name = name;
        this.#assignmentGroups = [];  // Stores task type and weight
        this.#taskDatabase = new TaskDatabase(); // Each course has its own TaskDatabase
    }

    addAssignment(assignment) {
        console.table(this.#taskDatabase);
        // Add the assignment to the TaskDatabase
        if (assignment && assignment.name) {
            console.log(`Adding assignment: ${assignment.name} to course: ${this.#name}`);

            const task = new Task(assignment.name, assignment.dueDate, this.#name, assignment.taskType, assignment.gradeWeight);
            this.#taskDatabase.addAssignment(task);  // Add the task to the course's task database
            this.addAssignmentGroup(assignment.taskType, assignment.gradeWeight);  // Add assignment group to the course
        } else {
            console.error('Invalid assignment:', assignment);
        }
    }

    addAssignmentGroup(taskType, gradeWeight) {
        const existingGroup = this.#assignmentGroups.find(group => group.taskType === taskType);
        if (existingGroup) {
            console.log(`Assignment group ${taskType} already exists. Updating weight.`);
            existingGroup.gradeWeight = gradeWeight;
        } else {
            console.log(`Adding new assignment group: ${taskType}`);
            this.#assignmentGroups.push({ taskType, gradeWeight });
        }
    }

    // Get tasks from the TaskDatabase
    getTasks() {
        return this.#taskDatabase.getTasks();  // Get tasks from the task database
    }

    getAssignmentGroups() {
        return this.#assignmentGroups;
    }

    getName() {
        return this.#name;
    }
    getVisibility(){
        return this.#visibility;
    }
    setVisibility(bool){
        this.#visibility = bool;
    }
    toggleVisibility(){
        this.#visibility = !this.#visibility;
    }
}