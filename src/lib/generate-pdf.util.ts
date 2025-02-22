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
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
      putOnlyUsedFonts: true,
      precision: 2,
      pagebreak: {
        mode: ['css', 'legacy'],
        before: '.page-break'
      }
    }
  };

  try {
    await html2pdf()
      .set(opt)
      .from(element)
      .save();
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
