<script setup>
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";
import BreakRule from '../components/BreakRule.vue'
// 2nd wa
// A bit easier because we can store the access of the store inside a variable which we then reference easier (take a look at the example with the vaar name 'countNumber')
let countStore = useCounterStore();

// -----
// -----
// Consuming a piece of state that happens to be a function
// How do we do it ?
let incrementNumberFunctionFromStore = countStore.increment;
</script>


<template v-slot:content>
  <main class="container">
    <h2>👋Welcome to The Goals website </h2>
    <h3>Here you can set your goals and hopefully and for once,<p style="font-weight: bold;">🎯archive them! </p>

      <br>
      📝This website helps you with the following:
    </h3>


    <ul class="bullet-points">
      <li>View, add, edit, and delete tasks.</li>
      <li>Mark tasks as completed or pending.</li>
      <li>Filter tasks by title.</li>
      <li>Set a timer to perform a task.</li>
      <li>Display the tasks in a calendar, and navigate through them.</li>
      <li>Mobile-first and responsive design.</li>
    </ul>
    <BreakRule />
    <button @click="incrementNumberFunctionFromStore">Add +1</button>
    <BreakRule />


    <h3>Background</h3>
    <p>
      This website was made by me,
      <a href="https://github.com/badnist" target="_blank">Ryan Marzban</a>, as a final
      project for
      <a href="https://www.ironhack.com/es-en/barcelona" target="_blank">Ironhack</a>'s Front-End
      Bootcamp. It serves as a demonstration of core competencies in Vue.js and
      associated technologies.
    </p>

    <BreakRule />

    <h3>Technologies used</h3>
    <ul class="bullet-points">
      <li>Vue 3: the progressive JavaScript framework.</li>
      <li>Vue Router: routing for single-page applications.</li>
      <li>Pinia: state management.</li>
      <li>Supabase: backend services (user authentication and a database for the tasks).</li>
    </ul>

    <BreakRule />

    <h3>Source code</h3>
    <p>
      The complete source code is available on
      <a href="https://github.com/badnist/Ironhack-Frontend-Final-Project" target="_blank">GitHub</a>. Feel free to
      explore, contribute, or provide feedback.
    </p>

  </main>
</template>
