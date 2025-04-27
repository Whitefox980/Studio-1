export async function logError(error: Error) {
  await fetch('/api/error-log', {
    method: 'POST',
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent
    })
  });
}

