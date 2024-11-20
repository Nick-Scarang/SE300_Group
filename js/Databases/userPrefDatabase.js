class UserPrefDatabase {
    constructor(canvasUrl, lateWorkPref, numTasks, doneDate, dataDisplay) {
        this.canvasUrl = canvasUrl;
        this.lateWorkPref = lateWorkPref;
        this.numTasks = numTasks;
        this.doneDate = doneDate;
        this.dataDisplay = dataDisplay;
    }

    setUrl(url) {
        this.canvasUrl = url;
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