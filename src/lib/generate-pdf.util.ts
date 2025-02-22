import html2pdf from 'html2pdf.js'


interface PDFGenerationOptions {
  element: HTMLElement
  isImageLoaded: boolean
  filename?: string
}

export const generatePDF = async ({ element, isImageLoaded, filename = 'resume.pdf' }: PDFGenerationOptions): Promise<void> => {
  if (!element || !isImageLoaded) {
    throw new Error('Element not found or image not loaded')
  }

  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: true,
      dpi: 300,
      letterRendering: true,
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
      putOnlyUsedFonts: true,
      precision: 2,
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }
  };

  try {
    await html2pdf()
    .set(opt)
    .from(element)
    .toPdf()
    .get('pdf')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((pdf: any) => {
      // Remove any blank pages
      if (pdf.internal.getNumberOfPages() > 1) {
        for (let i = pdf.internal.getNumberOfPages(); i > 1; i--) {
          pdf.deletePage(i);
        }
      }
      pdf.save(filename);
    });
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
