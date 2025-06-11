import { createRouter, createWebHistory } from "vue-router";
import { useLoginAuthStore } from "@/stores/loginAuthStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/auth/login.vue"),
    },
    {
      path: "/certificate/:id",
      name: "CertificateView",

      component: () => import("../views/Certeficate/CertificateView.vue"),
    },
    {
      path: "/",
      name: "",
      component: () => import("../views/index.vue"),
      children: [
        {
          path: "/training",
          name: "TrainingNav",

          component: () => import("../views/Training/TrainingNav.vue"),
          children: [
            {
              path: "",
              name: "TrainingNav",
              component: () => import("@/views/Training/NewTrainingUi.vue"),
            },

            {
              path: ":id",
              name: "TrainingDetails",
              component: () => import("@/views/Training/TrainingDetails.vue"),
              children: [
                {
                  path: "details",
                  name: "TrainingDetailsView",

                  component: () =>
                    import("../views/Training/SelectedTrainingDetails.vue"),
                },
                {
                  path: "sessions",
                  name: "TrainingSessions",
                  component: () =>
                    import("@/views/Training/TrainingSessionHomePage.vue"),
                },
                // {
                //   path: "TrainingCourse",
                //   name: "TrainingCourse",

                //   component: () =>
                //     import("../views/Training/TrainingAddCourse.vue"),
                // },

                // {
                //   path: "sessions",
                //   name: "TrainingSessionss",

                //   component: () =>
                //     import("../views/Training/TrainingSessionHomePage.vue"),
                // },

                {
                  path: "guests",
                  name: "TrainingGuestView",

                  component: () =>
                    import("../views/Users/SelectedTrainingGuestAssign.vue"),
                },
                {
                  path: "teams",
                  name: "TrainingTeamView",

                  component: () =>
                    import("../views/Users/SelectedTrainingTeamAssign.vue"),
                },
                {
                  path: "enrollments",
                  name: "TrainingEnrollmentView",

                  component: () =>
                    import("../views/Resource/SelectedTrainingEnrollment.vue"),
                },
                {
                  path: "resources",
                  name: "TrainingResourcesView",

                  component: () =>
                    import(
                      "../views/Resource/SelectedTrainingResourceAssign.vue"
                    ),
                },
                {
                  path: "attendance",
                  name: "TrainingAttendanceView",

                  component: () =>
                    import("../views/Users/SelectedTrainingAttendance.vue"),
                },
              ],
            },
            // {
            //   path: "/training",
            //   name: "Trainings",
            //   component: () => import("@/views/Training/Trainings.vue"),
            // },
            {
              path: "/team",
              name: "Team",
              component: () => import("@/views/Training/TeamHomePage.vue"),
            },
            {
              path: "/sessions",
              name: "Sessions",
              component: () =>
                import("@/views/Training/TrainingSessionHomePage.vue"),
            },
            {
              path: "/course",
              name: "CourseHome",
              component: () => import("@/views/Training/CourseHomePage.vue"),
            },
          ],
        },
        {
          path: "/",
          name: "Dashboard",
          component: () => import("@/views/dashboard.vue"),
        },
        {
          path: "/users",
          name: "Users",
          component: () => import("@/views/Users/UserNav.vue"),
          children: [
            {
              path: "/users",
              name: "Users",

              component: () => import("../views/Users/UserRegistration.vue"),
            },
            {
              path: "guest",
              name: "Guest",

              component: () => import("../views/Users/GuestHomePage.vue"),
            },
            {
              path: "participant",
              name: "Participant",
              component: () => import("@/views/Users/ParticipantHomePage.vue"),
            },
            // {
            //   path: "/attendance",
            //   name: "Attendance",
            //   component: () => import("@/views/Users/Attendance.vue"),
            // },
          ],
        },
        // {
        //   path: "/payment",
        //   name: "PaymentNav",
        //   component: () => import("@/views/Payment/PaymentNav.vue"),
        //   children: [
        //     {
        //       path: "/payment",
        //       name: "Payments",

        //       component: () => import("../views/Payment/Payments.vue"),
        //     },
        //     {
        //       path: "/sponsor",
        //       name: "Sponsor",

        //       component: () => import("../views/Payment/Sponsor.vue"),
        //     },
        //     {
        //       path: "/allowance",
        //       name: "Allowance",

        //       component: () => import("../views/Payment/Allowance.vue"),
        //     },
        //   ],
        // },
        {
          path: "/resource",
          name: "Resources",
          component: () => import("@/views/Resource/ResourceNav.vue"),
          children: [
            {
              path: "/resource",
              name: "Resources",

              component: () => import("../views/Resource/Resource.vue"),
            },
            // {
            //   path: "/enrollment",
            //   name: "Enrollment",

            //   component: () => import("../views/Resource/Enrollment.vue"),
            // },
            // {
            //   path: "/assign",
            //   name: "Assign",

            //   component: () => import("../views/Resource/Assign.vue"),
            // },
          ],
        },
        {
          path: "/certificate",
          name: "Certificate",
          component: () =>
            import("@/views/Certeficate/CerteficateHomePage.vue"),
          children: [],
        },

        {
          path: "/configuration",
          name: "Config",
          component: () => import("@/views/Configuration/ConfigNav.vue"),
          children: [
            {
              path: "userrole",
              name: "UserRole",
              component: () =>
                import("@/views/Configuration/UserRoleHomePage.vue"),
            },
            {
              path: "paymentmethod",
              name: "PayMethod",
              component: () =>
                import("@/views/Configuration/PaymentMethod.vue"),
            },
            {
              path: "teamrole",
              name: "TeamRole",
              component: () => import("@/views/Configuration/TeamRole.vue"),
            },
            {
              path: "category",
              name: "Category",
              component: () => import("@/views/Configuration/Category.vue"),
            },
          ],
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/Profile/ProfileHomePage.vue"),
        },
      ],
    },
  ],
});

// Navigation guard using loginAuthStore
router.beforeEach((to, from, next) => {
  const loginAuthStore = useLoginAuthStore();

  // Always allow access to login page
  if (to.name === "Login") {
    return next();
  }

  // Check token validity and update state if needed
  const token = loginAuthStore.extractToken();
  if (!token || !loginAuthStore.verifyToken()) {
    // Not authenticated or token invalid/expired
    return next({ name: "Login" });
  }

  // Authenticated, allow navigation
  return next();
});

export default router;
