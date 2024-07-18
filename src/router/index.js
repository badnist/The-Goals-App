// This file sets up the routing configuration for a Vue.js application using Vue Router.
// It defines the routes and their corresponding components, including nested routes for authentication pages.

// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import createRouter and createWebHistory from vue-router to set up the router
import { createRouter, createWebHistory } from "vue-router";
// Import page components for routing
import HomePage from "../pages/HomePage.vue";
import AboutPage from "../pages/AboutPage.vue";
import AllGoalsPage from "../pages/AllGoalsPage.vue";
import CompletedGoalsPage from "../pages/CompletedGoalsPage.vue";
import AddGoalPage from "../pages/AddGoalPage.vue";
import AuthPage from "../pages/AuthPage.vue";
// Import components for nested routes
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

// ------------------------------------------------------------------------
// Router Configuration Block
// ------------------------------------------------------------------------

// Create a new router instance
const router = createRouter({
  // Use createWebHistory for history mode routing
  history: createWebHistory(import.meta.env.BASE_URL),
  // Define the routes for the application
  routes: [
    {
      path: "/", // Path for the home page
      name: "home", // Name of the route
      component: HomePage, // Component to render
    },
    {
      path: "/about", // Path for the about page
      name: "about", // Name of the route
      component: AboutPage, // Component to render
    },
    {
      path: "/all-goals", // Path for the all goals page
      name: "all goals page", // Name of the route
      component: AllGoalsPage, // Component to render
    },
    {
      path: "/completed-goals", // Path for the completed goals page
      name: "completed goals page", // Name of the route
      component: CompletedGoalsPage, // Component to render
    },
    {
      path: "/add-goal", // Path for the add goal page
      name: "add new goal page", // Name of the route
      component: AddGoalPage, // Component to render
    },
    // Nested routes for authentication
    {
      path: "/auth", // Parent path for authentication routes
      name: "Parent structure for nested routes, only using a RouterView", // Name of the route
      component: AuthPage, // Component to render
      // Define the nested routes
      children: [
        // Nested Route #1 for login
        {
          path: "login", // Path for the login route
          name: "Login Nested Route", // Name of the route
          component: SignIn, // Component to render
        },
        // Nested Route #2 for register
        {
          path: "register", // Path for the register route
          name: "Register Nested Route", // Name of the route
          component: SignUp, // Component to render
        },
      ],
    },
  ],
});

// Export the router instance
export default router;

/*
Summary:
This file defines the routing configuration for a Vue.js application. It includes routes for home, about, all goals, completed goals, and add goals pages. It also sets up nested routes for authentication (login and register) under the "/auth" path. The router is configured using createRouter and createWebHistory from vue-router.
*/
