class CanvasInterface {
    // Define canvasUrl and initialize variables
    canvasUrl = "https://erau.instructure.com";
    accessToken = "";
    courses = [];

    // Fetch courses method
    fetchCourses() {
        // Retrieve the access token from storage
        chrome.storage.local.get(["accessToken"], (data) => {
            console.log("Retrieved data from storage:", data);  // Log the retrieved data

            // Check if the access token is present in storage
            if (!data.accessToken) {
                console.error("No access token found in storage");
                return;
            }
            // Set the access token to the class property
            this.accessToken = data.accessToken;
            console.log("Access Token:", this.accessToken);  // Log the access token
            // Make the API request using the retrieved token
            try {
                const response = fetch(`${this.canvasUrl}/api/v1/courses`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch courses: ${response.statusText}`);
                }
                this.courses = response.json();
                console.log("Fetched Courses:", this.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        });
    }
}
