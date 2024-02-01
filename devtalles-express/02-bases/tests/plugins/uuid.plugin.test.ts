import { getUUID } from "../../src/plugins";

describe('plugins/uuid.plugin.ts', () => {
  test('getUUID() should return a string', () => {
    // Assert:
    // Act:
    const uuid = getUUID()
    // Arrange:
    expect(typeof uuid).toBe('string')
    expect(uuid.length).toBe(36)
  })
})