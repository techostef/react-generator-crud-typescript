import NumberHelper from '../NumberHelper';

describe('Test NumberHelper', () => {
  it('countDecimals - Return correct value', () => {
    const result = NumberHelper.countDecimals(0.4444);

    expect(result).toBe(4);
  });
});
