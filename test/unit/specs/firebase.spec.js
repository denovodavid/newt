import { firebaseApp } from '../../../src/firebase'

describe('Firebase', () => {
  it('should load the config without crashing', () => {
    expect(firebaseApp).not.toBeUndefined()
  })
})
