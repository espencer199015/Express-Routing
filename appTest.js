const request = require('supertest');
const app = require('../app');

describe('Mean, Median, and Mode API', () => {
  it('calculates mean correctly', async () => {
    const response = await request(app).get('/mean?nums=1,3,5,7');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mean', value: 4 });
  });

  it('calculates median correctly with odd number of elements', async () => {
    const response = await request(app).get('/median?nums=1,3,5,7');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 4 });
  });

  it('calculates median correctly with even number of elements', async () => {
    const response = await request(app).get('/median?nums=1,3,5,7,9');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 5 });
  });

  it('calculates mode correctly', async () => {
    const response = await request(app).get('/mode?nums=1,3,5,7,3,7');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mode', value: 3 });
  });

  it('handles empty input for mean', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });

  it('handles empty input for median', async () => {
    const response = await request(app).get('/median');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });

  it('handles empty input for mode', async () => {
    const response = await request(app).get('/mode');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });

  it('handles invalid number for mean', async () => {
    const response = await request(app).get('/mean?nums=foo,2,3');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid number in the nums list' });
  });

  it('handles invalid number for median', async () => {
    const response = await request(app).get('/median?nums=foo,2,3');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid number in the nums list' });
  });

  it('handles invalid number for mode', async () => {
    const response = await request(app).get('/mode?nums=foo,2,3');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid number in the nums list' });
  });

  afterAll(done => {
    app.close(done);
  });
});
