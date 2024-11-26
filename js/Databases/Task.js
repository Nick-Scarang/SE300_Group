class Task {
    constructor(taskName, dueDate, course, compTime, taskType) {
        this.taskName = taskName;        
        this.dueDate = dueDate;           
        this.course = course;             
        this.compTime = compTime;         
        this.taskType = taskType;         
    }

    setTaskName(taskName) {
        this.taskName = taskName;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setCourse(course) {
        this.course = course;
    }

    setCompTime(compTime) {
        this.compTime = compTime;
    }

    setTaskType(taskType) {
        this.taskType = taskType;
    }

    getTaskName() {
        return this.taskName;
    }

    getDueDate() {
        return this.dueDate;
    }

    getCourse() {
        return this.course;
    }

    getCompTime() {
        return this.compTime;
    }

    getTaskType() {
        return this.taskType;
    }
}
