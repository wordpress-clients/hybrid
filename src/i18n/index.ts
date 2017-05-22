try {
  require.context("./", true, /^\.\/.*\.cson$/)
} catch (error) {
  console.error('requireAll', error)
}