class CanvasInterface {
    // Define canvasUrl and initialize variables
    canvasUrl = "https://erau.instructure.com";
    accessToken = "";
    courses = [];

    // Fetch courses method
   async fetchCourses() {
        const token = this.accessToken; 
        const apiUrl = 'https://erau.instructure.com/api/v1/courses'; 

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.courses = data.map(course => ({
                    id: course.id,
                    name: course.name
                }));
                console.log('Courses fetched:', this.courses);
            } else {
                console.error('Failed to fetch courses:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }
}
