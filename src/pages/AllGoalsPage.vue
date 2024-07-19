<script setup>

import { computed, ref } from "vue";

import { useGoalStore } from "../stores/goalStore";

import { useUserStore } from "../stores/user";
import CalendarComponent from '@/components/CalendarComponent.vue'

const goalStore = useGoalStore();
const userStore = useUserStore();
const { goals, deleteGoal, markGoalCompleted, getGoalsByUserId } = goalStore;


const userGoals = computed(() => {

  if (userStore.isLoggedIn && userStore.user) {

    return getGoalsByUserId(userStore.user.id); // If the user is logged in, return the tasks associated with the user's ID
  }
  return []; // If the user is not logged in, return an empty array
});


</script>


<template>
  <h4>This Page Displays all goals</h4>

  <div class="container">

    <!-- Conditional rendering to display user-specific tasks if available, otherwise display all tasks -->
    <ul v-if="userGoals.length > 0">
      <!-- v-for directive to iterate over each task in tasks array -->
      <li v-for="goal in userGoals" v-bind:key="goal.id">
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
        <!-- Display whether the task is completed or incomplete -->
        <h6>{{ goal.isCompleted ? "Completed" : "Incomplete" }}</h6>
        <!-- Button to mark the task as completed -->
        <button v-bind:disabled="goal.isCompleted ? true : false" @click="markGoalCompleted(goal.id)">
          Mark as Completed
        </button>
        <!-- Button to delete the task -->
        <button @click="deleteGoal(goal.id)">Delete Goal</button>
      </li>
    </ul>
    <!-- Loop through the tasks array and render each task in a list item -->
    <ul v-else>
      <!-- v-for directive to iterate over each task in tasks array -->
      <li v-for="goal in goals" v-bind:key="goal.id">
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
        <!-- Display whether the task is completed or incomplete -->
        <h6>{{ goal.isCompleted ? "Completed" : "Incomplete" }}</h6>
        <!-- Button to mark the task as completed -->
        <button v-bind:disabled="goal.isCompleted ? true : false" @click="markGoalCompleted(goal.id)">
          Mark as Completed
        </button>
        <!-- Button to delete the task -->
        <button @click="deleteGoal(goal.id)">Delete Goal</button>
      </li>
    </ul>
  </div>
  <CalendarComponent class="goal-tools-section" :events="calendarEvents" />
</template>


<style>
.goal-tools-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>