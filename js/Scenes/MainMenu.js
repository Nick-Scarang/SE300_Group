class MainMenu {
    accessToken;
    Master;
    constructor(Master, accessToken, userInterface) {
        this.accessToken = accessToken;
        this.Master = Master;
        this.userInterface = userInterface
        this.render();
    }

    render() {
        // Clear previous content
        const existingContainer = document.getElementById('mainMenuContainer');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Insert HTML for Main Menu with collapsible sections
        const mainMenuHTML = `
            <div id="mainMenuContainer">
                <h2>Main Menu</h2>
                <p id="savedText">${this.accessToken}</p>
                <button id="editButton">Edit</button>

                <!-- Collapsible Menu 1 -->
                <details id="menu1">
                    <summary>Menu 1</summary>
                    <div>
                        <label for="menu1AccessToken">Access Token:</label>
                        <input type="text" id="menu1AccessToken" value="${this.accessToken}" />
                        <button id="menu1SaveButton">Save</button>
                    </div>
                </details>

                <!-- Collapsible Menu 2 -->
                <details id="menu2">
                    <summary>Menu 2</summary>
                    <div>
                        <label for="menu2AccessToken">Access Token:</label>
                        <input type="text" id="menu2AccessToken" value="${this.accessToken}" />
                        <button id="menu2SaveButton">Save</button>
                    </div>
                </details>

                <!-- Collapsible Menu 3 -->
                <details id="menu3">
                    <summary>Menu 3</summary>
                    <div>
                        <label for="menu3AccessToken">Access Token:</label>
                        <input type="text" id="menu3AccessToken" value="${this.accessToken}" />
                        <button id="menu3SaveButton">Save</button>
                    </div>
                </details>

                <!-- Collapsible Menu 4 -->
                <details id="menu4">
                    <summary>Menu 4</summary>
                    <div>
                        <label for="menu4AccessToken">Access Token:</label>
                        <input type="text" id="menu4AccessToken" value="${this.accessToken}" />
                        <button id="menu4SaveButton">Save</button>
                    </div>
                </details>

                <!-- Collapsible Menu 5 -->
                <details id="menu5">
                    <summary>Menu 5</summary>
                    <div>
                        <label for="menu5AccessToken">Access Token:</label>
                        <input type="text" id="menu5AccessToken" value="${this.accessToken}" />
                        <button id="menu5SaveButton">Save</button>
                    </div>
                </details>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', mainMenuHTML);

        // Add event listener for the edit button
        document.getElementById('editButton').addEventListener('click', () => {
            // On edit button click, go to user setup without causing a loop
            this.userInterface.showUserSetup();
        });
    }
}
