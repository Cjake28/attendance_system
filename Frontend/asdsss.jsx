import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);

  // Student data state
  const [studentData, setStudentData] = useState({
    name: "",
    username: "",
    password: "",
    section: "",
    role: "student",
    parent_email: "",
    rfid_tag: "",
  });

  const capture = () => {
    if (images.length < 5) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPreviewImage(imageSrc);
    } else {
      alert("You already captured 5 images!");
    }
  };

  const confirmImage = () => {
    if (previewImage) {
      setImages([...images, previewImage]);
      setPreviewImage(null);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const uploadData = async () => {
    if (images.length < 5) {
      alert("You must capture 5 images before uploading.");
      return;
    }

    const formData = new FormData();

    // Append student data fields
    Object.keys(studentData).forEach((key) => {
      formData.append(key, studentData[key]);
    });

    // Append images
    images.forEach((img, index) => {
      const blob = dataURLtoBlob(img);
      formData.append("images", blob, `image${index + 1}.jpg`);
    });

    try {
      const response = await fetch("http://localhost:8765/api/create-student", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload response:", result);
      alert("Student data and images uploaded successfully!");
      setImages([]); // Clear images after upload
      setStudentData({
        name: "",
        username: "",
        password: "",
        section: "",
        role: "student",
        parent_email: "",
        rfid_tag: "",
      }); // Reset form
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  // Helper function to convert base64 to Blob
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Register Student & Capture 5 Images</h2>

      {/* Student Data Form */}
      <input type="text" name="name" placeholder="Name" value={studentData.name} onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" value={studentData.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={studentData.password} onChange={handleChange} />
      <input type="text" name="section" placeholder="Section" value={studentData.section} onChange={handleChange} />
      <input type="email" name="parent_email" placeholder="Parent Email" value={studentData.parent_email} onChange={handleChange} />
      <input type="text" name="rfid_tag" placeholder="RFID Tag" value={studentData.rfid_tag} onChange={handleChange} />

      {previewImage ? (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <img src={previewImage} alt="Preview" style={{ width: "50%", borderRadius: "10px" }} />
          <button onClick={confirmImage}>Confirm</button>
          <button onClick={() => setPreviewImage(null)}>Retake</button>
        </div>
      ) : (
        <>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: "80%", maxWidth: "500px", borderRadius: "10px" }} />
          <br />
          <button onClick={capture} disabled={images.length >= 5}>Capture Image ({images.length}/5)</button>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        {images.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img src={img} alt={`Captured ${index + 1}`} width="100" onClick={() => setPreviewIndex(index)} style={{ cursor: "pointer" }} />
            <button onClick={() => removeImage(index)} style={{ position: "absolute", top: 0, right: 0, background: "red", color: "white", border: "none", cursor: "pointer" }}>X</button>
          </div>
        ))}
      </div>

      <button onClick={uploadData} disabled={images.length < 5}>Upload Data & Images</button>

      {previewIndex !== null && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <img src={images[previewIndex]} alt="Preview" style={{ width: "50%", borderRadius: "10px" }} />
          <button onClick={() => setPreviewIndex(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
