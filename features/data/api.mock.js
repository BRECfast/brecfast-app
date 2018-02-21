import MockAdapter from 'axios-mock-adapter';

let mockInstance;
export default function mock(axiosInstance, config) {
  mockInstance = mockInstance || new MockAdapter(axiosInstance);
  return mockInstance;
}

export async function delay(ms) {
  return await new Promise(r => {
    setTimeout(r, ms);
  });
}
