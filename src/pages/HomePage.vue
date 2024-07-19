<script setup>
import { computed } from "vue";
import { useGoalStore } from "../stores/counter";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

let countStore = useGoalStore();
let countNumber = computed(() => countStore.count);
let doubleCountNumber = countStore.doubleCount;

const userStore = useUserStore();
const { getGoalsForUser } = storeToRefs(userStore);

console.log(userStore.getGoalsForUser());

</script>

<template>

  <div class="centered">
    <h1>Welcome!</h1>
    <div class="text-center">
      <h4>Current Count: {{ countNumber }}</h4>
      <h5>Doubled Count: {{ doubleCountNumber }}</h5>
    </div>
    <!-- First way of consuming data from the store -->
    <!-- Even though it is accessible, this can be hard to read, so get used to reading -->
  </div>

  <!-- Using 2nd way -->
  <section class="mt-5">
    <h3 class="text-center mb-2">A Personal Note</h3>
    <p class="lead text-center">
      Welcome to Home View!
    </p>
  </section>



</template>

<style>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}
</style>