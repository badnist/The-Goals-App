<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Importing reactive from Vue to create a reactive form state object
import { reactive } from "vue";
// Importing useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Importing PersonalRouter component for navigation links
import PersonalRouter from "./PersonalRouter.vue";
// Importing the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";
import PageHeader from './/PageHeader.vue'
import PageFooter from './PageFooter.vue'


// ------------------------------------------------------------------------
// Variables Block
// ------------------------------------------------------------------------

// Route Variables for navigating users
// Remember they are just storing strings
// Not reactive in nature, so nor eff or reactive
const goToRoute = "/auth/login";
const buttonText = "Sign In";

// Consolidating input fields and error messages into a reactive object
const formState = reactive({
  email: "", // Stores the email input
  password: "", // Stores the password input
  confirmPassword: "", // Stores the confirm password input
  errorMsg: "", // Stores any error messages
});

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();

// ------------------------------------------------------------------------
// Functions Block
// ------------------------------------------------------------------------

// Function to handle the SignUp process
const signUp = () => {
  // Conditional Logic only using a simple IF statement
  if (formState.password === formState.confirmPassword) {
    try {
      // Utilizes the register function from the user store to register the user
      userStore.register(formState.email, formState.password);
      // On successful sign up, redirect the user to the login page
      router.push({ path: goToRoute });
    } catch (error) {
      // On failure, display an error message
      formState.errorMsg = error.message;
      // Automatically clear the error message after 5 seconds
      setTimeout(() => {
        formState.errorMsg = "";
      }, 5000);
    }
    return;
  }
  // Sets error message if passwords do not match
  formState.errorMsg = "Passwords do not match. Please try again.";
  setTimeout(() => {
    formState.errorMsg = "";
  }, 2000);
};

/*
  The signUp function handles the registration process.
  - It checks if the passwords match and, if so, calls the register function from the user store to register the user.
  - On successful registration, it redirects the user to the login page.
  - If there is an error during registration, it displays an error message and clears it after 5 seconds.
  - If the passwords do not match, it sets an error message and clears it after 2 seconds.
  */
</script>


<!--
This file defines a Vue.js component for the sign-up process in a to-do application.
By building this component, we will achieve a user interface that allows users to register by providing their email and password, with state management handled by Pinia.js.
-->

<template>
  <PageHeader class="page-header" />
  <div class="container">
    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Register to The Goals App</h3>
        <p class="header-subtitle">Start organizing your goals!</p>
      </div>
    </div>

    <form @submit.prevent="signUp" class="form-sign-in">
      <div class="form">
        <!-- Email Input Field -->
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input type="email" class="input-field" placeholder="example@gmail.com" id="email" v-model="formState.email"
            required />
        </div>


        <!-- Password Input Field -->
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input type="password" class="input-field" placeholder="**********" id="password" v-model="formState.password"
            required />
        </div>


        <!-- Confirm Password Input Field -->
        <div class="form-input">
          <label class="input-field-label">Confirm password</label>
          <input type="password" class="input-field" placeholder="**********" id="confirmPassword"
            v-model="formState.confirmPassword" required />
        </div>



        <p>
          Have an account?
          <!-- PersonalRouter component for navigation -->
          <PersonalRouter :route="goToRoute" :buttonText="buttonText" class="sign-up-link" />
        </p>
        <br />
        <fieldset>
          <label class="horizontal-label terms">
            <span>
              <input type="checkbox" name="accepts-terms" required v-model="acceptsTerms" />
            </span>

            <span>
              Creating an account means you're okay with our
              <RouterLink to="/docs/terms-of-service">Terms of Service</RouterLink>,
              <RouterLink to="/docs/privacy-policy">Privacy Policy</RouterLink>, and our default
              <RouterLink to="/settings/notifications">Notification Settings</RouterLink>.
            </span>
          </label>
        </fieldset>
        <button type="submit" class="button-primary">Create new User</button>
      </div>
    </form>

    <!-- Display error message if any -->
    <div v-show="formState.errorMsg">{{ formState.errorMsg }}</div>
  </div>

  <PageFooter class="page-footer" />
</template>


<style>
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
  scrollbar-color: rgb(199, 1, 1) transparent;
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