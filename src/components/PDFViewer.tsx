import React from "react";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src={pdfUrl}
        className="w-full h-full border-none"
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;
