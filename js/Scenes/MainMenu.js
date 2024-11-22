class MainMenu {
    accessToken;
    Master;
    userInterface;

    constructor(Master, accessToken, userInterface) {
        this.accessToken = accessToken;
        this.Master = Master;
        this.userInterface = userInterface;
        this.render();
    }

    // Render the main menu
    render() {
        const existingContainer = document.getElementById('mainMenuContainer');
        if (existingContainer) {
            existingContainer.remove();
        }

        const mainMenuHTML = 
            `<div id="mainMenuContainer">
                <h2>Main Menu</h2>
                <p id="savedText">${this.accessToken}</p>
                <button id="editButton">Edit</button>
                <button id="UploadSyllabus">Upload Syllabi</button>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', mainMenuHTML);

        // Edit button event listener
        document.getElementById('editButton').addEventListener('click', () => {
            this.userInterface.showUserSetup();
        });

        // Upload syllabus button event listener
        document.getElementById('UploadSyllabus').addEventListener('click', () => {
            this.userInterface.showSyllabusUpload();
        });
    }
}