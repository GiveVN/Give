/**
 * category controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      // Temporarily allow public access
      ctx.state.auth = { strategy: { name: "public" } }

      const { data, meta } = await super.find(ctx)
      return { data, meta }
    },

    async findOne(ctx) {
      // Temporarily allow public access
      ctx.state.auth = { strategy: { name: "public" } }

      const { data, meta } = await super.findOne(ctx)
      return { data, meta }
    },
  })
)
