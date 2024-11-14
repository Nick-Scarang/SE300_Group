class CourseDatabase {
    constructor() {
        this.courses = []; 
    }

    addCourse(courseName, lateWorkPolicy, gradeWeights) {
        const newCourse = new Course(courseName, lateWorkPolicy, gradeWeights);
        this.courses.push(newCourse);
    }

    deleteCourse(courseName) {
        this.courses = this.courses.filter(course => course.getCourseName() !== courseName);
    }

    getCourseByName(courseName) {
        return this.courses.find(course => course.getCourseName() === courseName) || null;
    }

    checkForExistingCourse(courseName) {
        return this.courses.some(course => course.getCourseName() === courseName) ? 1 : -1;
    }
}