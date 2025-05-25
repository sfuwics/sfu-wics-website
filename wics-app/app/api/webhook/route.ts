import { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));

  const triggerBuild = async () => {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    const payload = JSON.parse(event.body || '{}');

    if (payload.event_type !== 'sanity-update') {
      return {
        statusCode: 400,
        body: 'Invalid event_type',
      };
    }

    const githubRes = await fetch(`https://api.github.com/repos/sfuwics/sfu-wics-website/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.everest-preview+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'sanity-update' }),
    });

    if (!githubRes.ok) {
      return {
        statusCode: githubRes.status,
        body: `GitHub API error: ${await githubRes.text()}`,
      };
    }

    return {
      statusCode: 200,
      body: 'Dispatch triggered successfully',
    };
  };

  try {
    return await Promise.race([triggerBuild(), timeout]);
  } catch (err) {
    return {
      statusCode: 500,
      body: `Webhook failed: ${(err as Error).message}`,
    };
  }
};

export { handler };
