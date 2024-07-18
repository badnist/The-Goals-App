<!--
This file defines a Vue.js component for the login process in a to-do application.
By building this component, we will achieve a user interface that allows users to log in by providing their email and password, with state management handled by Pinia.js.
-->

<template>
  <PageHeader class="page-header" />

  <div class="container">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Log In to Reach Your Goals Now!</h3>
      </div>


      <!-- FORM GOES HERE -->
      <form @submit.prevent="signIn">
        <div class="form">
          <!-- Email Input -->
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input type="email" class="input-field" placeholder="example@gmail.com" id="email" v-model="formState.email"
              required />
          </div>

          <!-- Password Input -->
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input type="password" class="input-field" placeholder="**********" id="password"
              v-model="formState.password" required />
          </div>

          <!-- Button -->
          <button type="submit">Let's go!</button>
        </div>
      </form>


      <p v-show="formState.errorMsg">{{ formState.errorMsg }}</p>
      <!-- END Error Message -->

      <p>
        Don't have an account?
        <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link" />
      </p>
    </div>

    <main class="section-content">
      <slot name="content"></slot>
    </main>
    <div class="floating">
      <slot name="floating"></slot>
    </div>
    <PageFooter class="page-footer" />
  </div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

import { reactive } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import PageHeader from './PageHeader.vue'

// ------------------------------------------------------------------------
// Variables Block
// ------------------------------------------------------------------------

// Route Variables for navigating users
const route = "/auth/register";
const buttonText = "Sign Up";

// Reactive variable to store email, password, and error messages
const formState = reactive({
  email: "", // Stores the email input
  password: "", // Stores the password input
  errorMsg: "", // Stores any error messages
});

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'isLoggedIn' out of the store, keeping its reactivity using the storeToRefs method from Pinia
const { isLoggedIn } = storeToRefs(userStore);

// ------------------------------------------------------------------------
// Functions Block
// ------------------------------------------------------------------------

/**
 * Function to handle the SignIn process.
 * It validates the user's credentials using the signIn function from the user store.
 * On success, it redirects the user to the home page.
 * On failure, it displays an error message.
 */
let signIn = () => {
  try {
    // 1- Hitting the user store, and hitting a function that is used to LOG IN
    userStore.signIn(formState.email, formState.password);
    // 2- Change boolean isLoggedIn variable from the store
    isLoggedIn.value = true;
    // 3 - ReRoute the user to the home page
    router.push({ path: "/" });
  } catch (error) {
    // On failure, let's display an error message
    formState.errorMsg = error.message;
    // Hide this error message after a specific time
    // Hide after 8 seconds, remember that is using always milliseconds
    setTimeout(() => {
      formState.errorMsg = "";
    }, 8000);
  }
};

/*
  The signIn function handles the login process.
  - It validates the user's credentials using the signIn function from the user store.
  - On success, it sets isLoggedIn to true and redirects the user to the home page.
  - On failure, it displays an error message and hides it after 8 seconds.
  */
</script>

<style scoped>
label,
input {
  display: block;
}

button {
  margin: 0.5rem 0;
}



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
