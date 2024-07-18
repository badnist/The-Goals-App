<!--
This file defines a Vue.js component for displaying and managing tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of all tasks,
allowing users to mark tasks as completed and delete them, leveraging global state management with Pinia.js.
-->
<template>
  <div class="container">
    <h2 class="text-center text-white mb-4">Goal List</h2>

    <ul class="list-group">
      <li v-for="goal in goals" :key="goal.id" class="list-group-item mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h4 class="mb-1">{{ goal.title }}</h4>
            <p class="mb-1">{{ goal.description.title }}</p>
            <p class="mb-1"><strong>Time to Complete:</strong> {{ goal.description.timeToBeCompleted }}</p>
            <ul class="list-unstyled mb-2">
              <li v-for="(extraInfo, index) in goal.description.extraInfoRequired" :key="index">{{
                extraInfo }}</li>
            </ul>
            <p v-if="goal.isCompleted" class="text-success mb-1">Status: Completed</p>
            <p v-else class="text-danger mb-1">Status: Incomplete</p>
          </div>

          <div class="btn-group">
            <button v-if="!goal.isCompleted" @click="markGoalsCompleted(goal.id)" class="btn btn-success btn-sm">Mark as
              Completed</button>
            <button @click="deleteGoal(goal.id)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="goals.length === 0" class="text-center mt-3">
      <p>No Goals Found.</p>
    </div>
  </div>
</template>


<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import the useTaskStore function from taskStore to interact with the task store
import { useGoalStore } from "../stores/goalStore";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Use the task store by saving it in a variable
const goalstore = useGoalStore();

// Destructure all the possible pieces of data that we want out of this
const { goals, deleteGoal, markGoalCompleted } = goalstore; // Destructure necessary functions and state from the task store

/*
The useTaskStore function is used to access the task store.
- Destructure tasks, markTaskCompleted, and deleteTask from the task store.
- These will be used to interact with the global state of tasks.
*/
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.btn-group button {
  margin-right: 10px;
}
</style>

<!--
Summary:
This file implements a Vue.js component that displays a list of tasks from the global state managed by Pinia.js.
It allows users to mark tasks as completed or delete them. The component leverages Pinia's state management to
interact with the tasks and provide necessary functionalities.
-->
