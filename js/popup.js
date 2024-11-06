class CanvasInterface {
    initialize() {
        document.getElementById("saveButton").addEventListener("click", () => {
            const canvasUrl = document.getElementById("canvasUrl").value;
            const accessToken = document.getElementById("accessToken").value;

            chrome.runtime.sendMessage({
                action: "saveCredentials",
                canvasUrl: canvasUrl,
                accessToken: accessToken
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error:", chrome.runtime.lastError.message);
                } else if (response && response.status === "success") {
                    alert("Canvas URL and Api Token saved successfully!");
                    console.log(response, canvasUrl, accessToken)
                }
            });
        });

        document.getElementById("fetchCoursesButton").addEventListener("click", () => {
            //fetchCourses();
            chrome.storage.sync.get(null, (data) => {
                console.log("All stored data before fetching:", data);
            });
            chrome.storage.sync.get(["canvasUrl", "accessToken"], async (data) => {
                const {canvasUrl, accessToken} = data;

                try {
                    console.log(accessToken);
                    const response = await fetch(`${canvasUrl}/api/v1/courses`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch courses: ${response.statusText}`);
                    }

                    const courses = await response.json();
                    console.log("Fetched Courses:", courses);

                    const courseList = document.getElementById("courseList");
                    courseList.innerHTML = "";
                    courses.forEach(course => {
                        const courseItem = document.createElement("div");
                        courseItem.textContent = course.name;
                        courseList.appendChild(courseItem);
                    });

                } catch (error) {
                    console.error("Error fetching courses:", error);
                }
            });
        });

        /*
        function fetchCourses() {
          chrome.storage.sync.get(["canvasUrl", "apiToken"], async (data) => {
              const { canvasUrl, apiToken } = data;

              if (canvasUrl && apiToken) {
                  try {
                      const response = await fetch(`${canvasUrl}/api/v1/courses`, {
                          method: 'GET',
                          headers: { 'Authorization': `Bearer ${apiToken}` }
                      });
                      if (!response.ok) throw new Error("Failed to fetch courses");
                      console.log(response);

                      const courses = await response.json();
                      console.log("Fetched courses:", courses);
                      alert(`Fetched ${courses.length} courses successfully!`);
                  } catch (error) {
                      console.error("Error fetching courses:", error);
                      alert("Failed to fetch courses. See console for details.");
                  }
              } else {
                  alert("Canvas URL or api Token is missing.");
              }
          });
        }
        */
    }
}