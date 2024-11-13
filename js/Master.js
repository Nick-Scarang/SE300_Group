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
    initialize() {
        const CI = new CanvasInterface();
        const UI = new UserInterface(CI);
    }
}

// Load and initialize when the script is loaded (via manifest or as an entry point)
Master.main();
