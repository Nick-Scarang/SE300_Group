class CourseDatabase {
    #courses;

    constructor() {
        this.#courses = []; // Array of Course objects
    }

    // Find a course by name
    findCourseByName(courseName) {
        let returnedCourse;
        for (let i = 0; i < this.#courses.length; i++) {
            if (this.#courses[i].getName() === courseName) {
                returnedCourse = this.#courses[i];
            }
        }
        return returnedCourse;
    }

    // Add a new course to the database
    addCourse(course) {
        this.#courses.push(course); // Add a new course to the courses array
    }

    // Optionally: List all courses (for debugging)
    listCourses() {
        console.table(this.#courses); // Logs all courses to the console in table format
    }

    // Method to get tasks from all courses or from a specific course
    getTasks(courseName = null) {
        if (courseName) {
            // If a course name is provided, return tasks from that specific course
            const course = this.findCourseByName(courseName);
            return course ? course.getTasks() : [];
        } else {
            // If no course name is provided, return tasks from all courses
            let allTasks = [];
            this.#courses.forEach(course => {
                allTasks = allTasks.concat(course.getTasks()); // Concatenate tasks from each course
            });
            return allTasks;
        }
    }
}
