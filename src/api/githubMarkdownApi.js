export class GithubMarkdownApi {
  async render(markdownText) {
    const response = await fetch('https://api.github.com/markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        text: markdownText,
        mode: 'markdown'
      })
    });

    if (!response.ok) {
      throw new Error('Error GitHub Markdown API');
    }

    return await response.text();
  }
}