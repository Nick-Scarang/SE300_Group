class TaskDatabase {
    tasks;

    constructor() {
        this.tasks = []; // Initialize an empty array of tasks
    }

    // Add a new task to the database
    addAssignment(task) {
        if (task instanceof Task) {
            console.log(`Adding task: ${task.name}`);
            this.tasks.push(task);  // Add task to the tasks array
        } else {
            console.error('Invalid task:', task);
        }
    }

    // Get all tasks in the database
    getTasks() {
        return this.tasks;  // Return all tasks
    }

    // Serialize all tasks in the database for saving
    getSerializedData() {
        let serializedTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
            serializedTasks.push(this.tasks[i].getSerializedData());  // Serialize each task
        }
        return { tasks: serializedTasks };  // Return serialized tasks as an object
    }

    // Load serialized data into the TaskDatabase
    loadSerializedData(data) {
        if (data && data.tasks) {
            for (let i = 0; i < data.tasks.length; i++) {
                let taskData = data.tasks[i];
                let task = new Task();  // Create a new empty Task
                task.loadSerializedData(taskData);  // Load the serialized data into the task
                this.tasks.push(task);  // Add the task to the database
            }
        }
    }
}
