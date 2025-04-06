import React, { ReactNode, useEffect, useState } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
}: GradientTextProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof document !== "undefined");

    // Inject keyframes dynamically
    const style = document.createElement("style");
    style.innerHTML = `
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!isClient) return null;

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradient ${animationSpeed}s linear infinite`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  const containerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "fit-content",
    fontWeight: "500",
    backdropFilter: "blur(5px)",
    transition: "box-shadow 0.5s ease-in-out",
    overflow: "hidden",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={gradientStyle}>{children}</div>
    </div>
  );
}
