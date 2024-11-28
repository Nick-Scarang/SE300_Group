class Task {
    // Private fields
    #name;
    #dueDate;
    #courseName;
    #completionTime;
    #taskType;
    #gradeWeight;
    #progress;
    #doneDate;

    constructor(name, dueDate, courseName, taskType, gradeWeight) {
        this.#name = name;  // Task name
        this.#dueDate = dueDate;  // Task due date
        this.#courseName = courseName;  // Associated course name
        this.#completionTime = -1;  // Completion time (initially set to -1)
        this.#taskType = taskType;  // Task type (assignment group name)
        this.#gradeWeight = gradeWeight;  // Grade weight (from assignment group)
    }

    // Getter for task name
    getName() {
        return this.#name;
    }

    // Setter for task name
    setName(name) {
        this.#name = name;
    }

    // Getter for due date
    getDueDate() {
        return this.#dueDate;
    }

    // Setter for due date
    setDueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    // Getter for course name
    getCourseName() {
        return this.#courseName;
    }

    // Setter for course name
    setCourseName(courseName) {
        this.#courseName = courseName;
    }

    // Getter for completion time
    getCompletionTime() {
        return this.#completionTime;
    }

    // Setter for completion time
    setCompletionTime(time) {
        this.#completionTime = time;
    }

    // Getter for task type
    getTaskType() {
        return this.#taskType;
    }

    // Setter for task type
    setTaskType(taskType) {
        this.#taskType = taskType;
    }

    // Getter for grade weight
    getGradeWeight() {
        return this.#gradeWeight;
    }

    // Setter for grade weight
    setGradeWeight(gradeWeight) {
        this.#gradeWeight = gradeWeight;
    }
    getProgress(){
        return this.#progress;
    }
    setProgress(progress){
        this.#progress = progress;
    }
    getDoneDate(){
        return this.#doneDate;
    }
    setDoneDate(doneDate){
        this.#doneDate = doneDate;
    }
    // Get the task details (all fields)
    getTaskDetails() {
        return {
            name: this.#name,
            dueDate: this.#dueDate,
            courseName: this.#courseName,
            completionTime: this.#completionTime,
            taskType: this.#taskType,
            gradeWeight: this.#gradeWeight
        };
    }
}
