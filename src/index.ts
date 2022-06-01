if (window.navigator.product === 'ReactNative') {
  require('./index.native')
} else {
  require('./index.web')
}
