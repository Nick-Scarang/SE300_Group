class UserSetup {
    CI;
    constructor(onSave, CI) {
        this.CI = CI;
        this.onSave = onSave;
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
                // Call the onSave callback to switch to MainMenu
                this.onSave(inputText);
            });
            CI.fetchCourses();
        } else {
            alert("Please enter a value.");
        }
    }
}
