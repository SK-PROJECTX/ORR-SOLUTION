export const fetchCSRFToken = async (): Promise<void> => {
  try {
    await fetch('https://orr-backend-web-latest.onrender.com/api/csrf/', {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {
    console.warn('Failed to fetch CSRF token:', error);
  }
};

export const initializeCSRF = async (): Promise<void> => {
  await fetchCSRFToken();
};