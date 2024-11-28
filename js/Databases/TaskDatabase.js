class TaskDatabase {
    #tasks;
    constructor() {
        this.#tasks = [];  // Stores all the tasks
    }

    addAssignment(task) {
        if (task instanceof Task) {
            console.log(`Adding task: ${task.name}`);
            this.#tasks.push(task);  // Add task to the tasks array
        } else {
            console.error('Invalid task:', task);
        }
    }

    getTasks() {
        return this.#tasks;  // Return all tasks
    }
}
