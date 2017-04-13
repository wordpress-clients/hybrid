function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
requireAll(require.context("./", true, /^\.\/.*\.cson$/));