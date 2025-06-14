import { mergeConfig } from "vite"
import path from "path"

import type { UserConfig } from "vite"

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
        "@repo/design-system": path.resolve(__dirname, "../../../../packages/design-system/dist"),
        "@repo/shared-data": path.resolve(__dirname, "../../../../packages/shared-data/dist"),
      },
    },
  } as UserConfig)
}
