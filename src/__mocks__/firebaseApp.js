export const firebaseApp = {
  auth () {
    return {
      currentUser: {
        uid: 'mocked-uid'
      },
      signInWithEmailAndPassword () {}
    }
  }
}

let ref = {}

ref = {
  push (value, onComplete = null) {
    if (onComplete != null) onComplete()
  },
  update (value, onComplete = null) {
    if (onComplete != null) onComplete()
  },
  remove (onComplete = null) {
    if (onComplete != null) onComplete()
    return new Promise((resolve, reject) => { resolve() })
  },
  child () {
    return ref
  }
}

export const db = {
  ref () {
    return ref
  }
}
