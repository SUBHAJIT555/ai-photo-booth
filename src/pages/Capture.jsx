import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../component/Logo";

function Capture() {
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState();
  const [columns, setColumns] = useState([]);

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
    }
  }, [videoStream]);

  useEffect(() => {
    console.log("Mounting");
    getDevices();
    // startCamera();

    return () => {
      stopVideo();
    };
  }, [stopVideo]);

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-evenly flex-col">
      <Logo />

      <div>
        {!videoStream && (
          <button
            onClick={startCamera}
            className="text-zinc-200 bg-zinc-700 py-2 px-4 rounded-lg"
          >
            {columns.length > 0 ? "Start Camera" : "No Camera Found"}
          </button>
        )}
      </div>

      <video
        ref={videoRef}
        className=" bg-black rounded-2xl"
        autoPlay
        muted
        style={{ width: "640px", height: "480px" }} // Set fixed width and height
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
