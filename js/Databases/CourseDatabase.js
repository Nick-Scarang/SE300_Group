class CourseDatabase {
    courses;

    constructor() {
        this.courses = [];
    }

    // Find a course by name
    findCourseByName(courseName) {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].getName() === courseName) {
                return this.courses[i];
            }
        }
        return null;  // If no course is found, return null
    }

    // Add an existing course to the database
    addCourse(course) {
        this.courses.push(course);
        return course; // Add a new course to the courses array
    }

    // Create and add a new course by name to the database
    addCourseByName(name) {
        let course = new Course(name);
        this.courses.push(course);
        return course;
    }

    // Optionally: List all courses (for debugging)
    listCourses() {
        console.table(this.courses); // Logs all courses to the console in table format
    }

    // Get tasks from all courses or from a specific course
    getTasks(courseName = null) {
        if (courseName) {
            // If a course name is provided, return tasks from that specific course
            const course = this.findCourseByName(courseName);
            return course ? course.getTasks() : [];
        } else {
            // If no course name is provided, return tasks from all courses
            let allTasks = [];
            this.courses.forEach(course => {
                allTasks = allTasks.concat(course.getTasks()); // Concatenate tasks from each course
            });
            return allTasks;
        }
    }

    // Return all courses
    getAllCourses() {
        return this.courses;
    }
    // Check if a course exists by name
    doesThisCourseExist(name) {
        for (let i = 0; i < this.courses.length; i++) {
            if (this.courses[i].getName() === name) {
                return true;
            }
        }
        return false;
    }

    // Serialize the course database to a format that can be saved
    getSerializedData() {
        let serializedCourses = [];
        for (let i = 0; i < this.courses.length; i++) {
            serializedCourses.push(this.courses[i].getSerializedData());  // Serialize each course
        }
        return { courses: serializedCourses };
    }

    // Load serialized data into the course database
    loadSerializedData(data) {
        if (data && data.courses) {
            for (let i = 0; i < data.courses.length; i++) {
                console.log('This is the information about course ', data.courses[i].name);
                console.table(data.courses[i]);
                let tempCourse = new Course(data.courses[i].name);
                tempCourse.loadSerializedData(data.courses[i]);
                this.courses.push(tempCourse);
            }
        }
    }
}