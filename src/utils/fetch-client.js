

export const fetchClient = async (url, options = {}) => {
const baseUrl = import.meta.env.VITE_API_BASE_URL

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  
  return response.json().then(data => {
    if (!response.ok) {
      throw data;
    } else {
      return data;
    }
  })
}

export const post = async (url, body, token) => {
  return fetchClient(url, {
    method: 'POST',
    body,
    headers: {
      ...token && { 'Authorization': `Bearer ${token}` },
    },
  });
}

export const get = async (url, token) => {
  return fetchClient(url, {
    method: 'GET',
    headers: {
      ...token && { 'Authorization': `Bearer ${token}` },
    },
  });
}

export const put = async (url, body, token) => {
  return fetchClient(url, {
    method: 'PUT',
    body,
    headers: {
      ...token && { 'Authorization': `Bearer ${token}` },
    },
  });
}

export const del = async (url, token) => {
  return fetchClient(url, {
    method: 'DELETE',
    headers: {
      ...token && { 'Authorization': `Bearer ${token}` },
    },
  });
}