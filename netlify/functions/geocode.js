exports.handler = async function (event) {
  const { q, limit = '5' } = event.queryStringParameters || {};
  if (!q) {
    return { statusCode: 400, body: JSON.stringify({ error: 'q required' }) };
  }
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=6d83f84f4ec74e0194482ddfa6173b45`;
  const upstream = await fetch(url);
  const body = await upstream.text();
  return {
    statusCode: upstream.status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
    },
    body,
  };
};
