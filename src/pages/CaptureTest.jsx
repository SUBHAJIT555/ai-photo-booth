import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../component/Logo";

function CaptureTest() {
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState();
  const [columns, setColumns] = useState([]);

  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setVideoStream(stream);
    }
  }

  function stopVideo() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }
  }

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

  useEffect(() => {
    getDevices();
    return () => {
      stopVideo();
    };
  }, []);

  return (
    <div className="App">
      <h1>
        <button
          onClick={() => {
            stopVideo();
          }}
        >
          stop
        </button>
      </h1>
      <ul>
        {columns.map((item) => (
          <li
            key={item.deviceId}
            onClick={() => {
              console.log(item);
              startCamera(item.deviceId);
            }}
          >
            <button> {item.label}</button>
          </li>
        ))}
      </ul>
      <video ref={videoRef} autoPlay muted />
    </div>
  );
}

export default CaptureTest;
