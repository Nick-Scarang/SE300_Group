class Formula {
    constructor(userPref, tasks) {
        this.userPref = userPref;
        this.tasks = tasks;
      }
    
      rankTasksByDoneDate(tasksArray) {
        return tasksArray.sort((a, b) => a.getDueDate() - b.getDueDate());
      }
    
      adjustRanksByWeight(tasksArray) {
        return tasksArray.sort((a, b) => b.getCompTime() - a.getCompTime());
      }
    
      adjustRanksByLWP(tasksArray) {
        const lateWorkPref = this.userPref.getLateWorkPref();
        return tasksArray.sort((a, b) => {
          if (a.getDueDate() <= lateWorkPref && b.getDueDate() <= lateWorkPref) return 0;
          if (a.getDueDate() <= lateWorkPref) return -1;
          return 1;
        });
      }
    
      getTasksFromDatabase() {
        return this.tasks.getAllTasks();
      }
    
      rankTotal() {
        let tasksArray = this.getTasksFromDatabase();
        tasksArray = this.rankTasksByDoneDate(tasksArray);
        tasksArray = this.adjustRanksByWeight(tasksArray);
        tasksArray = this.adjustRanksByLWP(tasksArray);
        return tasksArray;
      }
    
      getTaskList() {
        const tasksArray = this.rankTotal();
        const numTasks = this.userPref.getNumTasks();
        return tasksArray.slice(0, numTasks);
      }
}