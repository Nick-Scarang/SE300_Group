class Master {
    UI;
    CI;
    static main() {
        const instance = new Master();
        instance.initialize();
    }

    initialize() {
        console.log("Master class initialized");
        this.UI = new UserInterface();
        this.CI = new CanvasInterface(this);
        this.CI.fetchCourses().then(() => {
            console.log('Courses fetched:', this.CI.courses);
            this.UI.showMainMenu();
        });
    }

    getCanvasInterface(){
        return this.CI;
    }
}
Master.main();
