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

                    <!-- Confirm Courses in User Setup -->
                <details id="menu4">
                    <summary>Confirm Courses:</summary>
                    <div>
                <summary>Below are all your Canvas courses. We have</summary> 
                <summary>preselected the courses we think you are </summary>
                <summary>currently in. Please deselect the courses </summary>
                <summary>you don't want and select the courses you do.</summary>
                <button id="saveCourses">Save Courses</button>
                    </div>
                </details>


                <!-- Upload Syllabi in User Setup -->
                <details id="menu4">
                    <summary>Upload Syllabi:</summary>
                    <div>
                <input type="file" id="fileInput" accept="image/*" />
                <button id="processButton">Process Syllabus</button>
                    <div id="output"></div>
                    <div id="assignments"></div>
                </details>


                <!-- Late Work Preference in User Setup -->
                <details id="menu4">
                    <summary>Late Work Preferences:</summary>
                    <div>
                <button id="saveCourses">Save Courses</button>
                    </div>
                </details>


                <!-- Set Done Date in User Setup -->
                <details id="menu4">
                    <summary>Set Done Date:</summary>
                    <div>
                <button id="saveCourses">Save Courses</button>
                    </div>
                </details>


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

        document.getElementById('processButton').addEventListener('click', async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                try {
                    const assignments = await TesseractHandler.processImage(file);

                    if (assignments && assignments.length > 0) {
                        document.getElementById('output').textContent = "Extracted Text:";
                        document.getElementById('assignments').innerHTML = assignments
                            .map((a) => `<p>${a.assignment}: ${a.weight}%</p>`)
                            .join('');
                    } else {
                        document.getElementById('output').textContent = "No assignments found in the image.";
                    }
                } catch (error) {
                    console.error("Error processing the syllabus:", error);
                    document.getElementById('output').textContent = "Failed to process the image.";
                }
            } else {
                alert("Please select a file.");
            }
        });
    }
}
