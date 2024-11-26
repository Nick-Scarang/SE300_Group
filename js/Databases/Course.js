class Course {
    constructor(courseName, lateWorkPolicy, gradeWeights) {
        this.courseName = courseName;
        this.lateWorkPolicy = lateWorkPolicy;
        this.gradeWeights = gradeWeights; 
    }

    setCourseName(courseName) {
        this.courseName = courseName;
    }

    setLateWorkPolicy(lateWorkPolicy) {
        this.lateWorkPolicy = lateWorkPolicy;
    }

    setGradeWeights(gradeWeights) {
        this.gradeWeights = gradeWeights;
    }

    getCourseName() {
        return this.courseName;
    }

    getLateWorkPolicy() {
        return this.lateWorkPolicy;
    }

    getGradeWeights() {
        return this.gradeWeights;
    }
}