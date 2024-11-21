class UserSetup {
    Master;
    accessToken;
    constructor(Master, userInterface) {
        this.Master = Master;
        this.userInterface = userInterface;
        this.render();
    }

    render() {
        // Clear previous content
        const existingContainer = document.getElementById('userSetupContainer');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Create elements
        const userSetupHTML = `
            <div id="userSetupContainer">
                <h2>User Setup</h2>
                <input type="text" id="inputField" placeholder="Enter canvas API access token..." />
                <input type="text" id="savedField" placeholder="Previous entry" readonly />
                <button id="saveButton">Save</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', userSetupHTML);

        // Load saved data to display in the saved field
        chrome.storage.local.get(['accessToken'], (result) => {
            if (result.accessToken) {
                document.getElementById('savedField').value = result.accessToken;
            }
        });

        // Add event listener for the save button
        document.getElementById('saveButton').addEventListener('click', () => this.saveData());
    }

    saveData() {
        const inputText = document.getElementById('inputField').value;

        if (inputText) {
            // Save the data to chrome.storage
            chrome.storage.local.set({ accessToken: inputText }, () => {
                this.accessToken = inputText;
                // Switch to MainMenu after saving
                this.userInterface.showMainMenu();
                // Optionally, trigger any further actions after saving the token
                this.Master.getCanvasInterface().fetchCourses();
            });
        } else {
            alert("Please enter a value.");
        }
    }
}