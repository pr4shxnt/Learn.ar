import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BIOLOGY_CHAPTERS } from "../mockData";
import "@google/model-viewer";

// Extend JSX namespace to include model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

const HumanAnatomy = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (
      chapterId &&
      MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS]
    ) {
      setData(
        MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS],
      );
    }
  }, [chapterId]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading or Chapter not found...</p>
        <button
          onClick={() => navigate("/dashboard/biology")}
          className="ml-4 underline text-blue-400"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Determine scale based on chapterId
  const scale = chapterId === "human-anatomy" ? "100 100 100" : "10 10 10";

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 border-b border-gray-800 flex justify-between items-center z-10 bg-gray-900/80 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">{data.name}</h1>
          <p className="text-gray-400 text-sm">
            {data.description.description}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/dashboard/biology")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
          >
            Back to Biology
          </button>
        </div>
      </header>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* @ts-ignore */}
        <model-viewer
          src={data.threeDModels[0]}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          autoplay
          shadow-intensity="1.2"
          exposure="1.2"
          interaction-prompt="auto"
          alt={`3D model of ${data.name}`}
          scale={scale}
          ar-scale="auto"
          ar-placement="floor"
          touch-action="pan-y"
          loading="eager"
          reveal="auto"
          auto-rotate
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <div
            slot="ar-button"
            className="absolute bottom-4 right-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 z-20"
          >
            👋 View in AR
          </div>
          <div slot="ar-failure" className="hidden">
            AR not available on this device
          </div>
          {/* @ts-ignore */}
        </model-viewer>

        <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-xl backdrop-blur-sm max-w-xs pointer-events-none z-10">
          <h3 className="font-bold text-lg mb-2">Controls</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Drag to Rotate</li>
            <li>• Pinch to Zoom</li>
            <li>• Click "View in AR" for Augmented Reality</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HumanAnatomy;
