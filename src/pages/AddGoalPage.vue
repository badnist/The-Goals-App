<script setup>

import { reactive, ref } from "vue";
// Importing the useTaskStore function from taskStore to interact with the task store
import { useGoalStore } from "../stores/goalStore";
// Importing the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";


const goalStore = useGoalStore();
// Use the user store
const userStore = useUserStore();
const { generateGoalsForCurrentUser } = goalStore; // Destructure addTask function from the task store



// Reactive object for the new task
const newGoal = reactive({
  title: "", // Title of the new task
  description: {
    title: "", // Detailed description of the new task
    timeToBeCompleted: "", // Time required to complete the new task
    extraInfoRequired: [], // Array for additional information required for the task
  },
});

const newExtraInfo = ref(""); // Reference for new extra info input
const goalAdded = ref(false); // Reference for tracking if a task has been added



// Function to handle form submission
const handleSubmit = () => {
  const goalTitle = newGoal.title;
  const goalDescription = JSON.parse(JSON.stringify(newGoal.description)); // // Create a deep copy of the new task description to avoid reactivity issues
  generateGoalsForCurrentUser(goalTitle, goalDescription);
  // Use generateTaskForCurrentUser to add the new task for the logged-in user
  goalAdded.value = true;
};


// Function to add extra info
const addExtraInfo = () => {
  if (newExtraInfo.value.trim()) {
    // Check if the newExtraInfo value is not empty after trimming
    newGoal.description.extraInfoRequired.push(newExtraInfo.value.trim()); // Add the trimmed value to the extraInfoRequired array
    newExtraInfo.value = ""; // Clear the input field
  }
};

/*

// Function to remove extra info
const removeExtraInfo = (index) => {
  newGoal.description.extraInfoRequired.splice(index, 1); // Remove the item at the specified index from the extraInfoRequired array
};

/*
  The removeExtraInfo function removes an extra information item from the new task's description.
  - It takes an index as a parameter.
  - It removes the item at the specified index from the extraInfoRequired array using the splice method.
  */

// Function to reset the form
const resetForm = () => {
  newGoal.title = ""; // Clear the title field
  newGoal.description.title = ""; // Clear the description title field
  newGoal.description.timeToBeCompleted = ""; // Clear the time to be completed field
  newGoal.description.extraInfoRequired = []; // Clear the extra info required array
};

/*
  The resetForm function resets all the fields of the new task form to their initial states.
  - It clears the title field by setting newTask.title to an empty string.
  - It clears the description title field by setting newTask.description.title to an empty string.
  - It clears the time to be completed field by setting newTask.description.timeToBeCompleted to an empty string.
  - It clears the extra info required array by setting newTask.description.extraInfoRequired to an empty array.
  */

// Function to start a new task submission
const startNewGoal = () => {
  resetForm(); // Reset the form fields
  goalAdded.value = false; // Set taskAdded to false to show the form again
};

/*
  The startNewTask function resets the form and prepares it for a new task submission.
  - It calls the resetForm function to clear all form fields.
  - It sets taskAdded to false to hide the success message and display the form again.
  */
</script>
<template>
  <div>
    <h1>Add New Goal</h1>
    <!-- v-if directive to show success message if taskAdded is true, otherwise show the form -->
    <div v-if="goalAdded">
      <p>Yay! New goal created.</p>
      <button @click="startNewGoal">Start a New Goal</button>
    </div>
    <div v-else>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Title:</label>
          <input v-model="newGoal.title" type="text" id="title" required />
        </div>
        <div>
          <label for="descriptionTitle">Description Title:</label>
          <input v-model="newGoal.description.title" type="text" id="descriptionTitle" required />
        </div>
        <div>
          <label for="timeToBeCompleted">Time to be Completed:</label>
          <input v-model="newGoal.description.timeToBeCompleted" type="text" id="timeToBeCompleted" required />
        </div>
        <div>
          <label for="extraInfo">Extra Info Required:</label>
          <input v-model="newExtraInfo" type="text" id="extraInfo" />
          <button type="button" @click="addExtraInfo">Add Info</button>
          <ul>
            <li v-for="(info, index) in newGoal.description.extraInfoRequired" :key="index">
              {{ info }}
              <button type="button" @click="removeExtraInfo(index)">
                Remove
              </button>
            </li>
          </ul>
        </div>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  </div>
</template>
