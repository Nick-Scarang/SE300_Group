class Task {
    // Private fields
    name;
    dueDate;
    courseName;
    completionTime;
    taskType;
    gradeWeight;
    progress = 0;
    doneDate;

    // Initialize the Task with the necessary values
    initialize(name, dueDate, courseName, taskType, gradeWeight, progress = 0, doneDate = null) {
        this.name = name;  // Task name
        this.dueDate = dueDate;  // Task due date
        this.courseName = courseName;  // Associated course name
        this.completionTime = -1;  // Completion time (initially set to -1)
        this.taskType = taskType;  // Task type (assignment group name)
        this.gradeWeight = gradeWeight;

        if (progress !== null) {
            this.progress = progress;
        } else {
            this.progress = 0;
        }

        if (doneDate !== null) {
            this.doneDate = doneDate;
        } else {
            this.doneDate = this.dueDate;  // Default to dueDate if doneDate is not set
        }
    }

    // Method to load serialized data into an existing Task object
    loadSerializedData(data) {
        if (data) {
            if (data.name !== undefined) {
                this.name = data.name;
            }
            if (data.dueDate !== undefined) {
                this.dueDate = data.dueDate;
            }
            if (data.courseName !== undefined) {
                this.courseName = data.courseName;
            }
            if (data.completionTime !== undefined) {
                this.completionTime = data.completionTime;
            }
            if (data.taskType !== undefined) {
                this.taskType = data.taskType;
            }
            if (data.gradeWeight !== undefined) {
                this.gradeWeight = data.gradeWeight;
            }
            if (data.progress !== undefined) {
                this.progress = data.progress;
            } else {
                this.progress = 0;
            }
            if (data.doneDate !== undefined) {
                this.doneDate = data.doneDate;
            }
        }
    }

    // Getter for task name
    getName() {
        return this.name;
    }

    // Setter for task name
    setName(name) {
        this.name = name;
    }

    // Getter for due date
    getDueDate() {
        return this.dueDate;
    }

    // Setter for due date
    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    // Getter for course name
    getCourseName() {
        return this.courseName;
    }

    // Setter for course name
    setCourseName(courseName) {
        this.courseName = courseName;
    }

    // Getter for completion time
    getCompletionTime() {
        return this.completionTime;
    }

    // Setter for completion time
    setCompletionTime(time) {
        this.completionTime = time;
    }

    // Getter for task type
    getTaskType() {
        return this.taskType;
    }

    // Setter for task type
    setTaskType(taskType) {
        this.taskType = taskType;
    }

    // Getter for grade weight
    getGradeWeight() {
        return this.gradeWeight;
    }

    // Setter for grade weight
    setGradeWeight(gradeWeight) {
        this.gradeWeight = gradeWeight;
    }

    // Getter for progress
    getProgress() {
        return this.progress;
    }

    // Setter for progress
    setProgress(progress) {
        this.progress = progress;
    }

    // Getter for done date
    getDoneDate() {
        return this.doneDate;
    }

    // Setter for done date
    setDoneDate(doneDate) {
        this.doneDate = doneDate;
    }

    // Get the task details (all fields)
    getSerializedData() {
        return {
            name: this.name,
            dueDate: this.dueDate,
            courseName: this.courseName,
            completionTime: this.completionTime,
            taskType: this.taskType,
            gradeWeight: this.gradeWeight,
            progress: this.progress,
            doneDate: this.doneDate
        };
    }
}
