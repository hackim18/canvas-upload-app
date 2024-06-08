import React, { useEffect, useRef } from "react";

const CanvasComponent = ({ imageURL, canvasSize, imageProps, rotation }) => {
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
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
      };
    }
  }, [imageURL, canvasSize, imageProps, rotation]);

  return <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} style={{ border: "1px solid black" }} />;
};

export default CanvasComponent;
