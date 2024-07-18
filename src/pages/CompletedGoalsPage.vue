<!--
This file defines a Vue.js component for displaying completed tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of tasks marked as completed, leveraging global state management with Pinia.js.
-->
<template>
  <div class="container">
    <h4 class="mb-4 text-center text-success display-5">Completed Goals</h4>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow">
          <ul class="list-group list-group-flush">
            <li v-for="goal in completedGoals" :key="goal.id" class="list-group-item">
              <div class="d-flex w-100 justify-content-between align-items-center mb-3">
                <h5 class="mb-1">{{ goal.title }}</h5>
                <span class="badge bg-success">{{ goal.isCompleted ? 'Completed' : 'Incomplete'
                  }}</span>
              </div>
              <p class="mb-1"><strong>Description:</strong> {{ goal.description.title }}</p>
              <p class="mb-1"><strong>Time to Complete:</strong> {{ goal.description.timeToBeCompleted }}
              </p>
              <ul class="list-unstyled mb-0">
                <li v-for="(extraInfo, index) in goal.description.extraInfoRequired" :key="index">{{
                  extraInfo }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import computed from Vue to create a computed property
import { computed } from "vue";
// Import the useGoalStore function from goalStore to interact with the goal store
import { useGoalStore } from "../stores/goalStore";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Use the task store by saving it in a variable
const taskstore = useTaskStore();

// Destructure all the possible pieces of data that we want out of this
const { tasks } = taskstore; // Destructure necessary functions and state from the task store

// ------------------------------------------------------------------------
// Computed Properties Block
// ------------------------------------------------------------------------

// Computed property to filter completed tasks
let completedTasks = computed(() => tasks.filter((task) => task.isCompleted));

/*
The completedTasks computed property filters the tasks array to include only the tasks that are marked as completed.
- It uses the filter method to iterate over the tasks array.
- For each task, it checks if the isCompleted property is true.
- The resulting array contains only the tasks that are completed.
*/
</script>
