import React from "react";
import { Camera } from "lucide-react";

const MoodDetectionScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold leading-tight">
          We detect your mood and use it to personalize your playlists
        </h1>
        <p className="text-xl text-green-400">Try now</p>
        <div className="mt-10">
          <button
            className="p-8 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors duration-200"
            aria-label="Start mood detection"
          >
            <Camera className="w-20 h-20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodDetectionScreen;
