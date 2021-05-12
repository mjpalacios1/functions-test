exports.handler = async event => {
  const subject = event.queryStringParameters.name || 'World'
  return {
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
    },
    statusCode: 200,
    body: `Hello ${subject}!`
  }
}
