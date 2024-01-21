const request = require('supertest');
const app = require('./server');

describe('POST /processData', () => {
  it('handles missing parameters', async () => {
    const response = await request(app)
      .post('/processData')
      .send({}); // Send an empty object to simulate missing parameters

    expect(response.status).toBe(500);
    expect(response.text).toBe('missing parameters...');
  });

  // Add other test cases as needed
});

