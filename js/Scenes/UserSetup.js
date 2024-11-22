class UserSetup {
    Master;
    accessToken;

    constructor(Master, userInterface) {
        this.Master = Master;
        this.userInterface = userInterface;
        this.render();
    }

    // Render the user setup UI
    render() {
        const existingContainer = document.getElementById('userSetupContainer');
        if (existingContainer) {
            existingContainer.remove();
        }

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

        // Save button event listener
        document.getElementById('saveButton').addEventListener('click', () => this.saveData());
    }

    // Save the API access token
    saveData() {
        const inputText = document.getElementById('inputField').value;

        if (inputText) {
            // Save the data to chrome.storage
            chrome.storage.local.set({ accessToken: inputText }, () => {
                this.accessToken = inputText;
                this.userInterface.showMainMenu();  // Show the main menu after saving
                this.Master.getCanvasInterface().fetchCourses();  // Fetch courses using the saved token
            });
        } else {
            alert("Please enter a value.");
        }
    }
}