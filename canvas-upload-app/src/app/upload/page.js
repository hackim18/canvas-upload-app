"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import CanvasComponent from "@/components/CanvasComponent";
import { showError, showSuccess } from "../lib/react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Tambahkan CSS Bootstrap

const UploadPage = () => {
  const defaultCanvasSize = { width: 640, height: 360 };
  const [canvasSize, setCanvasSize] = useState(defaultCanvasSize);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageProps, setImageProps] = useState({ x: 0, y: 0, width: defaultCanvasSize.width, height: defaultCanvasSize.height });
  const [initialImageSize, setInitialImageSize] = useState({ width: defaultCanvasSize.width, height: defaultCanvasSize.height });
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [error, setError] = useState(null);
  const [tempCanvasSize, setTempCanvasSize] = useState(defaultCanvasSize);

  const handleCanvasSizeChange = () => {
    if (tempCanvasSize.width < 100 || tempCanvasSize.height < 100) {
      showError("Canvas size must be at least 100x100");
      return;
    } else {
      showSuccess("Canvas size updated successfully");
    }
    setCanvasSize({ ...tempCanvasSize });
    setError(null);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    setError(null);

    if (!imageFile || !imageFile.type.startsWith("image/")) {
      showError("Please select a valid image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        showError(response.data.error || "Error uploading image");
        return;
      } else {
        showSuccess("Image uploaded successfully");
      }

      const newImageURL = URL.createObjectURL(imageFile);
      setImageURL(newImageURL);

      const img = new Image();
      img.onload = () => {
        const scaleWidth = img.width > canvasSize.width ? canvasSize.width : img.width;
        const scaleHeight = img.height > canvasSize.height ? canvasSize.height : img.height;
        setImageProps({ x: 0, y: 0, width: scaleWidth, height: scaleHeight });
        setInitialImageSize({ width: img.width, height: img.height });
      };
      img.src = newImageURL;
    } catch (error) {
      showError(error.response?.data?.error || "Error uploading image");
    }
  };

  const handleResetSize = () => {
    setTempCanvasSize(initialImageSize);
    setCanvasSize(initialImageSize);
    showSuccess("Canvas size reset successfully");
  };

  const handleResetProperties = () => {
    setImageProps({ x: 0, y: 0, width: initialImageSize.width, height: initialImageSize.height });
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    showSuccess("Image properties reset successfully");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Upload Image to Canvas</h1>
      <ToastContainer />

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Canvas Properties</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Width:</label>
              <input
                type="number"
                className="form-control"
                value={tempCanvasSize.width}
                onChange={(e) => setTempCanvasSize({ ...tempCanvasSize, width: parseInt(e.target.value) || 0 })}
                disabled={!!imageURL}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Height:</label>
              <input
                type="number"
                className="form-control"
                value={tempCanvasSize.height}
                onChange={(e) => setTempCanvasSize({ ...tempCanvasSize, height: parseInt(e.target.value) || 0 })}
                disabled={!!imageURL}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100" onClick={handleCanvasSizeChange} disabled={!!imageURL}>
                Change Size
              </button>
              <button className="btn btn-secondary w-100 mt-2" onClick={handleResetSize} disabled={!!imageURL}>
                Reset Size
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleImageUpload} className="card mb-4">
        <div className="card-body">
          <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Upload Image
          </button>
        </div>
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
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Image Properties</h2>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">X:</label>
                <input
                  type="number"
                  className="form-control"
                  value={imageProps.x}
                  onChange={(e) => setImageProps({ ...imageProps, x: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Y:</label>
                <input
                  type="number"
                  className="form-control"
                  value={imageProps.y}
                  onChange={(e) => setImageProps({ ...imageProps, y: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Width:</label>
                <input
                  type="number"
                  className="form-control"
                  value={imageProps.width}
                  onChange={(e) => setImageProps({ ...imageProps, width: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Height:</label>
                <input
                  type="number"
                  className="form-control"
                  value={imageProps.height}
                  onChange={(e) => setImageProps({ ...imageProps, height: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Rotation (degrees):</label>
                <input
                  type="number"
                  className="form-control"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Flip Horizontal:</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={flipHorizontal}
                    onChange={() => setFlipHorizontal(!flipHorizontal)}
                  />
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Flip Vertical:</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={flipVertical}
                    onChange={() => setFlipVertical(!flipVertical)}
                  />
                </div>
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    setImageProps({ ...imageProps });
                    showSuccess("Image properties updated successfully");
                  }}
                >
                  Change Size
                </button>
                <button className="btn btn-secondary w-100 mt-2" onClick={handleResetProperties}>
                  Reset Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
