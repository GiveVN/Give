/**
 * Custom project routes
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/projects/:id/progress',
      handler: 'project.getProgress',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/projects/:id/update-funding',
      handler: 'project.updateFunding',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/projects/:id/statistics',
      handler: 'project.getStatistics',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 