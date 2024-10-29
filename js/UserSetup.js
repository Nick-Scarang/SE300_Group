class UserSetup {
    constructor(onSave) {
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
                <input type="text" id="inputField" placeholder="Enter text here" />
                <input type="text" id="confirmField" placeholder="Previous entry" readonly />
                <button id="saveButton">Save</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', userSetupHTML);

        // Load saved data to display in the confirm field
        chrome.storage.local.get(['outputText'], (result) => {
            if (result.outputText) {
                document.getElementById('confirmField').value = result.outputText;
            }
        });

        // Add event listener for the save button
        document.getElementById('saveButton').addEventListener('click', () => this.saveData());
    }

    saveData() {
        const inputText = document.getElementById('inputField').value;

        if (inputText) {
            // Save the data to chrome.storage
            chrome.storage.local.set({ outputText: inputText }, () => {
                // Call the onSave callback to switch to MainMenu
                this.onSave(inputText);
            });
        } else {
            alert("Please enter a value.");
        }
    }
}
