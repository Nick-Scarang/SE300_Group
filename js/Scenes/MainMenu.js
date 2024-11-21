class MainMenu {
    accessToken;
    Master;
    constructor(Master, accessToken, userInterface) {
        this.accessToken = accessToken;
        this.Master = Master;
        this.userInterface = userInterface;
        this.render();
    }

    render() {
        // Clear previous content
        const existingContainer = document.getElementById('mainMenuContainer');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Create elements
        const mainMenuHTML = ` 
            <div id="mainMenuContainer">
                <h2>Main Menu</h2>
                <p id="savedText">${this.accessToken}</p>
                <button id="editButton">Edit</button>
                <button id="UploadSyllabus">Upload Syllabi</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mainMenuHTML);

        // Add event listener for the edit button
        document.getElementById('editButton').addEventListener('click', () => {
            // On edit button click, go to user setup without causing a loop
            this.userInterface.showUserSetup();
        });

        document.getElementById('UploadSyllabus').addEventListener('click', () => {
            this.userInterface.showSyllabusUpload();
        });



    }
}