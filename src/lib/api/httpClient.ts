export const httpClient = {
  get: async (url: string, API_BASE_URL: string | undefined) => {
    const res = await fetch(`${API_BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        'accept': 'text/plain'
      }
    });
    if (!res.ok) throw new Error('Ошибка запроса');
    return res.json();
  },
  post: async (url: string, data: any, API_BASE_URL: string | undefined) => {
    const res = await fetch(`https://${url}.${API_BASE_URL}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Ошибка запроса');
    return res.json();
  },
};