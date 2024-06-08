"use client";
import React, { useState } from "react";
import axios from "axios";
import CanvasComponent from "@/components/CanvasComponent";

const UploadPage = () => {
  const defaultCanvasSize = { width: 640, height: 360 };
  const [canvasSize, setCanvasSize] = useState(defaultCanvasSize);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageProps, setImageProps] = useState({ x: 0, y: 0, width: defaultCanvasSize.width, height: defaultCanvasSize.height });
  const [error, setError] = useState(null);

  const handleCanvasSizeChange = () => {
    if (canvasSize.width < 100 || canvasSize.height < 100) {
      setError("Canvas size cannot be less than 100x100");
      return;
    }
    setCanvasSize({ ...canvasSize });
    setError(null);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageURL(URL.createObjectURL(imageFile));
    } catch (error) {
      setError(error.response?.data?.error || "Error uploading image");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Upload Image to Canvas</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <h2>Canvas Properties</h2>
        <div className="row">
          <div className="col">
            <label className="form-label">Width:</label>
            <input
              type="number"
              className="form-control"
              value={canvasSize.width}
              onChange={(e) => setCanvasSize({ ...canvasSize, width: parseInt(e.target.value) })}
              disabled={!!imageURL}
            />
          </div>
          <div className="col">
            <label className="form-label">Height:</label>
            <input
              type="number"
              className="form-control"
              value={canvasSize.height}
              onChange={(e) => setCanvasSize({ ...canvasSize, height: parseInt(e.target.value) })}
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

      <CanvasComponent imageURL={imageURL} canvasSize={canvasSize} imageProps={imageProps} setImageProps={setImageProps} />

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
                onChange={(e) => setImageProps({ ...imageProps, x: parseInt(e.target.value) })}
              />
            </div>
            <div className="col">
              <label className="form-label">Y:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.y}
                onChange={(e) => setImageProps({ ...imageProps, y: parseInt(e.target.value) })}
              />
            </div>
            <div className="col">
              <label className="form-label">Width:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.width}
                onChange={(e) => setImageProps({ ...imageProps, width: parseInt(e.target.value) })}
              />
            </div>
            <div className="col">
              <label className="form-label">Height:</label>
              <input
                type="number"
                className="form-control"
                value={imageProps.height}
                onChange={(e) => setImageProps({ ...imageProps, height: parseInt(e.target.value) })}
              />
            </div>
            <div className="col align-self-end">
              <button className="btn btn-primary" onClick={() => setImageProps({ ...imageProps })}>
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
