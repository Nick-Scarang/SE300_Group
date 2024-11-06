class CanvasInterface {
loadAPI() {
chrome.storage.sync.get(["canvasUrl", "accessToken"], async (data) => {
    const { canvasUrl, accessToken } = data;

    if (canvasUrl && accessToken) {
        try {
            const response = await fetch(`${canvasUrl}/api/v1/courses`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken.trim()}`,
                }
            });
            if (!response.ok) throw new Error("Failed to fetch courses");

            const courses = await response.json();
            console.log("Fetched courses:", courses);

            // Further process or display course data as needed
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    } else {
        console.log("Canvas URL or Api Token is missing.");
    }
});
}
}