export class PdfApi {
  async generatePdf(html) {
    const apiKey = import.meta.env.VITE_PDFSHIFT_API_KEY;

    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey, 
      },
      body: JSON.stringify({
        source: html,
        landscape: false,
        format: "A4",
        margin: "20mm",
      }),
    });

    if (!response.ok) {
      throw new Error("PDF generation failed");
    }

    return await response.blob();
  }
}
