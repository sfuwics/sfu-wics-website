import type { Handler } from '@netlify/functions';

// Increased timeout to ensure build stability
const BUILD_STABILITY_DELAY = 10000; // 10 seconds

const handler: Handler = async (event) => {
  // Skip if this is a Netlify auto-build to prevent infinite loops
  if (process.env.NETLIFY_AUTO_BUILD === 'true') {
    return {
      statusCode: 200,
      body: 'Skipping build-trigger during auto-build',
    };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return {
      statusCode: 500,
      body: 'Missing GITHUB_TOKEN environment variable',
    };
  }

  console.log('Sanity webhook triggered:', event.body);

  try {
    // 1. First verify the function is properly deployed
    const selfTest = await fetch(`${process.env.URL}/.netlify/functions/webhook`, {
      method: 'HEAD',
    });

    if (!selfTest.ok) {
      throw new Error('Function endpoint not properly deployed');
    }

    // 2. Wait longer for content propagation and build stability
    await new Promise(resolve => setTimeout(resolve, BUILD_STABILITY_DELAY));

    // 3. Trigger GitHub dispatch
    const response = await fetch('https://api.github.com/repos/sfuwics/sfu-wics-website/dispatches', {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.everest-preview+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'sanity-update',
        client_payload: {
          sanity_webhook: true,
          timestamp: new Date().toISOString()
        }
      }),
    });

    // 4. Verify GitHub response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${errorText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'GitHub dispatch triggered successfully'
      }),
    };

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};

export { handler };