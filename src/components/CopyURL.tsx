// components/CopyURL.tsx
import { useState } from "react";
import { FiCopy } from "react-icons/fi";

const CopyURL: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const url = "https://your-website.com/your-path";

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Share this URL</h2>
      <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-100">
        <span className="text-sm break-all flex-1">abc.com</span>
        <button
          onClick={handleCopy}
          className="text-blue-600 hover:text-blue-800 transition"
          title="Copy URL"
        >
          <FiCopy size={20} />
        </button>
      </div>
      {copied && <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>}
    </div>
  );
};

export default CopyURL;
