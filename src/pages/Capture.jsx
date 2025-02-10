import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../component/Logo";
import { saveData } from "../utils/localStorageDB";
import { useNavigate } from "react-router-dom";

function Capture() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [columns, setColumns] = useState([]);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // const changeCapturedImageValue = (value) => {
  //   setCapturedImage(value);
  // };

  async function getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const cols = [];
    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        cols.push({
          label: device.label,
          deviceId: device.deviceId,
        });
      }
    });

    setColumns(cols);
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
      }
      console.log("Camera started");
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  }, []);

  const stopVideo = useCallback(() => {
    console.log("Stopping video");
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      setVideoStream(null);
    }
  }, [videoStream]);

  const captureImage = () => {
    setLoading(true);
    setCountdown(5);
  };

  const submitImage = () => {
    saveData("capturedImage", capturedImage);
    navigate("/avatar");
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      // Capture the image
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const image = canvasRef.current.toDataURL("image/png");
        setCapturedImage(image);
      }
      setLoading(false);
      setCountdown(null);
      stopVideo();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  useEffect(() => {
    console.log("Mounting");
    getDevices();

    return () => {
      stopVideo();
    };
  }, [stopVideo]);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col">
      <Logo />

      {/* Hidden canvas for capturing the image */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* Video Stream Section */}
      {!capturedImage ? (
        <div className="flex flex-col items-center py-2">
          <div className="relative">
            <video
              ref={videoRef}
              className="bg-black rounded-2xl shadow-lg"
              autoPlay
              muted
              style={{ width: "640px", height: "480px" }} // Set fixed width and height
            />
            {countdown && (
              <div className="absolute rounded-2xl top-0 left-0 right-0 bottom-0 flex items-center justify-center  bg-black bg-opacity-50">
                <p className="animate-ping text-white text-9xl font-bold">
                  {countdown}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            {!videoStream ? (
              <button
                onClick={startCamera}
                className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-3 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200"
              >
                {columns.length > 0
                  ? `Start Default Camera`
                  : "No Camera Found"}
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={captureImage}
                className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-3 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200"
              >
                Click here to capture
              </button>
            )}
          </div>
        </div>
      ) : (
        // Captured Image Section
        <div className="flex flex-col items-center py-2">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-2xl border-4 border-white shadow-lg"
            style={{ width: "640px", height: "480px" }}
          />
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                startCamera();
                setCapturedImage(null);
              }}
              className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-2 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200"
            >
              Retake
            </button>

            <button
              onClick={submitImage}
              className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-2 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Capture;
