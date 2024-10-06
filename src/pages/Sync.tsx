import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SyncPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSpotifyModalOpen, setIsSpotifyModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isMentalHealthModalOpen, setIsMentalHealthModalOpen] = useState(false);
  const [spotifyPlaylist, setSpotifyPlaylist] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedEmail, setConnectedEmail] = useState("");
  const [connectingService, setConnectingService] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const syncOptions = [
    {
      id: "calendar",
      label: "Sync calendar",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZRzn2OpNq-OaU1QGcrCL9HDxi6k-4HXAyg&s",
    },
    {
      id: "playlists",
      label: "Sync playlists",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png",
    },
    {
      id: "health",
      label: "Sync health data",
      logo: "https://i.pinimg.com/736x/f4/c9/a8/f4c9a88e93317977c3d0921b12309578.jpg",
    },
    {
      id: "mental-health",
      label: "Sync mental health record",
      logo: "https://www.planstreetinc.com/wp-content/uploads/2021/07/what-is-mental-health.png",
    },
  ];
  const handleOptionToggle = (optionId: string) => {
    if (optionId === "playlists") {
      setIsSpotifyModalOpen(true);
    } else if (optionId === "calendar") {
      setIsCalendarModalOpen(true);
    } else if (optionId === "health") {
      setIsHealthModalOpen(true);
    } else if (optionId === "mental-health") {
      setIsMentalHealthModalOpen(true);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Syncing options:", selectedOptions);
    console.log("Spotify playlist:", spotifyPlaylist);
    localStorage.setItem("spotifyPlaylist", spotifyPlaylist);
    navigate("/mood-detection");
  };

  const handlePlaylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpotifyModalOpen(false);
    if (spotifyPlaylist) {
      setSelectedOptions((prev) => [...prev, "playlists"]);
    }
  };

  const handleConnect = (service: string) => {
    setIsConnecting(true);
    setConnectingService(service);
    setTimeout(() => {
      setIsConnecting(false);
      setConnectedEmail("hochivuong2002@gmail.com");
      setSelectedOptions((prev) => [...prev, service]);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsProcessed(true);
        setSelectedOptions((prev) => [...prev, "mental-health"]);
        setTimeout(() => {
          setIsMentalHealthModalOpen(false);
          setIsProcessed(false);
          setSelectedFile(null);
        }, 2000);
      }, 3000);
    }
  };

  useEffect(() => {
    if (connectedEmail) {
      const timer = setTimeout(() => {
        setIsCalendarModalOpen(false);
        setIsHealthModalOpen(false);
        setConnectedEmail("");
        setConnectingService("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [connectedEmail]);

  const renderConnectionModal = (
    service: string,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            Connect to{" "}
            {service === "calendar" ? "Google Calendar" : "Apple Health"}
          </h2>
          {isConnecting && connectingService === service ? (
            <div className="flex flex-col items-center">
              <div className="spinner w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin mb-4"></div>
              <p>
                Connecting to{" "}
                {service === "calendar" ? "Google Calendar" : "Apple Health"}...
              </p>
            </div>
          ) : connectedEmail && connectingService === service ? (
            <div className="text-center">
              <p className="mb-2">Successfully connected to:</p>
              <p className="font-bold">{connectedEmail}</p>
            </div>
          ) : (
            <>
              <p className="mb-4">
                Click the button below to connect your{" "}
                {service === "calendar" ? "Google Calendar" : "Apple Health"}.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleConnect(service)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Connect to {service === "calendar" ? "Google" : "Apple"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-20 w-20 text-green-500 mb-2"
          >
            <path d="M23 4v6h-6" />
            <path d="M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.36-3.36L23 10M1 14l5.64 5.64A9 9 0 0 0 20.49 15" />
          </svg>
          <h1 className="mt-6 text-3xl font-bold text-center">
            Sync your data for better recommendations
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {syncOptions.map((option, index) => (
            <div key={option.id}>
              <button
                type="button"
                onClick={() => handleOptionToggle(option.id)}
                className={`relative w-full flex items-center px-3 py-2 text-sm font-medium ${
                  index === 0 ? "rounded-t-md" : ""
                } ${index === syncOptions.length - 1 ? "rounded-b-md" : ""} ${
                  selectedOptions.includes(option.id)
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-zinc-700"
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900`}
              >
                <img
                  src={option.logo}
                  alt={`${option.label} logo`}
                  className="w-6 h-6 mr-3"
                />
                {option.label}
              </button>
              {index !== syncOptions.length - 1 && (
                <div className="h-px bg-zinc-700" aria-hidden="true" />
              )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      {isSpotifyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Enter Spotify Playlist URL
            </h2>
            <form onSubmit={handlePlaylistSubmit}>
              <input
                type="text"
                value={spotifyPlaylist}
                onChange={(e) => setSpotifyPlaylist(e.target.value)}
                placeholder="https://open.spotify.com/playlist/..."
                className="w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSpotifyModalOpen(false)}
                  className="px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {renderConnectionModal(
        "calendar",
        isCalendarModalOpen,
        setIsCalendarModalOpen
      )}
      {renderConnectionModal("health", isHealthModalOpen, setIsHealthModalOpen)}

      {isMentalHealthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Upload Mental Health Record
            </h2>
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <div className="spinner w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin mb-4"></div>
                <p>Processing your mental health record...</p>
              </div>
            ) : isProcessed ? (
              <div className="text-center">
                <p className="mb-2">
                  Mental health record processed successfully!
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4">
                  Please upload your mental health record (PDF format).
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-zinc-600 text-white rounded-md hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                  >
                    Select File
                  </button>
                  {selectedFile && (
                    <p className="text-sm">{selectedFile.name}</p>
                  )}
                  <button
                    onClick={handleFileUpload}
                    disabled={!selectedFile}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Upload and Process
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SyncPage;
