import { PdfApi } from '../api/pdfApi';

export function Controls({ markdown, html }) {
  const pdfApi = new PdfApi();

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy!"));
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };


const handleDownloadPDF = async () => {
  try {
    const fullHtml = buildFullHtml(html, "0mm");
    const pdfBlob = await pdfApi.generatePdf(fullHtml);

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "document.pdf";
    a.click();

    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
    alert("Failed to generate PDF");
  }
};


function buildFullHtml(content, padding = "20mm") {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Markdown Preview</title>

  <!-- GitHub Markdown CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css" />

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    .page {
      width: 210mm;               
      margin: 0 auto;             
      padding: ${padding};              
      box-sizing: border-box;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .page-break {
      page-break-before: always;
    }

    .markdown-body {
      flex: 1;           
      overflow: hidden;  
    }

    @media print {
  .page {
    padding: 0;
  }
  </style>
</head>
<body>
  <div class="page">
    <article class="markdown-body">
      ${content}
    </article>
  </div>
</body>
</html>
`;
}




  const handleOpenHTML = () => {
  const fullHtml = buildFullHtml(html);
  const w = window.open();
  w.document.write(fullHtml);
  w.document.close();
};


  return (
    <div className="controls" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <button onClick={handleCopyMarkdown}>Copy Markdown</button>
      <button onClick={handleDownloadMarkdown}>Download .md</button>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <button onClick={handleOpenHTML}>Open HTML</button>
    </div>
  );
}
