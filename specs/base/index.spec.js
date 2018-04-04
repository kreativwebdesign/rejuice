import { call } from '../../src/base';

describe('transformers', () => {
  it('should call callback once', () => {
    const callback = jasmine.createSpy('stub');
    const data = {

    };
    call(callback)(data);
    expect(callback).toHaveBeenCalledWith(data);
  });
});
