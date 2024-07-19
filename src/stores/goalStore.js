
import { reactive } from "vue";

// Import defineStore from Pinia to define a new store
import { defineStore } from "pinia";

// Import useUserStore to access the currently logged-in user
import { useUserStore } from "./user";


export const useGoalStore = defineStore("goalStore", () => {
  // Initial array of goals using reactive to keep the state reactive
  const goals = reactive([
    {
      id: 1, // Unique identifier for the goal
      title: "Buy ingredients to make Tacos", // Title of the goal
      description: {
        title:
          "Go to the latin shop next to my house to buy groceries for this friday's dinner with friends", // Detailed description of the goal
        timeToBeCompleted: "2 hours", // Estimated time to complete the task
        extraInfoRequired: ["Guacamole", "Nachos"], // Additional information required for the task
      },
      isCompleted: true, // Boolean indicating if the task is completed
      userId: 1, // Link task to user with id 1
    },
    {
      id: 2, // Unique identifier for the task
      title: "Clean out House", // Title of the task
      description: {
        title: "Clean House by friday for friends dinner", // Detailed description of the task
        timeToBeCompleted: "1 hour", // Estimated time to complete the task
        extraInfoRequired: ["swap", "mop", "dust"], // Additional information required for the task
      },
      isCompleted: false, // Boolean indicating if the task is completed
      userId: 2, // Link task to user with id 2
    },
  ]);


  /**
   * Adds a new task to the tasks array.
   * @param {Object} goal - The task object to be added.
   */
  function addGoal(goal) {
    goals.push(goal); // Push the new task to the tasks array
  }

  /*
  The addTask function is used to add a new task to the tasks array.
  - It takes a task object as a parameter.
  - It uses the push method to add this task object to the end of the tasks array.
  - Since tasks is a reactive array, any components that are using this store will automatically reflect this new task.
  */

  // ----------------------------------------------------------------------
  // Function to mark a task as completed
  // ----------------------------------------------------------------------

  /**
   * Marks a specific task as completed.
   * @param {number} goalId - The ID of the task to be marked as completed.
   */
  function markGoalCompleted(goalId) {
    // Find the task by its ID
    let goal = goals.find((goal) => goal.id === goalId);
    // If task is found, mark it as completed
    if (goals) {
      goal.isCompleted = true; // Set the task's isCompleted property to true
    }
  }

  /*
  The markTaskCompleted function is used to mark a specific task as completed.
  - It takes a taskId as a parameter.
  - It finds the task in the tasks array that has the same id as the taskId.
  - If a task with the specified id is found, it sets the isCompleted property of that task to true.
  - This function allows for changing the state of a task to reflect its completion status.
  */

  // ----------------------------------------------------------------------
  // Function to delete a task
  // ----------------------------------------------------------------------

  /**
   * Deletes a specific task from the tasks array.
   * @param {number} goalId - The ID of the task to be deleted.
   */
  function deleteGoal(goalId) {
    // Find the index of the task to be deleted by its ID
    let index = goals.findIndex((goal) => goal.id === goalId);
    if (index !== -1) {
      goals.splice(index, 1); // Remove the task from the array
    }
  }

  /*
  The deleteTask function is used to remove a specific task from the tasks array.
  - It takes a taskId as a parameter.
  - It finds the index of the task in the tasks array that has the same id as the taskId parameter.
  - If a task with the specified id is found (index is not -1), it removes the task from the array using the splice method.
  - This function allows for deleting tasks by their unique identifier.
  */

  // ----------------------------------------------------------------------
  // Function to get tasks by user ID
  // ----------------------------------------------------------------------

  /**
   * Retrieves tasks that belong to a specific user.
   * @param {number} userId - The ID of the user whose tasks are to be retrieved.
   * @returns {Array} - An array of tasks that belong to the specified user.
   */
  function getGoalsByUserId(userId) {
    return goals.filter((goal) => goal.userId === userId);
  }

  /*
  The getTasksByUserId function retrieves tasks that belong to a specific user.
  - It takes a userId as a parameter.
  - It filters the tasks array to return only tasks that have the same userId as the parameter.
  - This function allows for fetching tasks based on the user they are assigned to.
  */

  // ----------------------------------------------------------------------
  // Function to add tasks by user ID
  // ----------------------------------------------------------------------

  // /**
  //  * Generates a new task for the currently logged-in user.
  //  * @param {string} taskTitle - The title of the task to be generated.
  //  * @param {string} taskDescription - The description of the task to be generated.
  //  * @throws {Error} - Throws an error if no user is logged in.
  //  */

  function generateGoalForCurrentUser(goalTitle, goalDescription) {
    // Save the acces to the user tore inside a variable
    let userStore = useUserStore();
    // Inside the if condition, we want to check if the variable inside the user store which is
    // userStore.isLoggedIn is riggering for a truthy condition
    if (userStore.isLoggedIn) {
      // lets save the structure of the new task to be submitted as an object, inside a variable. That way we can then send it correctly to the addTask() function above on this file.
      const newGoal = {
        id: Date.now(), // Unique identifier for the task - we are using the DATE.now method from JS to generate a random 12 Digit Characters
        title: goalTitle, // Title of the task
        description: goalDescription,
        isCompleted: false, // Boolean indicating if the task is completed
        userId: userStore.user.id, // It will link the newTask to that specific user by allocating the userID to this particular key.
      };
      addGoal(newGoal); // Add's new task with the user id matched to it to the tasks Array
    } else {
      throw new Error("User is not logged in"); // This is for pure engineering purposes, you can go ahead and upgrade as you see fit.
    }
  }

  /*
The generateTaskForCurrentUser function creates a new task for the currently logged-in user. 
It first retrieves the user information and checks if a user is logged in. If so, it constructs a 
new task with a unique identifier, provided title and description, and associates it with the 
logged-in user. The task is then added to the tasks array. If no user is logged in, the function 
throws an error.
*/

  // ----------------------------------------------------------------------
  // Return statement to export all pieces of data or functions globally
  // ----------------------------------------------------------------------
  return {
    goals,
    addGoal,
    markGoalCompleted,
    deleteGoal,
    getGoalsByUserId,
    generateGoalForCurrentUser,
  };
});

/*
Summary:
This file defines a Pinia store for managing tasks in a to-do application. It includes an initial set of tasks and provides 
functions to add, mark as completed, delete, and filter tasks by user ID. The state management is reactive, ensuring that 
any changes to the tasks are automatically reflected in the Vue.js components that use this store.
*/
