import React from "react";
import { useNavigate } from "react-router-dom";
import { Smile, Activity, User } from "lucide-react";
import logo from "../assets/logo.png";

interface Song {
  title: string;
  artist: string;
  cover: string;
  moodScore: number;
  activityScore: number;
  personalScore: number;
}

const MainScreen: React.FC = () => {
  const navigate = useNavigate();

  const songs: Song[] = [
    {
      title: "2002",
      artist: "Anne-Marie",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/e/e6/2002_single_by_Anne-Marie.jpg",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Happy",
      artist: "Pharrell Williams",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/2/23/Pharrell_Williams_-_Happy.jpg",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "24K Magic",
      artist: "Bruno Mars",
      cover: "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Cake By The Ocean",
      artist: "DNCE",
      cover: "https://m.media-amazon.com/images/I/71SzcHuNjaL.jpg",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "What Do You Mean",
      artist: "Justin Bieber",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      cover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Sucker",
      artist: "Jonas Brothers",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/8/87/Jonas_Brothers_-_Sucker.png",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      cover: "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
    {
      title: "Butter",
      artist: "BTS",
      cover: "https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png",
      moodScore: Math.floor(Math.random() * 11),
      activityScore: Math.floor(Math.random() * 11),
      personalScore: Math.floor(Math.random() * 11),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col">
      <header className="p-4 bg-zinc-800">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Floowy Logo" className="h-24 w-24 mb-1" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-left">Hello, Vuong!</h1>
        <h1 className="text-2xl font-bold mb-2  text-left">
          Great to see that you're happy!
        </h1>
        <h2 className="text-xl text-left">You're currently Hacking</h2>
      </header>

      <main className="flex-1 overflow-hidden">
        <section className="p-4">
          <h3 className="text-xl font-semibold mb-4">Music Suggestions</h3>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {songs.map((song, index) => (
              <div key={index} className="flex-shrink-0 w-32">
                <img
                  src={song.cover}
                  alt={`${song.title} cover`}
                  className="w-32 h-32 object-cover rounded-lg shadow-lg"
                />
                <p className="mt-2 font-medium text-sm">{song.title}</p>
                <p className="text-xs text-gray-400">{song.artist}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <Smile className="w-4 h-4 mr-1" />
                    <span className="text-xs">{song.moodScore}</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-1" />
                    <span className="text-xs">{song.activityScore}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span className="text-xs">{song.personalScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="p-4 bg-zinc-800">
        <button
          onClick={() => navigate("/ai-songs")}
          className="w-full mb-2 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Listen to our AI-generated songs
        </button>
        <button
          onClick={() => navigate("/Playing")}
          className="w-full py-2 px-4 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Mix
        </button>
      </footer>
    </div>
  );
};

export default MainScreen;
