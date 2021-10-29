import StringHelper from '../StringHelper';

describe('Test StringHelper', () => {
  it('capitalizeFirstLetter - Return correct value', () => {
    const result = StringHelper.capitalizeFirstLetter('cell suite');

    expect(result).toBe('Cell suite');
  });

  it('addSpaceBetweenCapitalizeLetter - Return correct value', () => {
    const result = StringHelper.addSpaceBetweenCapitalizeLetter('CellSuite');

    expect(result).toBe('Cell Suite');
  });
});
