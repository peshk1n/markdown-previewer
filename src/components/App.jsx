import { useEffect, useState } from 'react';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { Controls } from './Controls';
import { GithubMarkdownApi } from '../api/githubMarkdownApi';
import '../../styles/App.css';

const api = new GithubMarkdownApi();


export function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!markdown) {
      setHtml('');
      return;
    }

    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const result = await api.render(markdown);
        setHtml(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [markdown]);


  return (
  <div className="app-container">

    <div className="workspace">
      <div className="editor-column">
        <Editor value={markdown} onChange={setMarkdown} />
      </div>

      <div className="preview-column">
        <Controls markdown={markdown} html={html} />

        <div className="preview-wrapper">
          <Preview html={html} />
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </div>

  </div>
);
}