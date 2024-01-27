import { chars } from '../../src/js-foundation/02-destructuring';


describe('js-foundation/02-destructuring.ts', () => {
  test('chars should contain a and b', () => {
    // Arrange:
    const [a, b] = chars
    // Act:
    // Assert:
    expect(a).toBe('a');
    expect(b).toBe('b');
  })
})