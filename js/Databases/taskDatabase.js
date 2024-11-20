class TaskDatabase {
    constructor() {
        this.tasks = []; 
    }

    addTask(taskName, dueDate, course, compTime, taskType) {
        const newTask = new Task(taskName, dueDate, course, compTime, taskType);
        this.tasks.push(newTask);
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter(task => task.getTaskName() !== taskName);
    }

    getTaskByNameAndCourse(taskName, course) {
        return this.tasks.find(task => task.getTaskName() === taskName && task.getCourse() === course) || null;
    }

    getAllTasks() {
        return this.tasks;
    }

    checkForExistingTask(taskName, course) {
        return this.tasks.some(task => task.getTaskName() === taskName && task.getCourse() === course) ? 1 : -1;
    }
}