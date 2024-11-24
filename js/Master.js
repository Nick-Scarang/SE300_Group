class Master {
    CI;
    UI;

    constructor() {
        console.log("Master class instantiated");
    }

    static main() {
        // Initialize the app by creating an instance of Master
        const instance = new Master();
        instance.initialize();
    }

    initialize() {
        this.CI = new CanvasInterface();
        this.UI = new UserInterface(this);
        
    }

    checkToken() {
        // Implement logic to check if the token is valid
    }

    updateDatabases() {
        // Implement logic to update databases if necessary
    }

    getCanvasInterface() {
        return this.CI;
    }
}

// Load and initialize when the script is loaded
Master.main();