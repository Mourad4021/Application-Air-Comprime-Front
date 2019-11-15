import { filterPipe } from './filter.pipe';

describe('UsesfilterPipe', () => {
  it('create an instance', () => {
    const pipe = new filterPipe();
    expect(pipe).toBeTruthy();
  });
});
