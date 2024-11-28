class Master {
    UI;
    CI;
    static main() {
        const instance = new Master();
        instance.initialize();
    }
    initialize() {
        console.log("Master class initialized");
        this.CI = new CanvasInterface();
        this.CI.fetchCourses().then(() => {
            console.log('Courses fetched:', this.CI.courses);
            const userInterface = new UserInterface(this.CI);
            userInterface.showMainMenu();
        });
        this.UI = new UserInterface();
    }
}
Master.main();
