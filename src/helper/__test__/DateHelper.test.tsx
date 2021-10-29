import FormatDateEnum from '../../enums/FormatDateEnum';
import DateHelper from '../DateHelper';

describe('Test DateHelper', () => {
  it('numberToHours - Return correct value', () => {
    const result = DateHelper.formatDateToString('2021-10-10 10:10:10', FormatDateEnum.YYYY_MM_DD as any);
    const result2 = DateHelper.formatDateToString('2021-10-10 10:10:10', FormatDateEnum.YYYY_MM_DD_H_M as any);

    expect(result).toBe('2021-10-10');
    expect(result2).toBe('2021-10-10 10:10 AM');
  });
});
