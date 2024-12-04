class Formula {
    courseDatabase;
    dueDatePriority = 3;  // Higher priority (lower number = higher priority)
    completionTimePriority = 2;
    gradeWeightPriority = 4;
    progressPriority = 1;
    doneDatePriority = 0;

    constructor(courseDatabase) {
        this.courseDatabase = courseDatabase;
    }

    // Method to get the prioritized list of tasks
    getTaskList(numTasks) {
        let assignments = [];
        let courses = this.courseDatabase.getAllCourses();
        let seenAssignments = new Set();  // To track duplicate assignments

        // Collect all tasks from all courses
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].getVisibility()) {
                courses[i].getTasks().forEach((assignment) => {
                    // Use assignment name or ID to ensure no duplicates
                    if (!seenAssignments.has(assignment.name)) {
                        assignments.push(assignment);
                        seenAssignments.add(assignment.name); // Mark this assignment as added
                    }
                });
            }
        }

        // Assign points to each task based on the attributes
        assignments.forEach((assignment) => {
            assignment.points = this.assignPoints(assignment); // Assign points to each task
        });

        // Prioritize tasks based on the points assigned
        assignments = this.prioritizeTasks(assignments);

        // Return the requested number of tasks
        return assignments.slice(0, numTasks);
    }

    // Method to assign points to an assignment based on its attributes
    assignPoints(assignment) {
        let points = 0;

        // Due Date Points: Closer due dates get higher points
        if (assignment.due_date !== "N/A" && assignment.due_date !== null) {
            const dueDate = new Date(assignment.due_date);
            const now = new Date();
            const timeDifference = dueDate - now;
            const timeInDays = timeDifference / (1000 * 3600 * 24); // Convert to days

            // Assign points based on how close the due date is
            if (timeInDays <= 0) {
                points += 0; // Overdue tasks
            } else if (timeInDays <= 7) {
                points += 50; // Due within a week
            } else if (timeInDays <= 30) {
                points += 30; // Due within a month
            } else {
                points += 10; // Due later
            }
        }

        // Completion Time Points: Shorter completion times get more points
        if (assignment.completionTime !== null) {
            if (assignment.completionTime <= 60) {
                points += 40; // Tasks that take less than 1 hour
            } else if (assignment.completionTime <= 120) {
                points += 30; // Tasks that take 1-2 hours
            } else if (assignment.completionTime <= 240) {
                points += 20; // Tasks that take 2-4 hours
            } else {
                points += 10; // Longer tasks
            }
        }

        // Grade Weight Points: Higher grade weight gets more points
        if (assignment.gradeWeight !== null) {
            points += Math.min(assignment.gradeWeight * 5, 50); // Max out at 50 points for higher grade weight
        }

        // Progress Points: Higher progress means higher points
        if (assignment.progress !== null) {
            points += Math.min(assignment.progress * 2, 50); // Max out at 50 points for 100% progress
        }

        // Done Date Points: Closer done date gets more points
        if (assignment.doneDate !== null) {
            const doneDate = new Date(assignment.doneDate);
            const now = new Date();
            const timeDifference = doneDate - now;
            const timeInDays = timeDifference / (1000 * 3600 * 24); // Convert to days

            // Assign points based on how close the done date is
            if (timeInDays <= 0) {
                points += 0; // Past done date
            } else if (timeInDays <= 7) {
                points += 50; // Done within a week
            } else if (timeInDays <= 30) {
                points += 30; // Done within a month
            } else {
                points += 10; // Further done dates
            }
        }

        return points;
    }

    // Method to prioritize tasks based on their points (higher points = higher priority)
    prioritizeTasks(assignments) {
        return assignments.sort((a, b) => {
            return b.points - a.points; // Sort in descending order of points
        });
    }
}
