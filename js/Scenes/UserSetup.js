class UserSetup {
    constructor(userInterface) {
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
                <span id="loadingIndicator" style="display: none; margin-left: 10px;">Loading...</span>
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
            // Show the "loading..." message next to the save button
            document.getElementById('loadingIndicator').style.display = 'inline';

            // Pass the inputText (token) to UserInterface for validation and saving
            this.userInterface.userTryingToSaveAccessToken(inputText);

            this.Master.getCanvasInterface().fetchCourses();
        } else {
            alert("Please enter a value.");
        }
    }
}
