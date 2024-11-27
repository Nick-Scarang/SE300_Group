class CanvasInterface {
    // Define canvasUrl and initialize variables
    canvasUrl = "https://erau.instructure.com";
    accessToken;
    courses = [];
    userInterface;

    constructor(accessToken, userInterface) {
        this.accessToken = accessToken;
        this.userInterface = userInterface;
    }

    // Fetch courses method
    async fetchCourses() {
        // Ensure access token is present
        if (!this.accessToken) {
            console.error("No access token provided.");
            this.userInterface.accessTokenFoundInvalid();
            return;
        }

        console.log("Access Token:", this.accessToken);  // Log the access token

        try {
            // Make the API request using the retrieved token
            const response = await fetch(`${this.canvasUrl}/api/v1/courses`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`
                }
            });

            // Handle unsuccessful responses (e.g., 401 Unauthorized)
            if (!response.ok) {
                if (response.status === 401) {
                    this.userInterface.accessTokenFoundInvalid();
                    alert("Unauthorized. Please check your access token.");
                } else {
                    alert(`Failed to fetch courses: ${response.statusText}`);
                }
                throw new Error(`Failed to fetch courses: ${response.statusText}`);
            } else {
                // Handle successful response
                this.courses = await response.json();
                console.log("Fetched Courses:", this.courses);

                // Notify the user interface with the fetched courses
                this.userInterface.accessTokenFoundValid(this.courses);
            }
        } catch (error) {
            // Handle any errors during the fetch process
            console.error("Error fetching courses:", error);
            this.userInterface.accessTokenFoundInvalid();
        }
    }
}
