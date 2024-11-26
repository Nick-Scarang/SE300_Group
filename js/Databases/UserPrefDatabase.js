class UserPrefDatabase {
    constructor(lateWorkPref, numTasks, doneDate, dataDisplay) {
        this.lateWorkPref = lateWorkPref;
        this.numTasks = numTasks;
        this.doneDate = doneDate;
        this.dataDisplay = dataDisplay;
    }

    setLateWorkPref(lateWorkPref) {
        this.lateWorkPref = lateWorkPref;
    }

    setNumTasks(numTasks) {
        this.numTasks = numTasks;
    }

    setDoneDate(doneDate) {
        this.doneDate = doneDate;
    }

    setDataDisplay(dataDisplay) {
        this.dataDisplay = dataDisplay;
    }

    getUrl() {
        return this.canvasUrl;
    }

    getLateWorkPref() {
        return this.lateWorkPref;
    }

    getNumTasks() {
        return this.numTasks;
    }

    getDoneDate() {
        return this.doneDate;
    }

    getDataDisplay() {
        return this.dataDisplay;
    }
}