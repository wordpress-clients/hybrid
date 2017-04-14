// import './en.cson';

function requireAll(requireContext) {

  return requireContext.keys().forEach((test) => {
    console.log('test', test)
  });
}
  try {
    requireAll(require.context("./", true, /^\.\/.*\.json$/));
  } catch (error) {
    console.error('requireAll', error)
  }


// console.log('test', require.context("./", true, /^\.\/.*\.json$/))
// import '!file-loader?name=/i18n/[name].json!./en.cson';

