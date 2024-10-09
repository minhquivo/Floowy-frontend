import React, { useState } from "react";
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

const PlayingPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  // Simulated scores for the song
  const moodScore = 8;
  const activityScore = 7;
  const personalScore = 9;

  const lyrics = `I'm a sucker for you
You say the word and I'll go anywhere blindly
I'm a sucker for you, yeah
Any road you take, you know that you'll find me
I'm a sucker for all the subliminal things
No one knows about you (about you) about you (about you)
And you're making the typical me break my typical rules
It's true, I'm a sucker for you, yeah

Don't complicate it (yeah)
'Cause I know you and you know everything about me
I can't remember (yeah)
All of the nights I don't remember
When you're around me (oh, yeah yeah)

I've been dancing on top of cars and stumbling out of bars
I follow you through the dark, can't get enough
You're the medicine and the pain, the tattoo inside my brain
And, baby, you know it's obvious

I'm a sucker for you
You say the word and I'll go anywhere blindly
I'm a sucker for you, yeah
Any road you take, you know that you'll find me
I'm a sucker for all the subliminal things
No one knows about you (about you) about you (about you)
And you're making the typical me break my typical rules
It's true, I'm a sucker for you, yeah (I'm a sucker for you)

I've been dancing on top of cars and stumbling out of bars
I follow you through the dark, can't get enough
You're the medicine and the pain, the tattoo inside my brain
And, baby, you know it's obvious

I'm a sucker for you
You say the word and I'll go anywhere blindly
I'm a sucker for you, yeah
Any road you take, you know that you'll find me
I'm a sucker for all the subliminal things
No one knows about you (about you) about you (about you)
And you're making the typical me break my typical rules
It's true, I'm a sucker for you, yeah

I'm a sucker for you`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col">
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-1">Sucker</h1>
        <h2 className="text-lg text-gray-400">Jonas Brothers</h2>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <div className="w-64 h-64 mb-6 relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/8/87/Jonas_Brothers_-_Sucker.png"
            alt="Sucker by Jonas Brothers album cover"
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

        <div className="w-full max-w-md">
          <h3 className="text-xl font-semibold mb-2">Lyrics</h3>
          <div className="bg-zinc-800 rounded-lg p-4 h-64 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap">{lyrics}</pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayingPage;
