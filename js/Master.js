class Master {
    UI;
    static main() {
        const instance = new Master();
        instance.initialize();
    }
    initialize() {
        console.log("Master class initialized");
        this.UI = new UserInterface();
    }
}
Master.main();
