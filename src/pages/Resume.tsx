import PDFViewer from "../components/PDFViewer"

function Resume() {

    return (
		<div className="full-page-pdf">
			<PDFViewer pdfUrl={'CV.pdf'} />
		</div>
    )
  }
  
  export default Resume
  