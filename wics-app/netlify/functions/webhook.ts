const fetch = require('node-fetch');

exports.handler = async function (event) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const res = await fetch('https://api.github.com/repos/sfuwics/sfu-wics-website/dispatches', {
    method: 'POST',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.everest-preview+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: 'sanity-update',
    }),
  });

  return {
    statusCode: res.status,
    body: await res.text(),
  };
};
