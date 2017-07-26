import WaterWall from '@/waterwall'

describe('WaterWall', () => {
  it('calculates the number of columns', () => {
    WaterWall.containerWidth = 210
    WaterWall.getColumns()
    expect(WaterWall.columns).toBe(2)
  })
})
