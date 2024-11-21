class SyllabusUpload{
    Master;
    constructor(Master, userInterface){
        this.Master = Master;
        this.userInterface = userInterface;
        this.render();
    }

    render(){
        const existingContainer = document.getElementById('syllabusUploadContainer');
        
        if(existingContainer){
            existingContainer.remove();
        }

        const syllabusUploadHTML = `
            <div id="syllabusUploadContainer">
                <h2>Upload Syllabus</h2>
                <input type="file" id="fileInput" accept="image/*" />
                <button id="processButton">Process</button>
                <div id="output"></div>
                <div id="assignments"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', syllabusUploadHTML);

        document.getElementById('processButton').addEventListener('click', async () => {
            const fileInput = document.getElementById('fileInput');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const TesseractHandler = new TesseractHandler();
                const assignments = await TesseractHandler.processImage(file);

                if (assignments) {
                    document.getElementById('output').textContent = "Extracted Text:";
                    document.getElementById('assignments').innerHTML = assignments.map(
                        (a) => `<p>${a.assignment}: ${a.weight}%</p>`
                    ).join('');
                } else {
                    document.getElementById('output').textContent = "Failed to process the image.";
                }
            } else {
                alert("Please select a file.");
            }
        });
    }
}