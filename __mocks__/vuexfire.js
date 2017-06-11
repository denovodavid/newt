const vuexfire = {}

vuexfire.firebaseAction = (action) => {
  return function firebaseEnhancedActionFn (context, payload) {
    // get the local state and commit. These may be bound to a module
    // var state = context.state
    // var commit = context.commit
    context.bindFirebaseRef = function (key, source, options) {
      // if (options === void 0) options = {}

      // return bind({ state: state, commit: commit, key: key, source: source, options: options })
      options.readyCallback()
    }
    context.unbindFirebaseRef = function (key) {
      // return unbind({ commit: commit, key: key })
    }
    return action(context, payload)
  }
}

module.exports = vuexfire
