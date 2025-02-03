import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../component/Logo";

function Capture() {
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  // Stop camera stream
  const stopVideoStream = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access error:", error);
    }
  }, []);

  useEffect(() => {
    startCamera();
    // Cleanup on unmount
    return () => stopVideoStream();
  }, [startCamera, stopVideoStream]);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col">
      <Logo />

      <div>
        <button
          onClick={stopVideoStream}
          className="text-zinc-200 bg-zinc-700 py-2 px-4 rounded-lg"
        >
          Stop Camera
        </button>
      </div>

      <video
        ref={videoRef}
        className="w-1/2 h-1/2 bg-zinc-700 rounded-2xl"
        autoPlay
        muted
        playsInline
      />

      <Link to="/submitorretake">
        <button className="capitalize text-zinc-200 tracking-tight font-light bg-zinc-700 py-3 px-5 rounded-full border-2 border-transparent hover:bg-zinc-900 hover:border-zinc-200">
          Click here to capture
        </button>
      </Link>
    </div>
  );
}

export default Capture;
