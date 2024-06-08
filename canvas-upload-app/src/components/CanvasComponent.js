import React, { useEffect, useRef } from "react";

const CanvasComponent = ({ imageURL, canvasSize, imageProps, setImageProps }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (imageURL) {
      const img = new Image();
      img.src = imageURL;
      img.onload = () => {
        const { x, y, width, height } = imageProps;
        ctx.drawImage(img, x, y, width, height);
      };
    }
  }, [imageURL, canvasSize, imageProps]);

  return <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} style={{ border: "1px solid black" }} />;
};

export default CanvasComponent;
