const path = require("path")

const buildEslintCommand = (filenames) => {
  // Convert Windows paths to POSIX for next lint
  const files = filenames
    .map((f) => {
      const relativePath = path.relative(process.cwd(), f)
      // Replace backslashes with forward slashes for Windows compatibility
      return relativePath.replace(/\\/g, "/")
    })
    .join(" --file ")

  return `next lint --fix --file ${files}`
}

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
}
