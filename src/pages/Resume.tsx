import '../App.css';
import PDFViewer from "../components/PDFViewer"
import cv from '../assets/cv.pdf';

function Resume() {

    return (
      <div className="full-page-pdf">
        <PDFViewer pdfUrl={cv} />
      </div>
    )
  }
  
  export default Resume
  