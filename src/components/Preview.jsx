import React from 'react';
import 'github-markdown-css/github-markdown.css';


export function Preview({ html }) {
  return <div className="preview markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
}