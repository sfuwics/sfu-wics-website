import type { Handler } from '@netlify/functions';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handler: Handler = async (event) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return {
      statusCode: 500,
      body: 'Missing GITHUB_TOKEN environment variable',
    };
  }

  // Optional: Log the incoming request for debugging
  console.log('Webhook triggered:', event.body);

  // Delay to allow Sanity content updates to propagate
  await sleep(5000);

  try {
    const response = await fetch('https://api.github.com/repos/sfuwics/sfu-wics-website/dispatches', {
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

    const text = await response.text();

    return {
      statusCode: response.status,
      body: text,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: `Webhook relay failed: ${error.message}`,
    };
  }
};

export { handler };
