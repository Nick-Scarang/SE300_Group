// Instantiate Graphics when the script is loaded
const CI = new CanvasInterface();
const UI = new UserInterface(CI);

courses = CI.fetchCourses();