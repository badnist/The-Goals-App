<script setup>
import { useGoalStore } from "../stores/counter";
import BreakRule from '../components/BreakRule.vue'

let countStore = useGoalStore();
let incrementNumberFunctionFromStore = countStore.increment;
</script>


<template v-slot:content>
  <main class="container">
    <h2>👋Welcome to The Goals website </h2>
    <h3>Here you can set your goals and hopefully and for once,<p style="font-weight: bold;">archive them!🎯 </p>
    </h3>

    <BreakRule />
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
      <li>Supabase: backend services (user authentication and a database for the goals).</li>
    </ul>

    <BreakRule />

    <h3>Source code</h3>
    <p>
      The complete source code is available on
      <a href="https://github.com/badnist/Ironhack-Frontend-Final-Project" target="_blank">GitHub</a>. Feel free to
      explore, contribute, or provide feedback.
    </p>

  </main>
  <div class="simple-layout">
    <section class="section">
      <header class="section-header">
        <slot name="header"></slot>
      </header>
      <main class="section-content">
        <slot name="content"></slot>
      </main>
    </section>
    <div class="floating">
      <slot name="floating"></slot>
    </div>

  </div>
</template>

<style>
.simple-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  --margin-inline: 2rem;
  --margin-block: 2rem;
  --section-bg-color: white;
}

.page-header,
.page-footer {
  padding: var(--margin-block) var(--margin-inline);

  align-self: normal;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-footer {
  margin-top: auto !important;
  border-top: 1px solid #ccc;
}

.section {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: hotpink transparent;
  background-color: var(--section-bg-color);
  margin: 0 var(--margin-inline);
  border-radius: var(--border-radius-small);
  box-shadow: var(--box-shadow-big);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* width: max-content; */
  margin-bottom: calc(var(--margin-block) / 2);
}

.section-header,
.section-content,
.floating {
  padding-inline: var(--margin-inline);
}

.section-header {
  padding-top: var(--margin-block);
  position: sticky;
  top: 0;
  background-color: var(--section-bg-color);
  z-index: 1;
}

.section-content {
  padding-bottom: var(--margin-block);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>