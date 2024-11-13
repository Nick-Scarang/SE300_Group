class MainMenu {
    constructor(accessToken, onEdit) {
        this.accessToken = accessToken;
        this.onEdit = onEdit;
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
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mainMenuHTML);

        // Add event listener for the edit button
        document.getElementById('editButton').addEventListener('click', () => this.onEdit());
    }
}
