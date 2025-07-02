export default {
  routes: [
    {
      method: "GET",
      path: "/user-profile/me",
      handler: "user-profile.me",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/user-profile/search",
      handler: "user-profile.search",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/user-profile/:id",
      handler: "user-profile.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/user-profile",
      handler: "user-profile.update",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/user-profile/avatar",
      handler: "user-profile.uploadAvatar",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/user-profile/:id/activity",
      handler: "user-profile.activityFeed",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}
