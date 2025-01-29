import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/mybtn",
      name: "mybtn",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: "/userregistration",
      name: "userregistration",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/UserRegistration.vue"),
    },
    {
      path: "/trainingNavigation",
      name: "TrainingNavigation",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/TrainingNavigations.vue"),
    },
    {
      path: "/config",
      name: "Config",
      component: () => import("@/views/Configuration.vue"),
      children: [
        {
          path: "userRole",
          name: "UserRole",
          component: () => import("@/views/UserRoleHomePage.vue"),
        },
        {
          path: "paymethod",
          name: "PayMethod",
          component: () => import("@/views/PaymentMethod.vue"),
        },
        {
          path: "teamRole",
          name: "TeamRole",
          component: () => import("@/views/TeamRole.vue"),
        },
        {
          path: "category",
          name: "Category",
          component: () => import("@/views/Category.vue"),
        },
      ],
    },
    {
      path: "/userNavigatiom",
      name: "UserNavigation",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../components/UsersNavigation.vue"),
    },

    {
      path: "/training",
      name: "Training",
      component: () => import("@/views/TraininigHomePage.vue"),
      children: [
        {
          path: "/addTraining",
          name: "AddTraining",
          component: () => import("@/views/TraininigRegistration.vue"),
        },
        {
          path: "sessions",
          name: "Sessions",
          component: () => import("@/views/TrainingSessionHomePage.vue"),
        },
        {
          path: "team",
          name: "Team",
          component: () => import("@/views/TeamHomePage.vue"),
        },
        {
          path: "courseHome",
          name: "CourseHome",
          component: () => import("@/views/CourseHomePage.vue"),
        },
        {
          path: "trainings",
          name: "Trainings",
          component: () => import("@/views/Trainings.vue"),
        },
      ],
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("@/views/UsersHomePage.vue"),
      children: [
        {
          path: "guest",
          name: "Guest",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/GuestHomePage.vue"),
        },
        {
          path: "participant",
          name: "Participant",
          component: () => import("@/views/ParticipantHomePage.vue"),
        },
        {
          path: "enroll",
          name: "Enroll",
          component: () => import("@/views/Enrollment.vue"),
        },
        {
          path: "userregistration",
          name: "userregistration",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/UserRegistration.vue"),
        },
      ],
    },

    {
      path: "/payment",
      name: "Payment",
      component: () => import("@/views/PaymentHomePage.vue"),
    },

    {
      path: "/resource",
      name: "Resources",
      component: () => import("@/views/ResourceHomePage.vue"),
    },
    {
      path: "/certificate",
      name: "Certificate",
      component: () => import("@/views/CerteficateHomePage.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/ProfileHomePage.vue"),
    },
    {
      path: "/addCourse",
      name: "AddCource",
      component: () => import("@/views/CourseRegigistration.vue"),
    },
    {
      path: "/addCourse",
      name: "AddCource",
      component: () => import("@/views/CourseRegigistration.vue"),
    },
    {
      path: "/reports",
      name: "Reports",
      component: () => import("@/views/Reports.vue"),
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/views/dashboard.vue"),
        },
      ],
    },
  ],
});

export default router;
