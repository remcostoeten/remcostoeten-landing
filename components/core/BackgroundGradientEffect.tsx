'use client';
import { SetStateAction, useState } from "react";

export default function Gradient() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(90);

  const handleMouseMove = (event: { clientX: SetStateAction<number>; clientY: SetStateAction<number>; }) => {

    setY(Number(event.clientX) / window.innerHeight * 10 + Math.random());
    setY(Number(event.clientY) / window.innerHeight * 10 + Math.random());
  };

  const gradientIntensity = 0.07;

  return (
    <div
      className="h-screen fixed bottom-0 w-screen"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(45,212,191,${gradientIntensity}), rgba(8,0,0,0))`
      }}
    >
    </div>
  );
}
