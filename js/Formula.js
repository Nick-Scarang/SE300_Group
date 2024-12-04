class Formula {
    courseDatabase;

    constructor(courseDatabase) {
        this.courseDatabase = courseDatabase;
    }

    getTaskList(numTasks) {
        let assignments = []
        let courses = this.courseDatabase.getAllCourses();
        for (let i = 0; i < courses.length; i++) {
            assignments.concat(courses[i].getTasks());
        }

    }
}