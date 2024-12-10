class TesseractHandler {
    static async processImage(file) {
        if (typeof Tesseract === 'undefined') {
            console.error('Tesseract.js failed to load!');
        } else {
            console.log('Tesseract.js loaded successfully');
        }

        try {
            const result = await Tesseract.recognize(file, 'eng', {
                logger: (info) => console.log(info),
            });

            const extractedText = result.data.text;

            return this.extractAssignments(extractedText);
        } catch (error) {
            console.error('Error during OCR processing:', error);
            return null;
        }
    }

    static extractAssignments(text) {
        const assignmentRegex = /([A-Za-z\s]+\d+)\s+(\d+)%/g;
        const assignments = [];
        let match;

        while ((match = assignmentRegex.exec(text)) !== null) {
            const assignment = match[1].trim();
            const weight = parseInt(match[2], 10);
            assignments.push({ assignment, weight });
        }
        return assignments;
    }
}