exports.handler = async function (event) {
  const { lat, lon } = event.queryStringParameters || {};
  if (!lat || !lon) {
    return { statusCode: 400, body: JSON.stringify({ error: 'lat and lon required' }) };
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d83f84f4ec74e0194482ddfa6173b45&units=metric`;
  const upstream = await fetch(url);
  const body = await upstream.text();
  return {
    statusCode: upstream.status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=600',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
    },
    body,
  };
};
