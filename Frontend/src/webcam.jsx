import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>React Webcam Example</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }}
      />
      <br />
      <button onClick={capture} style={{ marginTop: "10px", padding: "10px" }}>
        Capture Photo
      </button>
      <br />
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img
            src={image}
            alt="Captured"
            style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
