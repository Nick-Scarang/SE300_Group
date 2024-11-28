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
    initialize() {
        this.CI = new CanvasInterface();

        this.CI.fetchCourses().then(() => {
            console.log('Courses fetched:', this.CI.courses);
            const userInterface = new UserInterface(this.CI);
            userInterface.showMainMenu();
        });
    }
}

// Load and initialize when the script is loaded (via manifest or as an entry point)
Master.main();
