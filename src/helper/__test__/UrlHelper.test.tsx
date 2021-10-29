import { getCurrentPath, getParam } from '../UrlHelper';

describe('Test UrlHelper', () => {
  it('GetParam - Return correct value', () => {
    const urlString = 'https://www.domain.com/path1?val1=1&val2=2';

    const result1 = getParam({ urlString, paramName: 'val1' });
    const result2 = getParam({ urlString, paramName: 'val2' });

    expect(result1).toBe('1');
    expect(result2).toBe('2');
  });

  it('GetCurrentPath - Return correct value', () => {
    const currentPath = 'path1';
    const url = `https://www.domain.com/${currentPath}`;

    const path = getCurrentPath(url);
    expect(path).toBe(currentPath);
  });
});
