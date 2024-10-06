import React, { useState, useRef, useEffect } from "react";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Smile,
  Activity,
  User,
} from "lucide-react";
import aiMusic from "../assets/ai-music.mp3";

const PlayingPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulated scores for the AI-generated song
  const moodScore = 8;
  const activityScore = 7;
  const personalScore = 9;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current!.duration);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col">
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-1">Happy Hackin'</h1>
        <h2 className="text-lg text-gray-400">Floowy AI</h2>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <div className="w-64 h-64 mb-6 relative">
          <img
            src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/o6/663909da-e85d-4475-ad36-ab72b057cc75"
            alt="AI Generated Song cover"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-black bg-opacity-50 rounded-md p-2">
            <div className="flex items-center">
              <Smile className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-xs">{moodScore}/10</span>
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-1 text-green-400" />
              <span className="text-xs">{activityScore}/10</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1 text-blue-400" />
              <span className="text-xs">{personalScore}/10</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mb-6">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-6 w-full max-w-md">
          <button className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2">
            <Shuffle size={24} />
          </button>
          <button className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2">
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-green-500 text-white rounded-full p-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2">
            <SkipForward size={24} />
          </button>
          <button className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2">
            <Repeat size={24} />
          </button>
        </div>

        <audio ref={audioRef} src={aiMusic} />
      </main>
    </div>
  );
};

export default PlayingPage;
