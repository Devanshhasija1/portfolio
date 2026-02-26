'use client';

interface PdfViewerProps {
  url: string;
  className?: string;
}

export default function PdfViewer({ url, className }: PdfViewerProps) {
  return (
    <div className={`pdf-viewer-root ${className ?? ''}`}>
      <iframe
        src={`${url}#pagemode=none&navpanes=0&toolbar=0&view=FitH`}
        className="pdf-viewer-iframe"
        title="PDF Viewer"
      />
    </div>
  );
}
