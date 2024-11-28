class Master {
    constructor() {
        // Constructor logic, if necessary
        console.log("Master class instantiated");
    }

    static main() {
        // Create an instance of Master (just once)
        const instance = new Master();

        // Perform any initialization logic for the app
        instance.initialize();
    }

    // Example method to initialize the application
    CI;
    UI;
    initialize() {
        this.CI = new CanvasInterface();
        this.UI = new UserInterface(this);

        this.CI.fetchCourses().then(() => {
            console.log('Courses fetched:', this.CI.courses);
            this.UI.showMainMenu();
        });
    }
    checkToken(){

    }
    updateDatabases(){

    }
    getCanvasInterface(){
        return this.CI;
    }
}

// Load and initialize when the script is loaded (via manifest or as an entry point)
Master.main();
