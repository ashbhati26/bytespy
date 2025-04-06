import React, { useEffect, useState } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);

      // Inject styles dynamically
      const style = document.createElement("style");
      style.innerHTML = `
                @keyframes shine {
                    0% { background-position: 100%; }
                    100% { background-position: -100%; }
                }
            `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  if (!isClient) return null; // Avoid rendering on server

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        color: "#b5b5b5a4",
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: disabled
          ? "none"
          : `shine ${animationDuration} linear infinite`,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
