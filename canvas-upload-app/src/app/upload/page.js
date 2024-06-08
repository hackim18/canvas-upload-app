"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CanvasComponent from "@/components/CanvasComponent";

const UploadPage = () => {
  const defaultCanvasSize = { width: 640, height: 360 };
  const [canvasSize, setCanvasSize] = useState(defaultCanvasSize);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageProps, setImageProps] = useState({ x: 0, y: 0, width: defaultCanvasSize.width, height: defaultCanvasSize.height });
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [error, setError] = useState(null);
  const [tempCanvasSize, setTempCanvasSize] = useState(defaultCanvasSize);

  const handleCanvasSizeChange = () => {
    if (tempCanvasSize.width < 100 || tempCanvasSize.height < 100) {
      toast.error("Canvas size cannot be less than 100x100", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      toast.success("Canvas size changed successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setCanvasSize({ ...tempCanvasSize });
    setError(null);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    setError(null);

    if (!imageFile || !imageFile.type.startsWith("image/")) {
      toast.error("Please upload a valid image file", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      toast.success("Image uploaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newImageURL = URL.createObjectURL(imageFile);
      setImageURL(newImageURL);

      const img = new Image();
      img.onload = () => {
        const scaleWidth = img.width > canvasSize.width ? canvasSize.width : img.width;
        const scaleHeight = img.height > canvasSize.height ? canvasSize.height : img.height;
        setImageProps({ x: 0, y: 0, width: scaleWidth, height: scaleHeight });
      };
      img.src = newImageURL;
    } catch (error) {
      toast.error(error.response?.data?.error || "Error uploading image", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Upload Image to Canvas</h1>
      <ToastContainer />

      <div className="mb-3">
        <h2>Canvas Properties</h2>
        <div className="row">
          <div className="col">
            <label className="form-label">Width:</label>
            <input
              type="number"
              className="form-control"
              value={tempCanvasSize.width}
              onChange={(e) => setTempCanvasSize({ ...tempCanvasSize, width: parseInt(e.target.value) || 0 })}
              disabled={!!imageURL}
            />
          </div>
          <div className="col">
            <label className="form-label">Height:</label>
            <input
              type="number"
              className="form-control"
              value={tempCanvasSize.height}
              onChange={(e) => setTempCanvasSize({ ...tempCanvasSize, height: parseInt(e.target.value) || 0 })}
              disabled={!!imageURL}
            />
          </div>
          <div className="col align-self-end">
            <button className="btn btn-primary" onClick={handleCanvasSizeChange} disabled={!!imageURL}>
              Change Size
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleImageUpload} className="mb-3">
        <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        <button type="submit" className="btn btn-primary mt-3">
          Upload Image
        </button>
      </form>

      <CanvasComponent
        imageURL={imageURL}
        canvasSize={canvasSize}
        imageProps={imageProps}
        rotation={rotation}
        flipHorizontal={flipHorizontal}
        flipVertical={flipVertical}
      />

      {imageURL && (
        <div className="mt-3">
          <h2>Image Properties</h2>
          <div className="row">
            <div className="col">
              <label className="form-label">X:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.x}
                onChange={(e) => setImageProps({ ...imageProps, x: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="col">
              <label className="form-label">Y:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.y}
                onChange={(e) => setImageProps({ ...imageProps, y: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="col">
              <label className="form-label">Width:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.width}
                onChange={(e) => setImageProps({ ...imageProps, width: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="col">
              <label className="form-label">Height:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.height}
                onChange={(e) => setImageProps({ ...imageProps, height: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="col">
              <label className="form-label">Rotation (degrees):</label>
              <input type="number" className="form-control" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value) || 0)} />
            </div>
            <div className="col">
              <label className="form-label">Flip Horizontal:</label>
              <input
                type="checkbox"
                className="form-check-input"
                checked={flipHorizontal}
                onChange={() => setFlipHorizontal(!flipHorizontal)}
              />
            </div>
            <div className="col">
              <label className="form-label">Flip Vertical:</label>
              <input type="checkbox" className="form-check-input" checked={flipVertical} onChange={() => setFlipVertical(!flipVertical)} />
            </div>
            <div className="col align-self-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setImageProps({ ...imageProps });
                  toast.success("Image properties updated successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                Change Size
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
