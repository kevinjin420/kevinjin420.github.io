import React from "react";

interface PDFViewerProps {
  pdfUrl: string;
  width?: string;
  height?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  width = "100%",
  height = "100%",
}) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <iframe
        src={pdfUrl}
        width={width}
        height={height}
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;
