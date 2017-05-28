import { firebaseApp } from '../../../src/firebase'

describe('Firebase', () => {
  xit('should load the config without crashing', () => {
    expect(firebaseApp).not.toBeUndefined()
  })
})
