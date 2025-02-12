import Logo from "../component/Logo";
import {
  IoDownloadSharp,
  IoHome,
  IoPrintSharp,
  IoQrCode,
} from "react-icons/io5";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Label from "../component/Label";
import { saveAs } from "file-saver";
// import toast from "react-hot-toast";
import QRModal from "../component/QRModal";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";

function Preview() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const { resultUrl } = useLocation()?.state || {};
  const [searchParams] = useSearchParams();

  const url = searchParams.get("resultUrl");

  const finalUrl = resultUrl || url;

  // Function for unique filename
  const generateUniqueFilename = (extensions) => {
    const currentTime = new Date().getTime();
    return `result_${currentTime}.${extensions}`;
  };

  // handle download button click
  const handleDownload = () => {
    saveAs(finalUrl, generateUniqueFilename("png"));
  };

  // Helper function to convert Uint8Array to Base64
  const uint8ArrayToBase64 = (uint8Array) => {
    let binary = "";
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
  };

  const printImageAsPDF = async () => {
    try {
      // Fetch the image as a Blob
      const response = await fetch(finalUrl);
      const imageBlob = await response.blob();
      const imageArrayBuffer = await imageBlob.arrayBuffer();

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([288, 432]); // 4x6 inches in points (1 inch = 72 points)

      // Embed the image into the PDF
      const image = await pdfDoc.embedJpg(imageArrayBuffer);
      const { width, height } = image.scale(0.25);

      // Calculate position to center the image
      const x = (page.getWidth() - width) / 2;
      const y = (page.getHeight() - height) / 2;

      // Draw image on PDF
      page.drawImage(image, { x, y, width, height });

      // Convert PDF to Uint8Array
      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = uint8ArrayToBase64(new Uint8Array(pdfBytes)); // Proper encoding

      // console.log(pdfBase64);

      download(pdfBytes, generateUniqueFilename("pdf"));

      // Send the PDF to PrintNode
      const apiKey = "YOUR_PRINTNODE_API_KEY"; // Replace with actual API key
      const printerId = "YOUR_PRINTER_ID"; // Replace with actual printer ID

      const printJob = {
        printerId: printerId,
        title: "PDF Print Job",
        contentType: "pdf_base64",
        content: pdfBase64,
        source: "React Web App",
        options: {
          fit_to_page: true,
        },
      };

      const responsePrint = await fetch("https://api.printnode.com/printjobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(apiKey + ":")}`,
        },
        body: JSON.stringify(printJob),
      });

      if (responsePrint.ok) {
        console.log("Print job sent successfully!");
      } else {
        console.error("Print failed:", await responsePrint.json());
      }
    } catch (error) {
      console.error("Error processing print job:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col px-4">
      <Logo />
      <div className="group mx-auto w-full bg-red-200 rounded-xl overflow-hidden max-w-[400px]">
        <Label />
        {finalUrl && (
          <div className="h-[85%] w-full overflow-hidden">
            <img
              src={finalUrl}
              alt="Generated result"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        {/* {resultUrl && (
          <div className="w-full h-full">
            <img
              src={resultUrl}
              alt="Generated Avatar"
              className="w-full h-full object-cover object-center"
            />
          </div>
        )} */}
      </div>

      <div className="flex flex-wrap justify-center gap-10 text-zinc-200 ">
        <button
          onClick={printImageAsPDF}
          className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700"
        >
          <IoPrintSharp className="text-xl md:text-3xl" />
        </button>
        <button
          onClick={handleDownload}
          className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700"
        >
          <IoDownloadSharp className="text-xl md:text-3xl" />
        </button>
        <button
          onClick={() => setIsQRModalOpen(true)}
          className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700"
        >
          <IoQrCode className="text-xl md:text-3xl" />
        </button>
        <Link to="/home">
          <button className="border-[2px] border-zinc-300 p-2 rounded-lg hover:bg-zinc-800 bg-zinc-700">
            <IoHome className="text-xl md:text-3xl" />
          </button>
        </Link>
      </div>

      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        data={finalUrl}
      />
    </div>
  );
}

export default Preview;
