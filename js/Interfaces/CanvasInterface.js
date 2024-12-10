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
        if (!this.accessToken) {
            console.error("No access token provided.");
            this.userInterface.accessTokenFoundInvalid();
            return;
        }

        console.log("Access Token:", this.accessToken);

        try {
            const response = await fetch(`${this.canvasUrl}/api/v1/courses`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    this.userInterface.accessTokenFoundInvalid();
                    alert("Unauthorized. Please check your access token.");
                } else {
                    alert(`Failed to fetch courses: ${response.statusText}`);
                }
                throw new Error(`Failed to fetch courses: ${response.statusText}`);
            } else {
                this.courses = await response.json();
                console.log("Fetched Courses:", this.courses);
                this.userInterface.accessTokenFoundValid(this.courses);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            this.userInterface.accessTokenFoundInvalid();
        }
    }

    // Method to fetch assignments for all courses and handle callbacks
    async fetchAssignments() {
        const allAssignments = []; // To store all assignments from all courses
        let assignmentsFound = true; // Track if any error occurs

        // Loop through each course to fetch assignments
        for (const course of this.courses) {
            try {
                // Fetch assignment groups for the course to map group IDs to task types and weights
                const assignmentGroups = await this.fetchAssignmentGroupsForCourse(course);

                // Fetch assignments for the course and assign a task type and grade weight
                const assignments = await this.fetchAllAssignmentsForCourse(course, assignmentGroups);

                if (assignments.length > 0) {
                    allAssignments.push(...assignments); // Collect the assignments
                } else {
                    console.log(`No assignments found for course ${course.name}.`);
                    // No assignments for this course, but we don't stop the process
                }
            } catch (error) {
                console.error(`Error fetching assignments for course ${course.name}:`, error);
                assignmentsFound = false; // Set assignmentsFound to false if an error occurs
                break; // Stop the process if an error occurs
            }
        }

        // Callback based on whether any error occurred during fetching assignments
        if (assignmentsFound) {
            this.userInterface.foundAssignments(allAssignments); // Pass all assignments to foundAssignments
        } else {
            this.userInterface.missingAssignments(); // Call missingAssignments if any error occurred
        }
    }

    // Helper function to fetch all assignments for a single course
// Helper function to fetch all assignments for a single course
    async fetchAllAssignmentsForCourse(course, assignmentGroups) {
        const assignments = [];
        let page = 1; // Start with page 1
        const perPage = 10; // Number of assignments per page

        try {
            // Fetch assignments with manual pagination
            while (true) {
                const url = `${this.canvasUrl}/api/v1/courses/${course.id}/assignments?page=${page}&per_page=${perPage}`;
                console.log(`Fetching page ${page} of assignments for course ${course.name}...`);
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json(); // Parse the response body

                    // Log the raw data returned from the API
                    console.log(`Page ${page} response for course ${course.name}:`, data);

                    if (data.length > 0) {
                        console.log(`Page ${page} has ${data.length} assignments`);  // Log the number of assignments

                        // Process each assignment and map the assignment group ID to the task type and weight
                        data.forEach((assignment) => {
                            const taskType = this.getTaskTypeForAssignment(assignment.assignment_group_id, assignmentGroups);
                            const gradeWeight = this.getGradeWeightForAssignment(assignment.assignment_group_id, assignmentGroups);

                            // Format the due date with both date and time using Intl.DateTimeFormat, handling invalid dates
                            let formattedDueDate = "N/A"; // Default to "N/A"
                            if (assignment.due_at) {
                                const dueDate = new Date(assignment.due_at);
                                if (!isNaN(dueDate.getTime())) { // Check if the date is valid
                                    const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false // Use 24-hour time format
                                    });
                                    formattedDueDate = dateTimeFormat.format(dueDate);
                                }
                            }

                            assignments.push({
                                name: assignment.name,
                                course: course.name,
                                due_date: formattedDueDate, // Store the formatted date and time or "N/A"
                                taskType: taskType,
                                gradeWeight: gradeWeight // Add grade weight to the assignment
                            });
                        });

                        page++;  // Increment page number for next request
                    } else {
                        console.log(`No assignments found on page ${page} for course ${course.name}.`);
                        break; // Stop pagination if no more assignments
                    }
                } else {
                    console.error(`Failed to fetch assignments for course ${course.name}: ${response.statusText}`);
                    break; // Stop the process if there is an error fetching the page
                }
            }
        } catch (error) {
            console.error(`Error fetching assignments for course ${course.name}:`, error);
            return []; // Return empty array if there is an error
        }

        return assignments; // Return the collected assignments with all raw data
    }

    // Fetch assignment groups for a course
    async fetchAssignmentGroupsForCourse(course) {
        const assignmentGroups = [];
        let page = 1;
        const perPage = 10;

        try {
            // Fetch assignment groups with manual pagination
            while (true) {
                const url = `${this.canvasUrl}/api/v1/courses/${course.id}/assignment_groups?page=${page}&per_page=${perPage}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json(); // Parse the response body

                    if (data.length > 0) {
                        assignmentGroups.push(...data); // Add the assignment groups from this page
                        page++;  // Increment page number for next request
                    } else {
                        break; // Stop pagination if no more assignment groups
                    }
                } else {
                    console.error(`Failed to fetch assignment groups for course ${course.name}: ${response.statusText}`);
                    break; // Stop the process if there's an error fetching the assignment groups
                }
            }
        } catch (error) {
            console.error(`Error fetching assignment groups for course ${course.name}:`, error);
        }

        return assignmentGroups;
    }

    // Map assignment group ID to task type (directly use the group name)
    getTaskTypeForAssignment(assignmentGroupId, assignmentGroups) {
        const group = assignmentGroups.find(group => group.id === assignmentGroupId);
        if (!group) return "Unknown"; // Return "Unknown" if no matching assignment group is found

        // Return the actual assignment group name as the task type
        return group.name;
    }

    // Map assignment group ID to grade weight (use group_weight)
    getGradeWeightForAssignment(assignmentGroupId, assignmentGroups) {
        const group = assignmentGroups.find(group => group.id === assignmentGroupId);
        if (!group) return 0; // Return 0 if no matching assignment group is found

        // Return the grade weight (from group_weight) associated with the assignment group
        return group.group_weight || 0;
    }
}