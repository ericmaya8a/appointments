import { tryCatch } from './try-catch';

describe('tryCatch', () => {
  it('should return data', async () => {
    const [data, error] = await tryCatch(Promise.resolve({ message: 'All good' }));

    expect(data).toEqual({ message: 'All good' });
    expect(error).toBe(null);
  });

  it('should return an error', async () => {
    const [data, error] = await tryCatch(Promise.reject('Not Allowed'));

    expect(data).toBe(null);
    expect(error).toBe('Not Allowed');
  });
});
