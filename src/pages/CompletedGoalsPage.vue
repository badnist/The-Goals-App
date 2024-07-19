<script setup>

import { computed } from "vue";

import { useGoalStore } from "../stores/goalStore.js";

import { useUserStore } from "../stores/user";


// Use the task store by saving it in a variable
const goalStore = useGoalStore();
// Use the user store by saving it in a variable
const userStore = useUserStore();

// Destructure all the possible pieces of data that we want out of this
const { goals, getGoalsByUserId } = goalStore; // Destructure necessary functions and state from the task store

// Computed property to filter completed tasks
let completedGoals = computed(() => goals.filter((goal) => goal.isCompleted));


// Computed property to get completed tasks for the current user
const userCompletedGoals = computed(() => {
  // Define a computed property named 'userCompletedTasks'
  if (userStore.isLoggedIn && userStore.user) {
    // Check if the user is logged in and the user object exists
    return getGoalsByUserId(userStore.user.id).filter(
      // Call 'getTasksByUserId' with the current user's ID and filter the tasks
      (goal) => goal.isCompleted // Return only the tasks that are marked as completed
    );
  }
  return []; // If the user is not logged in, return an empty array
});


</script>

<template>
  <h4>This Page Displays completed goal</h4>
  <div class="container">
    <!-- Display EXAMPLE TASKS THAT BELONG TO THE USER -->
    <ul v-if="userCompletedGoals.length > 0">
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="goal in userCompletedGoals" v-bind:key="goal.id">
        <!-- Display the title of the task -->
        <h5>{{ goal.title }}</h5>
        <!-- Display the description title of the task -->
        <h6>{{ goal.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6>{{ goal.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul>
          <li v-for="(extraInfo, index) in goal.description.extraInfoRequired" v-bind:key="index">
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>

    <ul v-else>
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="goal in completedGoals" v-bind:key="goal.id">
        <!-- Display the title of the task -->
        <h5>{{ goal.title }}</h5>
        <!-- Display the description title of the task -->
        <h6>{{ goal.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6>{{ goal.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul>
          <li v-for="(extraInfo, index) in goal.description.extraInfoRequired" v-bind:key="index">
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>