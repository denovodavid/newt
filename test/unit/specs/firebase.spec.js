import { firebaseApp } from '@/firebaseApp'

describe('Firebase', () => {
  it('should load the config without crashing', () => {
    expect(firebaseApp).not.toBeUndefined()
  })
})
